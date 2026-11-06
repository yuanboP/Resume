// Scoring for woven-torus generations, following the 7-item rubric.
//
//   0  validity (gate)      watertight + manifold + single component   pass x1.0 / fail x0.5
//   1  hole count           N = genus - 1                              15 * max(0, 1-|N-Nref|/Nref)
//   2  hole consistency     CV of hole areas                           10 * max(0, 1-|CV-CVref|/0.3)
//   3  hole correspondence  Hungarian match, per-hole IoU              25 * mean IoU
//   4  strand twist         half-turns per strand loop                 20 * fraction matching ref
//   5  outer bulge          sagitta / chord of the outer arc           15 * max(0, 1-|s-sref|/sref)
//   6  overall shape        F-score, tau = 1% of bbox diagonal         15 * F
//                                                            total = sum * validity
//
// Holes are measured in the torus parameter domain: every surface point maps to
// (u, v), material is rasterised onto a periodic grid, and each empty connected
// component is one hole. That works for any roughly-toroidal mesh, not just the
// ones this repo generates.
//
// Pure JS, no three.js, so `node test/score.test.mjs` runs it headless.

const TAU = Math.PI * 2;

export const WEIGHTS = { count: 15, consistency: 10, correspondence: 25, twist: 20, bulge: 15, shape: 15 };
const CV_TOLERANCE = 0.3; // denominator fixed by the rubric
const GRID = 192;         // uv raster resolution
const SAMPLES = 700000;   // surface samples used for rasterising and F-score
const MIN_HOLE_CELLS = 12;

// ---------------------------------------------------------------- utilities

function lcg(seed) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
}

// ---------------------------------------------------------------- topology

// Fuse coincident vertices so shared edges are actually shared.
function weld(positions, indices, eps = 1e-6) {
  const map = new Map();
  const remap = new Int32Array(positions.length / 3);
  const out = [];
  const q = 1 / eps;
  for (let i = 0; i < positions.length / 3; i++) {
    const x = positions[i * 3], y = positions[i * 3 + 1], z = positions[i * 3 + 2];
    const key = `${Math.round(x * q)},${Math.round(y * q)},${Math.round(z * q)}`;
    let idx = map.get(key);
    if (idx === undefined) {
      idx = out.length / 3;
      map.set(key, idx);
      out.push(x, y, z);
    }
    remap[i] = idx;
  }
  const tris = [];
  for (let i = 0; i < indices.length; i += 3) {
    const a = remap[indices[i]], b = remap[indices[i + 1]], c = remap[indices[i + 2]];
    if (a !== b && b !== c && a !== c) tris.push(a, b, c);
  }
  return { positions: new Float32Array(out), indices: new Uint32Array(tris) };
}

class DSU {
  constructor(n) { this.p = new Int32Array(n); for (let i = 0; i < n; i++) this.p[i] = i; }
  find(x) { while (this.p[x] !== x) { this.p[x] = this.p[this.p[x]]; x = this.p[x]; } return x; }
  union(a, b) { a = this.find(a); b = this.find(b); if (a !== b) this.p[a] = b; }
}

export function analyzeTopology(positions, indices) {
  const m = weld(positions, indices);
  const V = m.positions.length / 3;
  const F = m.indices.length / 3;

  const edgeCount = new Map();
  const key = (a, b) => (a < b ? a * V + b : b * V + a);
  for (let t = 0; t < F; t++) {
    const a = m.indices[t * 3], b = m.indices[t * 3 + 1], c = m.indices[t * 3 + 2];
    for (const [p, q] of [[a, b], [b, c], [c, a]]) {
      const k = key(p, q);
      edgeCount.set(k, (edgeCount.get(k) || 0) + 1);
    }
  }
  const E = edgeCount.size;
  let watertight = true;
  for (const n of edgeCount.values()) if (n !== 2) { watertight = false; break; }

  // Every vertex link must be one closed cycle (no pinch points).
  const link = new Map();
  for (let t = 0; t < F; t++) {
    const tri = [m.indices[t * 3], m.indices[t * 3 + 1], m.indices[t * 3 + 2]];
    for (let i = 0; i < 3; i++) {
      const v = tri[i], a = tri[(i + 1) % 3], b = tri[(i + 2) % 3];
      if (!link.has(v)) link.set(v, []);
      link.get(v).push([a, b]);
    }
  }
  let manifold = watertight;
  if (manifold) {
    for (const [, pairs] of link) {
      const adj = new Map();
      for (const [a, b] of pairs) {
        if (!adj.has(a)) adj.set(a, []);
        if (!adj.has(b)) adj.set(b, []);
        adj.get(a).push(b);
        adj.get(b).push(a);
      }
      let bad = false;
      for (const [, nb] of adj) if (nb.length !== 2) { bad = true; break; }
      if (bad) { manifold = false; break; }
      // one cycle only
      const seen = new Set();
      let cur = adj.keys().next().value, prev = -1, steps = 0;
      while (cur !== undefined && !seen.has(cur)) {
        seen.add(cur);
        const nb = adj.get(cur);
        const nxt = nb[0] === prev ? nb[1] : nb[0];
        prev = cur; cur = nxt; steps++;
        if (steps > adj.size + 1) break;
      }
      if (seen.size !== adj.size) { manifold = false; break; }
    }
  }

  const dsu = new DSU(V);
  for (let t = 0; t < F; t++) {
    const a = m.indices[t * 3], b = m.indices[t * 3 + 1], c = m.indices[t * 3 + 2];
    dsu.union(a, b); dsu.union(b, c);
  }
  const roots = new Set();
  for (let i = 0; i < V; i++) roots.add(dsu.find(i));
  const components = roots.size;

  const chi = V - E + F;
  // genus from Euler characteristic, valid for a closed orientable surface
  const genus = components === 1 && watertight ? (2 - chi) / 2 : null;

  return {
    V, E, F, chi, components, watertight, manifold, genus,
    valid: watertight && manifold && components === 1,
  };
}

// ---------------------------------------------------------------- uv raster

// Fit the torus the mesh is wrapped around, so (u,v) is comparable between
// meshes of slightly different proportions.
function fitTorus(positions) {
  let rhoMin = Infinity, rhoMax = -Infinity, zMin = Infinity, zMax = -Infinity;
  for (let i = 0; i < positions.length; i += 3) {
    const rho = Math.hypot(positions[i], positions[i + 1]);
    if (rho < rhoMin) rhoMin = rho;
    if (rho > rhoMax) rhoMax = rho;
    const z = positions[i + 2];
    if (z < zMin) zMin = z;
    if (z > zMax) zMax = z;
  }
  const R = (rhoMin + rhoMax) / 2;
  return {
    R,
    rHalf: Math.max((rhoMax - rhoMin) / 2, 1e-6),
    zHalf: Math.max((zMax - zMin) / 2, 1e-6),
  };
}

// Area-weighted point sampling over the triangles.
function sampleSurface(positions, indices, count, seed = 12345) {
  const F = indices.length / 3;
  const cum = new Float64Array(F);
  let total = 0;
  for (let t = 0; t < F; t++) {
    const a = indices[t * 3] * 3, b = indices[t * 3 + 1] * 3, c = indices[t * 3 + 2] * 3;
    const ux = positions[b] - positions[a], uy = positions[b + 1] - positions[a + 1], uz = positions[b + 2] - positions[a + 2];
    const vx = positions[c] - positions[a], vy = positions[c + 1] - positions[a + 1], vz = positions[c + 2] - positions[a + 2];
    const cx = uy * vz - uz * vy, cy = uz * vx - ux * vz, cz = ux * vy - uy * vx;
    total += 0.5 * Math.hypot(cx, cy, cz);
    cum[t] = total;
  }
  const rnd = lcg(seed);
  const pts = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const target = rnd() * total;
    let lo = 0, hi = F - 1;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (cum[mid] < target) lo = mid + 1; else hi = mid; }
    const t = lo;
    let s = rnd(), u = rnd();
    if (s + u > 1) { s = 1 - s; u = 1 - u; }
    const a = indices[t * 3] * 3, b = indices[t * 3 + 1] * 3, c = indices[t * 3 + 2] * 3;
    for (let k = 0; k < 3; k++) {
      const pa = positions[a + k], pb = positions[b + k], pc = positions[c + k];
      pts[i * 3 + k] = pa + s * (pb - pa) + u * (pc - pa);
    }
  }
  return { points: pts, area: total };
}

function dilate(mask, n, passes) {
  let cur = mask;
  for (let p = 0; p < passes; p++) {
    const next = new Uint8Array(n * n);
    for (let j = 0; j < n; j++) {
      for (let i = 0; i < n; i++) {
        if (cur[j * n + i]) { next[j * n + i] = 1; continue; }
        const l = cur[j * n + ((i + n - 1) % n)], r = cur[j * n + ((i + 1) % n)];
        const d = cur[((j + n - 1) % n) * n + i], up = cur[((j + 1) % n) * n + i];
        if (l || r || d || up) next[j * n + i] = 1;
      }
    }
    cur = next;
  }
  return cur;
}

function erode(mask, n, passes) {
  const inv = new Uint8Array(n * n);
  for (let i = 0; i < mask.length; i++) inv[i] = mask[i] ? 0 : 1;
  const grown = dilate(inv, n, passes);
  const out = new Uint8Array(n * n);
  for (let i = 0; i < out.length; i++) out[i] = grown[i] ? 0 : 1;
  return out;
}

export function coverageMask(positions, indices, grid = GRID, samples = SAMPLES) {
  const fit = fitTorus(positions);
  const { points } = sampleSurface(positions, indices, samples);
  const mask = new Uint8Array(grid * grid);
  for (let i = 0; i < points.length; i += 3) {
    const x = points[i], y = points[i + 1], z = points[i + 2];
    const rho = Math.hypot(x, y);
    const u = Math.atan2(y, x);
    const v = Math.atan2(z / fit.zHalf, (rho - fit.R) / fit.rHalf);
    const iu = Math.min(grid - 1, Math.max(0, Math.floor(((u / TAU) % 1 + 1) % 1 * grid)));
    const iv = Math.min(grid - 1, Math.max(0, Math.floor(((v / TAU) % 1 + 1) % 1 * grid)));
    mask[iv * grid + iu] = 1;
  }
  // close pinholes left by finite sampling
  return erode(dilate(mask, grid, 1), grid, 1);
}

// Connected empty regions on the periodic grid, each one a hole.
export function findHoles(mask, grid = GRID, minCells = MIN_HOLE_CELLS) {
  const label = new Int32Array(grid * grid).fill(-1);
  const holes = [];
  const stack = [];
  for (let start = 0; start < mask.length; start++) {
    if (mask[start] || label[start] !== -1) continue;
    const id = holes.length;
    const cells = [];
    stack.push(start);
    label[start] = id;
    while (stack.length) {
      const idx = stack.pop();
      cells.push(idx);
      const i = idx % grid, j = (idx / grid) | 0;
      const nb = [
        j * grid + ((i + 1) % grid),
        j * grid + ((i + grid - 1) % grid),
        ((j + 1) % grid) * grid + i,
        ((j + grid - 1) % grid) * grid + i,
      ];
      for (const k of nb) if (!mask[k] && label[k] === -1) { label[k] = id; stack.push(k); }
    }
    holes.push(cells);
  }
  const kept = holes.filter((c) => c.length >= minCells);
  return kept.map((cells) => {
    const m = new Uint8Array(grid * grid);
    for (const c of cells) m[c] = 1;
    return { mask: m, area: cells.length / (grid * grid) };
  });
}

export function coefficientOfVariation(values) {
  if (values.length < 2) return 0;
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  if (mean === 0) return 0;
  const varc = values.reduce((a, b) => a + (b - mean) ** 2, 0) / values.length;
  return Math.sqrt(varc) / mean;
}

// ---------------------------------------------------------------- alignment

function downsample(mask, grid, to) {
  const out = new Uint8Array(to * to);
  const f = grid / to;
  for (let j = 0; j < to; j++) {
    for (let i = 0; i < to; i++) {
      let hit = 0;
      for (let b = 0; b < f && !hit; b++) {
        for (let a = 0; a < f; a++) {
          if (mask[((j * f + b) | 0) * grid + ((i * f + a) | 0)]) { hit = 1; break; }
        }
      }
      out[j * to + i] = hit;
    }
  }
  return out;
}

// The candidate may be rotated about the ring and/or rolled poloidally.
// Brute force the (du, dv) shift that best lines the two coverage masks up.
export function findAlignment(candMask, refMask, grid = GRID, coarse = 48) {
  const a = downsample(candMask, grid, coarse);
  const b = downsample(refMask, grid, coarse);
  let best = { du: 0, dv: 0, agree: -1 };
  for (let dv = 0; dv < coarse; dv++) {
    for (let du = 0; du < coarse; du++) {
      let agree = 0;
      for (let j = 0; j < coarse; j++) {
        const jr = (j + dv) % coarse;
        for (let i = 0; i < coarse; i++) {
          if (a[j * coarse + i] === b[jr * coarse + ((i + du) % coarse)]) agree++;
        }
      }
      if (agree > best.agree) best = { du, dv, agree };
    }
  }
  const scale = grid / coarse;
  return { du: Math.round(best.du * scale), dv: Math.round(best.dv * scale) };
}

function shiftMask(mask, grid, du, dv) {
  const out = new Uint8Array(grid * grid);
  for (let j = 0; j < grid; j++) {
    const jr = (j + dv) % grid;
    for (let i = 0; i < grid; i++) out[jr * grid + ((i + du) % grid)] = mask[j * grid + i];
  }
  return out;
}

// ---------------------------------------------------------------- Hungarian

// Jonker-Volgenant style O(n^3) assignment, minimising total cost. n <= m.
export function hungarian(cost, n, m) {
  const INF = Infinity;
  const u = new Float64Array(n + 1);
  const v = new Float64Array(m + 1);
  const p = new Int32Array(m + 1);
  const way = new Int32Array(m + 1);
  for (let i = 1; i <= n; i++) {
    p[0] = i;
    let j0 = 0;
    const minv = new Float64Array(m + 1).fill(INF);
    const used = new Uint8Array(m + 1);
    do {
      used[j0] = 1;
      const i0 = p[j0];
      let delta = INF, j1 = 0;
      for (let j = 1; j <= m; j++) {
        if (used[j]) continue;
        const cur = cost[(i0 - 1) * m + (j - 1)] - u[i0] - v[j];
        if (cur < minv[j]) { minv[j] = cur; way[j] = j0; }
        if (minv[j] < delta) { delta = minv[j]; j1 = j; }
      }
      for (let j = 0; j <= m; j++) {
        if (used[j]) { u[p[j]] += delta; v[j] -= delta; }
        else minv[j] -= delta;
      }
      j0 = j1;
    } while (p[j0] !== 0);
    do { const j1 = way[j0]; p[j0] = p[j1]; j0 = j1; } while (j0);
  }
  const assign = new Int32Array(n).fill(-1);
  for (let j = 1; j <= m; j++) if (p[j] > 0) assign[p[j] - 1] = j - 1;
  return assign;
}

function iou(a, b) {
  let inter = 0, uni = 0;
  for (let i = 0; i < a.length; i++) {
    const x = a[i], y = b[i];
    if (x && y) inter++;
    if (x || y) uni++;
  }
  return uni === 0 ? 0 : inter / uni;
}

// Mean IoU over a one-to-one matching; unmatched holes on either side score 0.
export function matchHoles(candHoles, refHoles) {
  const n = candHoles.length, m = refHoles.length;
  if (n === 0 || m === 0) return { meanIoU: 0, pairs: [] };
  const size = Math.max(n, m);
  const cost = new Float64Array(size * size).fill(0); // padding costs 0 => IoU 0
  const table = [];
  for (let i = 0; i < n; i++) {
    table.push([]);
    for (let j = 0; j < m; j++) {
      const s = iou(candHoles[i].mask, refHoles[j].mask);
      table[i].push(s);
      cost[i * size + j] = -s;
    }
  }
  const assign = hungarian(cost, size, size);
  const pairs = [];
  let sum = 0;
  for (let i = 0; i < n; i++) {
    const j = assign[i];
    if (j >= 0 && j < m) { sum += table[i][j]; pairs.push([i, j, table[i][j]]); }
  }
  return { meanIoU: sum / size, pairs };
}

// ---------------------------------------------------------------- twist

// Half-turns the ribbon makes over one loop, measured against a reference
// direction at each sample. The rubric asks whether the outward-facing side ends
// up facing inward, so the reference is the outward normal of the torus the
// strand is wrapped around -- not a parallel-transported frame, which would also
// pick up the writhe of the helical path and report twist on a ribbon that
// actually lies flat on the surface the whole way round.
//
// The ribbon's two faces make +n and -n the same physical state, so the angle is
// unwrapped modulo pi, not 2pi. That also handles the loop seam: a ribbon with an
// odd number of half-turns comes back to -n(0), and treating that as a near-2pi
// jump would cancel the twist out to zero.
export function measureHalfTurns(centers, normals, refs) {
  const n = centers.length;
  const tangent = (i) => {
    const a = centers[(i + 1) % n], b = centers[(i + n - 1) % n];
    return normalize3([a[0] - b[0], a[1] - b[1], a[2] - b[2]]);
  };

  let prev = null;
  let total = 0;
  for (let i = 0; i <= n; i++) {
    const idx = i % n;
    const T = tangent(idx);
    const ref = refs[idx];
    const d0 = dot3(ref, T);
    const e1 = normalize3([ref[0] - T[0] * d0, ref[1] - T[1] * d0, ref[2] - T[2] * d0]);
    const e2 = cross3(T, e1);
    const N = normals[idx];
    const theta = Math.atan2(dot3(N, e2), dot3(N, e1));
    if (prev !== null) {
      let d = theta - prev;
      d -= Math.PI * Math.round(d / Math.PI); // shortest step, mod pi
      total += d;
    }
    prev = theta;
  }
  return total / Math.PI;
}

const normalize3 = (a) => {
  const l = Math.hypot(a[0], a[1], a[2]) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
};

// Outward normal of the fitted (elliptical cross-section) torus at a point.
function torusOutward(fit, p) {
  const rho = Math.hypot(p[0], p[1]);
  const cu = rho > 1e-9 ? p[0] / rho : 1;
  const su = rho > 1e-9 ? p[1] / rho : 0;
  const nr = (rho - fit.R) / (fit.rHalf * fit.rHalf);
  const nz = p[2] / (fit.zHalf * fit.zHalf);
  return normalize3([cu * nr, su * nr, nz]);
}

const cross3 = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dot3 = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
function rodrigues(v, k, ang) {
  const c = Math.cos(ang), s = Math.sin(ang);
  const kv = cross3(k, v);
  const kd = dot3(k, v) * (1 - c);
  return [v[0] * c + kv[0] * s + k[0] * kd, v[1] * c + kv[1] * s + k[1] * kd, v[2] * c + kv[2] * s + k[2] * kd];
}

// ---------------------------------------------------------------- bulge

// Averaged cross-section: outer profile rho(z), then sagitta / chord of that arc.
export function measureBulge(positions, indices, uSlices = 180, zBins = 48) {
  const fit = fitTorus(positions);
  const { points } = sampleSurface(positions, indices, 300000, 777);
  let zMin = Infinity, zMax = -Infinity;
  for (let i = 2; i < points.length; i += 3) {
    if (points[i] < zMin) zMin = points[i];
    if (points[i] > zMax) zMax = points[i];
  }
  const outer = new Float64Array(uSlices * zBins).fill(-Infinity);
  for (let i = 0; i < points.length; i += 3) {
    const x = points[i], y = points[i + 1], z = points[i + 2];
    const rho = Math.hypot(x, y);
    if (rho < fit.R) continue; // outer half only
    const u = ((Math.atan2(y, x) / TAU) % 1 + 1) % 1;
    const iu = Math.min(uSlices - 1, (u * uSlices) | 0);
    const tz = (z - zMin) / Math.max(zMax - zMin, 1e-9);
    const iz = Math.min(zBins - 1, Math.max(0, (tz * zBins) | 0));
    const k = iu * zBins + iz;
    if (rho > outer[k]) outer[k] = rho;
  }
  const profile = [];
  for (let iz = 0; iz < zBins; iz++) {
    let sum = 0, cnt = 0;
    for (let iu = 0; iu < uSlices; iu++) {
      const val = outer[iu * zBins + iz];
      if (val > -Infinity) { sum += val; cnt++; }
    }
    if (cnt > uSlices * 0.2) {
      profile.push([sum / cnt, zMin + ((iz + 0.5) / zBins) * (zMax - zMin)]);
    }
  }
  if (profile.length < 3) return 0;
  const p0 = profile[0], p1 = profile[profile.length - 1];
  const dx = p1[0] - p0[0], dy = p1[1] - p0[1];
  const chord = Math.hypot(dx, dy);
  if (chord < 1e-9) return 0;
  let sagitta = 0;
  for (const [rho, z] of profile) {
    const d = Math.abs((rho - p0[0]) * dy - (z - p0[1]) * dx) / chord;
    if (d > sagitta) sagitta = d;
  }
  return sagitta / chord;
}

// ---------------------------------------------------------------- F-score

function bboxDiagonal(positions) {
  const lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < positions.length; i += 3) {
    for (let k = 0; k < 3; k++) {
      const val = positions[i + k];
      if (val < lo[k]) lo[k] = val;
      if (val > hi[k]) hi[k] = val;
    }
  }
  return Math.hypot(hi[0] - lo[0], hi[1] - lo[1], hi[2] - lo[2]);
}

class PointGrid {
  constructor(points, cell) {
    this.cell = cell;
    this.map = new Map();
    this.points = points;
    for (let i = 0; i < points.length; i += 3) {
      const k = this.key(points[i], points[i + 1], points[i + 2]);
      let bucket = this.map.get(k);
      if (!bucket) { bucket = []; this.map.set(k, bucket); }
      bucket.push(i);
    }
  }
  key(x, y, z) {
    return `${Math.floor(x / this.cell)},${Math.floor(y / this.cell)},${Math.floor(z / this.cell)}`;
  }
  // true if some stored point lies within `tau` of (x,y,z); tau <= cell
  within(x, y, z, tau) {
    const ci = Math.floor(x / this.cell), cj = Math.floor(y / this.cell), ck = Math.floor(z / this.cell);
    const t2 = tau * tau;
    for (let a = -1; a <= 1; a++) for (let b = -1; b <= 1; b++) for (let c = -1; c <= 1; c++) {
      const bucket = this.map.get(`${ci + a},${cj + b},${ck + c}`);
      if (!bucket) continue;
      for (const i of bucket) {
        const dx = this.points[i] - x, dy = this.points[i + 1] - y, dz = this.points[i + 2] - z;
        if (dx * dx + dy * dy + dz * dz <= t2) return true;
      }
    }
    return false;
  }
}

function rotateZ(points, ang) {
  const c = Math.cos(ang), s = Math.sin(ang);
  const out = new Float32Array(points.length);
  for (let i = 0; i < points.length; i += 3) {
    out[i] = points[i] * c - points[i + 1] * s;
    out[i + 1] = points[i] * s + points[i + 1] * c;
    out[i + 2] = points[i + 2];
  }
  return out;
}

export function fScore(candPoints, refPoints, tau) {
  const cell = Math.max(tau, 1e-6);
  const refGrid = new PointGrid(refPoints, cell);
  const candGrid = new PointGrid(candPoints, cell);
  let hitsP = 0;
  for (let i = 0; i < candPoints.length; i += 3) {
    if (refGrid.within(candPoints[i], candPoints[i + 1], candPoints[i + 2], tau)) hitsP++;
  }
  let hitsR = 0;
  for (let i = 0; i < refPoints.length; i += 3) {
    if (candGrid.within(refPoints[i], refPoints[i + 1], refPoints[i + 2], tau)) hitsR++;
  }
  const precision = hitsP / (candPoints.length / 3);
  const recall = hitsR / (refPoints.length / 3);
  return precision + recall === 0 ? 0 : (2 * precision * recall) / (precision + recall);
}

// ---------------------------------------------------------------- pipeline

export function analyze(mesh, opts = {}) {
  const grid = opts.grid ?? GRID;
  const { positions, indices, strands } = mesh;
  const topology = analyzeTopology(positions, indices);
  const mask = coverageMask(positions, indices, grid, opts.samples ?? SAMPLES);
  const holes = findHoles(mask, grid);
  const areas = holes.map((h) => h.area);
  const fit = fitTorus(positions);
  const twists = (strands ?? []).map((s) => Math.round(
    measureHalfTurns(s.centers, s.normals, s.centers.map((p) => torusOutward(fit, p))),
  ));
  return {
    topology,
    grid,
    mask,
    holes,
    // The rubric defines N = genus - 1; fall back to the raster count when the
    // mesh is not closed and genus is undefined.
    holeCount: topology.genus !== null ? topology.genus - 1 : holes.length,
    rasterHoleCount: holes.length,
    cv: coefficientOfVariation(areas),
    twists,
    bulge: measureBulge(positions, indices),
    points: sampleSurface(positions, indices, opts.fScoreSamples ?? 120000, 4242).points,
    bbox: bboxDiagonal(positions),
  };
}

const clampTerm = (weight, value, ref, tol) => {
  const denom = tol ?? Math.abs(ref);
  if (denom < 1e-12) return weight * (Math.abs(value - ref) < 1e-12 ? 1 : 0);
  return weight * Math.max(0, 1 - Math.abs(value - ref) / denom);
};

export function score(cand, ref) {
  const validity = cand.topology.valid ? 1.0 : 0.5;

  const count = clampTerm(WEIGHTS.count, cand.holeCount, ref.holeCount);
  const consistency = clampTerm(WEIGHTS.consistency, cand.cv, ref.cv, CV_TOLERANCE);

  const align = findAlignment(cand.mask, ref.mask, cand.grid);
  const shifted = cand.holes.map((h) => ({ ...h, mask: shiftMask(h.mask, cand.grid, align.du, align.dv) }));
  const { meanIoU, pairs } = matchHoles(shifted, ref.holes);
  const correspondence = WEIGHTS.correspondence * meanIoU;

  const nTwist = Math.max(cand.twists.length, ref.twists.length);
  let twistMatches = 0;
  if (nTwist > 0) {
    const refPool = ref.twists.slice();
    for (const t of cand.twists) {
      const k = refPool.indexOf(t);
      if (k >= 0) { refPool.splice(k, 1); twistMatches++; }
    }
  }
  const twistFraction = nTwist === 0 ? 1 : twistMatches / nTwist;
  const twist = WEIGHTS.twist * twistFraction;

  const bulge = clampTerm(WEIGHTS.bulge, cand.bulge, ref.bulge);

  const tau = 0.01 * ref.bbox;
  // the uv alignment's u-shift is a genuine rotation about Z; apply it
  const ang = (align.du / cand.grid) * TAU;
  const f = Math.max(
    fScore(cand.points, ref.points, tau),
    fScore(rotateZ(cand.points, ang), ref.points, tau),
  );
  const shape = WEIGHTS.shape * f;

  const subtotal = count + consistency + correspondence + twist + bulge + shape;
  return {
    validity,
    terms: {
      count: { score: count, value: cand.holeCount, ref: ref.holeCount },
      consistency: { score: consistency, value: cand.cv, ref: ref.cv },
      correspondence: { score: correspondence, value: meanIoU, matched: pairs.length },
      twist: { score: twist, value: twistFraction, twists: cand.twists, ref: ref.twists },
      bulge: { score: bulge, value: cand.bulge, ref: ref.bulge },
      shape: { score: shape, value: f, tau },
    },
    subtotal,
    total: subtotal * validity,
  };
}

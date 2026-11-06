// Woven torus: two families of helical ribbons on a (flattened) torus, interlaced.
//
// Family A runs v = +wind*u + phase, family B runs v = -wind*u + phase.
// A and B cross wherever their poloidal angles agree. To weave them we push each
// ribbon radially by  off = +/- weave * cos(strands * v).  Along one strand the
// consecutive crossings are spaced  du = pi/(strands*wind), i.e. dv = pi/strands,
// so  strands*v  advances by exactly pi between crossings and the cosine flips
// sign -- over, under, over, under. The two families take opposite signs, so at
// every crossing one ribbon is outside and the other inside.
//
// The ribbons are then unioned as a signed distance field and polygonised with
// surface nets. Going through an SDF rather than sweeping tubes directly is what
// makes the result a single watertight manifold body: at each crossing the two
// ribbons overlap slightly (keep weave < thick/2) and fuse, which is also what
// makes the hole count equal to genus - 1.
//
// Pure JS, no three.js, so the scorer and tests run headless.

const TAU = Math.PI * 2;

export const DEFAULT_PARAMS = {
  R: 1,              // major radius (centre of the tube)
  r: 0.33,           // poloidal radius
  flatten: 0.72,     // z-squash of the cross-section (1 = circular)
  strands: 4,        // ribbons per family (total = 2 * strands)
  wind: 1,           // poloidal turns per major turn
  width: 0.15,       // ribbon width across the torus surface
  thick: 0.075,      // ribbon thickness along the surface normal
  weave: 0.03,       // radial over/under amplitude; must stay < thick/2 to fuse
  round: 0.012,      // corner rounding of the ribbon cross-section
  blend: 0.06,      // smooth-union radius at the crossings
  twistHalfTurns: 0, // extra half-turns of the ribbon about its own axis per loop
  familyPhase: 0.5,  // phase offset of family B, in units of the strand spacing
  segU: 360,         // centreline samples per strand
  res: 160,          // surface-nets grid resolution on the longest axis
};

const sub = (a, b) => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const add = (a, b) => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const mul = (a, s) => [a[0] * s, a[1] * s, a[2] * s];
const dot = (a, b) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a, b) => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const norm = (a) => {
  const l = Math.hypot(a[0], a[1], a[2]) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
};

function surfacePoint(P, u, v, off) {
  const rr = P.r + off;
  const ring = P.R + rr * Math.cos(v);
  return [ring * Math.cos(u), ring * Math.sin(u), rr * P.flatten * Math.sin(v)];
}

// d/du x d/dv of the flattened torus reduces to this direction.
function surfaceNormal(P, u, v) {
  const cv = Math.cos(v);
  return norm([P.flatten * cv * Math.cos(u), P.flatten * cv * Math.sin(u), Math.sin(v)]);
}

// ---------------------------------------------------------------- strands

function buildStrand(P, dir, phase) {
  const segs = P.segU;
  const centers = [];
  const normals = [];
  const binormals = [];

  const at = (u) => {
    const v = dir * P.wind * u + phase;
    return surfacePoint(P, u, v, dir * P.weave * Math.cos(P.strands * v));
  };
  const du = (TAU / segs) * 0.5;

  for (let s = 0; s < segs; s++) {
    const u = (TAU * s) / segs;
    const v = dir * P.wind * u + phase;
    const T = norm(sub(at(u + du), at(u - du)));
    let N = surfaceNormal(P, u, v);
    N = norm(sub(N, mul(T, dot(N, T)))); // perpendicular to the path
    const B = cross(N, T);

    // Spin the cross-section about its own axis. A half-turn maps the rounded
    // rectangle onto itself, so any integer number of half-turns still closes.
    const tw = P.twistHalfTurns * Math.PI * (u / TAU);
    const ct = Math.cos(tw);
    const st = Math.sin(tw);

    centers.push(at(u));
    normals.push(add(mul(N, ct), mul(B, st)));
    binormals.push(add(mul(B, ct), mul(N, -st)));
  }
  return { centers, normals, binormals, dir, phase };
}

// ---------------------------------------------------------------- field

// Distance from p to one ribbon segment: project onto the segment, then measure
// a rounded rectangle in the segment's own cross-section frame.
function segmentDistance(p, c0, c1, n0, n1, b0, b1, hw, ht, round) {
  const ex = c1[0] - c0[0], ey = c1[1] - c0[1], ez = c1[2] - c0[2];
  const dx = p[0] - c0[0], dy = p[1] - c0[1], dz = p[2] - c0[2];
  const len2 = ex * ex + ey * ey + ez * ez;
  let t = len2 > 0 ? (dx * ex + dy * ey + dz * ez) / len2 : 0;
  t = t < 0 ? 0 : t > 1 ? 1 : t;

  const qx = p[0] - (c0[0] + ex * t);
  const qy = p[1] - (c0[1] + ey * t);
  const qz = p[2] - (c0[2] + ez * t);

  // frames barely differ across one segment; lerping is enough
  const nx = n0[0] + (n1[0] - n0[0]) * t, ny = n0[1] + (n1[1] - n0[1]) * t, nz = n0[2] + (n1[2] - n0[2]) * t;
  const bx = b0[0] + (b1[0] - b0[0]) * t, by = b0[1] + (b1[1] - b0[1]) * t, bz = b0[2] + (b1[2] - b0[2]) * t;

  const a = Math.abs(qx * bx + qy * by + qz * bz) - (hw - round);
  const b = Math.abs(qx * nx + qy * ny + qz * nz) - (ht - round);
  const ax = a > 0 ? a : 0;
  const by2 = b > 0 ? b : 0;
  const inside = Math.min(Math.max(a, b), 0);
  return Math.hypot(ax, by2) + inside - round;
}

function smoothMin(a, b, k) {
  if (k <= 0) return Math.min(a, b);
  const h = Math.max(0, k - Math.abs(a - b)) / k;
  return Math.min(a, b) - h * h * k * 0.25;
}

// Index segments by their major angle u. Every strand spans all of u, but at a
// given u each strand sits at one v, so a few u-buckets is all a query needs.
function buildFieldSampler(P, strands) {
  const BUCKETS = 256;
  const buckets = Array.from({ length: BUCKETS }, () => []);
  for (const s of strands) {
    const n = s.centers.length;
    for (let i = 0; i < n; i++) {
      const j = (i + 1) % n;
      const c0 = s.centers[i];
      const mid = Math.atan2((c0[1] + s.centers[j][1]) / 2, (c0[0] + s.centers[j][0]) / 2);
      const bi = Math.min(BUCKETS - 1, Math.floor((((mid / TAU) % 1 + 1) % 1) * BUCKETS));
      buckets[bi].push([c0, s.centers[j], s.normals[i], s.normals[j], s.binormals[i], s.binormals[j]]);
    }
  }
  const hw = P.width / 2;
  const ht = P.thick / 2;
  const shellOuter = P.r + P.weave + P.thick + P.blend + 0.02;

  return function field(x, y, z) {
    const rho = Math.hypot(x, y);
    // cheap shell cull: anything far from the tube cannot be near a ribbon
    const dr = rho - P.R;
    const dz = z / P.flatten;
    const tubeDist = Math.hypot(dr, dz);
    if (tubeDist > shellOuter || tubeDist < P.r - P.weave - P.thick - P.blend - 0.02) {
      return tubeDist > shellOuter ? tubeDist - shellOuter + 0.05 : shellOuter;
    }
    const u = ((Math.atan2(y, x) / TAU) % 1 + 1) % 1;
    const bi = Math.floor(u * BUCKETS) % BUCKETS;
    const p = [x, y, z];
    let best = Infinity;
    for (let o = -2; o <= 2; o++) {
      const list = buckets[(bi + o + BUCKETS) % BUCKETS];
      for (let k = 0; k < list.length; k++) {
        const g = list[k];
        const d = segmentDistance(p, g[0], g[1], g[2], g[3], g[4], g[5], hw, ht, P.round);
        best = best === Infinity ? d : smoothMin(best, d, P.blend);
      }
    }
    return best === Infinity ? 1 : best;
  };
}

// ---------------------------------------------------------------- surface nets

const CORNER = [
  [0, 0, 0], [1, 0, 0], [0, 1, 0], [1, 1, 0],
  [0, 0, 1], [1, 0, 1], [0, 1, 1], [1, 1, 1],
];
const CUBE_EDGES = [
  [0, 1], [2, 3], [4, 5], [6, 7],
  [0, 2], [1, 3], [4, 6], [5, 7],
  [0, 4], [1, 5], [2, 6], [3, 7],
];

export function surfaceNets(dims, values, lo, cell) {
  const [nx, ny, nz] = dims;
  const cellIndex = new Int32Array((nx - 1) * (ny - 1) * (nz - 1)).fill(-1);
  const masks = new Uint8Array((nx - 1) * (ny - 1) * (nz - 1));
  const positions = [];
  const strides = [1, nx, nx * ny];
  const cstr = [1, nx - 1, (nx - 1) * (ny - 1)];
  const grid = new Float64Array(8);

  for (let z = 0; z < nz - 1; z++) {
    for (let y = 0; y < ny - 1; y++) {
      for (let x = 0; x < nx - 1; x++) {
        let mask = 0;
        for (let c = 0; c < 8; c++) {
          const [ox, oy, oz] = CORNER[c];
          const val = values[(x + ox) * strides[0] + (y + oy) * strides[1] + (z + oz) * strides[2]];
          grid[c] = val;
          if (val < 0) mask |= 1 << c;
        }
        const ci = x * cstr[0] + y * cstr[1] + z * cstr[2];
        masks[ci] = mask;
        if (mask === 0 || mask === 255) continue;

        let sx = 0, sy = 0, sz = 0, count = 0;
        for (const [a, b] of CUBE_EDGES) {
          if (((mask >> a) & 1) === ((mask >> b) & 1)) continue;
          const t = grid[a] / (grid[a] - grid[b]);
          sx += CORNER[a][0] + t * (CORNER[b][0] - CORNER[a][0]);
          sy += CORNER[a][1] + t * (CORNER[b][1] - CORNER[a][1]);
          sz += CORNER[a][2] + t * (CORNER[b][2] - CORNER[a][2]);
          count++;
        }
        cellIndex[ci] = positions.length / 3;
        positions.push(
          lo[0] + (x + sx / count) * cell,
          lo[1] + (y + sy / count) * cell,
          lo[2] + (z + sz / count) * cell,
        );
      }
    }
  }

  const indices = [];
  for (let z = 1; z < nz - 1; z++) {
    for (let y = 1; y < ny - 1; y++) {
      for (let x = 1; x < nx - 1; x++) {
        const ci = x * cstr[0] + y * cstr[1] + z * cstr[2];
        const v = cellIndex[ci];
        if (v < 0) continue;
        const mask = masks[ci];
        for (let d = 0; d < 3; d++) {
          // edge from corner 0 along axis d
          if ((mask & 1) === ((mask >> (1 << d)) & 1)) continue;
          const j = (d + 1) % 3;
          const k = (d + 2) % 3;
          const a = cellIndex[ci - cstr[j]];
          const b = cellIndex[ci - cstr[j] - cstr[k]];
          const c = cellIndex[ci - cstr[k]];
          if (a < 0 || b < 0 || c < 0) continue;
          if (mask & 1) indices.push(v, a, b, v, b, c);
          else indices.push(v, c, b, v, b, a);
        }
      }
    }
  }
  return { positions: new Float32Array(positions), indices: new Uint32Array(indices) };
}

// Surface nets puts a single vertex in each cell, so wherever two sheets of the
// surface pass through one cell they get stitched into a pinch: a vertex whose
// link is two cycles instead of one, and edges shared by four faces. No choice
// of resolution or blend radius removes them reliably, so repair them instead.
//
// For each vertex, group the incident faces into components connected through
// manifold edges, then give every component its own copy of the vertex, nudged
// a hair along that component's normal so the sheets genuinely come apart (and
// so vertex welding downstream does not merge them straight back).
export function repairPinches(positions, indices, eps) {
  const V = positions.length / 3;
  const F = indices.length / 3;
  const ekey = (a, b) => (a < b ? a * V + b : b * V + a);

  const edgeFaces = new Map();
  const vertFaces = Array.from({ length: V }, () => []);
  for (let t = 0; t < F; t++) {
    const tri = [indices[t * 3], indices[t * 3 + 1], indices[t * 3 + 2]];
    for (let i = 0; i < 3; i++) {
      const k = ekey(tri[i], tri[(i + 1) % 3]);
      let arr = edgeFaces.get(k);
      if (!arr) { arr = []; edgeFaces.set(k, arr); }
      arr.push(t);
      vertFaces[tri[i]].push(t);
    }
  }

  const faceNormal = (t) => {
    const a = indices[t * 3] * 3, b = indices[t * 3 + 1] * 3, c = indices[t * 3 + 2] * 3;
    const ux = positions[b] - positions[a], uy = positions[b + 1] - positions[a + 1], uz = positions[b + 2] - positions[a + 2];
    const vx = positions[c] - positions[a], vy = positions[c + 1] - positions[a + 1], vz = positions[c + 2] - positions[a + 2];
    return norm([uy * vz - uz * vy, uz * vx - ux * vz, ux * vy - uy * vx]);
  };

  // Decide, once and globally, which face continues into which across every
  // edge. Splitting vertices without this gives the two endpoints of a 4-face
  // edge inconsistent groupings, which tears the mesh open instead of
  // separating the sheets. Faces are paired to maximise normal alignment, i.e.
  // each sheet carries on as smoothly as it can.
  const partner = new Map(); // `${edgeKey}:${face}` -> face
  for (const [k, arr] of edgeFaces) {
    if (arr.length === 2) {
      partner.set(`${k}:${arr[0]}`, arr[1]);
      partner.set(`${k}:${arr[1]}`, arr[0]);
    } else if (arr.length === 4) {
      const n = arr.map(faceNormal);
      const align = (i, j) => n[i][0] * n[j][0] + n[i][1] * n[j][1] + n[i][2] * n[j][2];
      // two perfect matchings of four faces that avoid pairing 0 with its
      // best-aligned duplicate twice; pick whichever scores higher
      const options = [[[0, 1], [2, 3]], [[0, 2], [1, 3]], [[0, 3], [1, 2]]];
      let best = options[0], bestScore = -Infinity;
      for (const opt of options) {
        const s = align(opt[0][0], opt[0][1]) + align(opt[1][0], opt[1][1]);
        if (s > bestScore) { bestScore = s; best = opt; }
      }
      for (const [i, j] of best) {
        partner.set(`${k}:${arr[i]}`, arr[j]);
        partner.set(`${k}:${arr[j]}`, arr[i]);
      }
    }
  }

  const outPos = Array.from(positions);
  const outIdx = Int32Array.from(indices);
  let nextV = V;
  let split = 0;

  for (let v = 0; v < V; v++) {
    const faces = vertFaces[v];
    if (faces.length < 2) continue;
    const slot = new Map(faces.map((f, i) => [f, i]));
    const parent = faces.map((_, i) => i);
    const find = (x) => { while (parent[x] !== x) { parent[x] = parent[parent[x]]; x = parent[x]; } return x; };

    for (const f of faces) {
      const tri = [indices[f * 3], indices[f * 3 + 1], indices[f * 3 + 2]];
      for (let i = 0; i < 3; i++) {
        const a = tri[i], b = tri[(i + 1) % 3];
        if (a !== v && b !== v) continue;
        const other = partner.get(`${ekey(a, b)}:${f}`);
        if (other === undefined || !slot.has(other)) continue;
        const ra = find(slot.get(f)), rb = find(slot.get(other));
        if (ra !== rb) parent[ra] = rb;
      }
    }

    const groups = new Map();
    for (const f of faces) {
      const r = find(slot.get(f));
      if (!groups.has(r)) groups.set(r, []);
      groups.get(r).push(f);
    }
    if (groups.size <= 1) continue;
    split++;

    let firstGroup = true;
    for (const [, gf] of groups) {
      let nx = 0, ny = 0, nz = 0;
      for (const f of gf) { const n = faceNormal(f); nx += n[0]; ny += n[1]; nz += n[2]; }
      const n = norm([nx, ny, nz]);
      if (firstGroup) {
        firstGroup = false;
        outPos[v * 3] += n[0] * eps;
        outPos[v * 3 + 1] += n[1] * eps;
        outPos[v * 3 + 2] += n[2] * eps;
        continue;
      }
      const nv = nextV++;
      outPos.push(
        positions[v * 3] + n[0] * eps,
        positions[v * 3 + 1] + n[1] * eps,
        positions[v * 3 + 2] + n[2] * eps,
      );
      for (const f of gf) {
        for (let i = 0; i < 3; i++) if (outIdx[f * 3 + i] === v) outIdx[f * 3 + i] = nv;
      }
    }
  }

  const pos = new Float32Array(outPos);
  const idx = new Uint32Array(outIdx);

  // residual: sheets that the pairing could not separate because they are also
  // joined elsewhere, i.e. the surface genuinely touches itself here
  let bad = 0;
  {
    const n = pos.length / 3;
    const counts = new Map();
    for (let t = 0; t < idx.length; t += 3) {
      const tri = [idx[t], idx[t + 1], idx[t + 2]];
      for (let i = 0; i < 3; i++) {
        const a = tri[i], b = tri[(i + 1) % 3];
        const k = a < b ? a * n + b : b * n + a;
        counts.set(k, (counts.get(k) || 0) + 1);
      }
    }
    for (const c of counts.values()) if (c !== 2) bad++;
  }

  return { positions: pos, indices: idx, split, badEdges: bad };
}

function signedVolume(positions, indices) {
  let vol = 0;
  for (let i = 0; i < indices.length; i += 3) {
    const a = indices[i] * 3, b = indices[i + 1] * 3, c = indices[i + 2] * 3;
    const p = [positions[a], positions[a + 1], positions[a + 2]];
    const q = [positions[b], positions[b + 1], positions[b + 2]];
    const r = [positions[c], positions[c + 1], positions[c + 2]];
    vol += dot(p, cross(q, r));
  }
  return vol / 6;
}

// ---------------------------------------------------------------- entry point

export function buildWovenTorus(params = {}) {
  const P = { ...DEFAULT_PARAMS, ...params };
  const strands = [];
  const spacing = TAU / P.strands;
  for (let i = 0; i < P.strands; i++) strands.push(buildStrand(P, 1, i * spacing));
  for (let i = 0; i < P.strands; i++) {
    strands.push(buildStrand(P, -1, i * spacing + P.familyPhase * spacing));
  }

  const extentXY = P.R + P.r + P.weave + P.thick + 0.08;
  const extentZ = (P.r + P.weave + P.thick) * P.flatten + 0.08;
  const lo = [-extentXY, -extentXY, -extentZ];
  const cell = (2 * extentXY) / P.res;
  const dims = [
    Math.ceil((2 * extentXY) / cell) + 1,
    Math.ceil((2 * extentXY) / cell) + 1,
    Math.ceil((2 * extentZ) / cell) + 1,
  ];

  // Residual pinches mean two ribbon surfaces pass within a voxel of each other
  // without merging. Widening the smooth union closes that gap, so escalate
  // blend until the extraction comes out manifold (usually the first try).
  const values = new Float32Array(dims[0] * dims[1] * dims[2]);
  let mesh = null;
  let usedBlend = P.blend;

  for (const scale of [1, 1.5, 2.2, 3.2]) {
    const field = buildFieldSampler({ ...P, blend: P.blend * scale }, strands);
    let idx = 0;
    for (let z = 0; z < dims[2]; z++) {
      const pz = lo[2] + z * cell;
      for (let y = 0; y < dims[1]; y++) {
        const py = lo[1] + y * cell;
        for (let x = 0; x < dims[0]; x++) {
          values[idx++] = field(lo[0] + x * cell, py, pz);
        }
      }
    }
    // index order above is x fastest, matching surfaceNets' strides
    const raw = surfaceNets(dims, values, lo, cell);
    const fixed = repairPinches(raw.positions, raw.indices, cell * 0.3);
    if (mesh === null || fixed.badEdges < mesh.badEdges) {
      mesh = fixed;
      usedBlend = P.blend * scale;
    }
    if (mesh.badEdges === 0) break;
  }
  P.usedBlend = usedBlend;

  if (signedVolume(mesh.positions, mesh.indices) < 0) {
    for (let i = 0; i < mesh.indices.length; i += 3) {
      const t = mesh.indices[i + 1];
      mesh.indices[i + 1] = mesh.indices[i + 2];
      mesh.indices[i + 2] = t;
    }
  }

  return { positions: mesh.positions, indices: mesh.indices, strands, params: P };
}

// Expected hole count for the ideal lattice: every A-B pair crosses 2*wind
// times, each crossing is a degree-4 node, so genus = 2*wind*strands^2 + 1.
export function expectedHoles(P) {
  return 2 * P.wind * P.strands * P.strands;
}

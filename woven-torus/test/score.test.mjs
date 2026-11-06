// Run: node test/score.test.mjs
import assert from 'node:assert/strict';
import { buildWovenTorus, expectedHoles, DEFAULT_PARAMS } from '../src/wovenTorus.js';
import {
  analyze, score, hungarian, coefficientOfVariation, measureHalfTurns, analyzeTopology,
} from '../src/score.js';

const t0 = Date.now();
const log = (m) => console.log(`  ${m}`);

// --- Hungarian ---------------------------------------------------------------
{
  // optimal assignment is 0->1, 1->0 (cost 1+1=2), not the diagonal (5+5=10)
  const cost = Float64Array.from([5, 1, 1, 5]);
  const a = hungarian(cost, 2, 2);
  assert.deepEqual([...a], [1, 0]);

  const c3 = Float64Array.from([4, 1, 3, 2, 0, 5, 3, 2, 2]);
  const a3 = hungarian(c3, 3, 3);
  const total = [...a3].reduce((s, j, i) => s + c3[i * 3 + j], 0);
  assert.equal(total, 5); // 1 + 2 + 2
  log('hungarian: optimal assignment ✓');
}

// --- CV ----------------------------------------------------------------------
{
  assert.equal(coefficientOfVariation([5, 5, 5, 5]), 0);
  assert.ok(Math.abs(coefficientOfVariation([2, 4]) - (1 / 3)) < 1e-12);
  log('coefficientOfVariation ✓');
}

// --- twist measurement -------------------------------------------------------
{
  // flat circle in the xy-plane, ribbon normal always +z => no twist
  const n = 400;
  const centers = [], normals = [], refs = [];
  for (let i = 0; i < n; i++) {
    const a = (2 * Math.PI * i) / n;
    centers.push([Math.cos(a), Math.sin(a), 0]);
    normals.push([0, 0, 1]);
    refs.push([0, 0, 1]);
  }
  assert.ok(Math.abs(measureHalfTurns(centers, normals, refs)) < 0.02, 'flat ring should not twist');

  // same circle, normal rotating one half-turn about the tangent (Moebius band)
  const mob = [];
  for (let i = 0; i < n; i++) {
    const a = (2 * Math.PI * i) / n;
    const t = (Math.PI * i) / n; // half-turn over the loop
    mob.push([Math.cos(a) * Math.sin(t), Math.sin(a) * Math.sin(t), Math.cos(t)]);
  }
  const ht = measureHalfTurns(centers, mob, refs);
  assert.ok(Math.abs(ht - 1) < 0.05, `expected 1 half-turn, got ${ht}`);
  log('measureHalfTurns: 0 and 1 half-turns ✓');
}

// --- topology on a known mesh ------------------------------------------------
{
  // unit tetrahedron: V=4, E=6, F=4, chi=2, genus 0
  const positions = Float32Array.from([0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1]);
  const indices = Uint32Array.from([0, 2, 1, 0, 1, 3, 0, 3, 2, 1, 2, 3]);
  const t = analyzeTopology(positions, indices);
  assert.equal(t.V, 4);
  assert.equal(t.E, 6);
  assert.equal(t.F, 4);
  assert.equal(t.chi, 2);
  assert.equal(t.genus, 0);
  assert.ok(t.valid, 'tetrahedron should be watertight + manifold + single body');

  // drop a face -> open mesh
  const open = analyzeTopology(positions, indices.slice(0, 9));
  assert.ok(!open.watertight);
  assert.ok(!open.valid);
  log('analyzeTopology: tetrahedron genus 0, open mesh rejected ✓');
}

// --- the generated reference -------------------------------------------------
console.log('\nbuilding reference mesh...');
const ref = buildWovenTorus({ res: 150 });
const refA = analyze(ref, { samples: 400000, fScoreSamples: 60000 });
log(`topology: V=${refA.topology.V} E=${refA.topology.E} F=${refA.topology.F}`);
log(`watertight=${refA.topology.watertight} manifold=${refA.topology.manifold} components=${refA.topology.components}`);
log(`genus=${refA.topology.genus} -> holes N=${refA.holeCount} (lattice predicts ${expectedHoles(ref.params)})`);
log(`raster holes=${refA.rasterHoleCount}  CV=${refA.cv.toFixed(3)}  bulge=${refA.bulge.toFixed(3)}`);
log(`twist half-turns per strand: [${refA.twists.join(', ')}]`);

assert.ok(refA.topology.valid, 'reference mesh must pass the validity gate');
assert.equal(refA.holeCount, expectedHoles(ref.params),
  'genus-1 should equal the lattice hole count 2*wind*strands^2');
assert.ok(refA.twists.every((t) => t === 0), 'untwisted ribbons should measure 0 half-turns');

// --- identical mesh scores 100 ----------------------------------------------
{
  const s = score(refA, refA);
  log(`self-score: ${s.total.toFixed(2)} / 100`);
  assert.ok(s.total > 99.0, `identical meshes should score ~100, got ${s.total}`);
  log('score: self-comparison ≈ 100 ✓');
}

// --- a degraded candidate scores lower --------------------------------------
{
  console.log('\nbuilding degraded candidate (fewer strands, twisted ribbons)...');
  const bad = buildWovenTorus({ res: 150, strands: 3, twistHalfTurns: 2 });
  const badA = analyze(bad, { samples: 400000, fScoreSamples: 60000 });
  const s = score(badA, refA);
  log(`holes=${badA.holeCount} (ref ${refA.holeCount})  twists=[${badA.twists.join(', ')}]`);
  log(`score: ${s.total.toFixed(2)} / 100`);
  for (const [k, v] of Object.entries(s.terms)) {
    log(`   ${k.padEnd(15)} ${v.score.toFixed(2).padStart(6)}`);
  }
  assert.ok(s.total < 95, 'a structurally different mesh must not score ~100');
  // sign follows the direction the centreline is sampled in, which is a free
  // convention; only the magnitude and the agreement with the reference matter
  assert.ok(badA.twists.every((t) => Math.abs(t) === 2), 'twistHalfTurns=2 should measure as 2 half-turns');
  assert.equal(s.terms.twist.score, 0, 'no strand matches the untwisted reference');
  log('score: degraded candidate ranks below reference ✓');
}

console.log(`\nall checks passed in ${((Date.now() - t0) / 1000).toFixed(1)}s`);

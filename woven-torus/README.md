# Woven Torus — generation & scoring

A parametric generator for the interwoven-ring shape, plus the 7-item rubric that
scores a candidate mesh against a reference.

```
python3 -m http.server 8099     # ES modules need http, not file://
open http://localhost:8099/     # viewer: reference + 7 candidates, shared camera
npm test                        # node test/score.test.mjs — headless checks
```

`src/` has no three.js dependency, so the whole scoring pipeline runs in node.
The viewer is the only part that imports three.

## How the shape is built

Two families of helical ribbons live on a flattened torus: family A follows
`v = +wind·u + phase`, family B follows `v = −wind·u + phase`. They cross wherever
their poloidal angles agree.

Weaving is a single cosine. Each ribbon is pushed radially by
`off = ±weave · cos(strands · v)`. Consecutive crossings along one strand are
`du = π/(strands·wind)` apart, i.e. `dv = π/strands`, so `strands·v` advances by
exactly π between crossings and the cosine flips sign — over, under, over, under.
The two families take opposite signs, so at every crossing one ribbon is outside
and the other inside.

The ribbons are then unioned as a signed distance field and polygonised with
surface nets. Going through an SDF rather than sweeping tubes matters: swept
tubes would be `2·strands` separate closed surfaces that merely interpenetrate,
which fails the "single connected body" gate and makes genus meaningless. In the
SDF the ribbons overlap slightly at each crossing (keep `weave < thick/2`) and
fuse into one body.

For the ideal lattice every A–B pair crosses `2·wind` times, each crossing is a
degree-4 node, so `genus = 2·wind·strands² + 1` and the hole count is
`2·wind·strands²`. With the defaults (`strands: 4, wind: 1`) that is 32 holes,
and the measured genus is 33 — `expectedHoles()` and the test assert this.

### Pinch repair

Surface nets places one vertex per cell, so anywhere two sheets of the surface
pass through a single cell they get stitched together: a vertex whose link is two
cycles, and edges shared by four faces. No choice of resolution removes them.

`repairPinches()` fixes this in two stages. First it decides globally which face
continues into which across every edge — for a 4-face edge it picks the pairing
that maximises normal alignment, so each sheet carries on as smoothly as it can.
Only then does it split vertices into per-sheet copies, nudged a fraction of a
voxel apart. Doing the split without the global pairing gives the two endpoints of
a 4-face edge inconsistent groupings and tears the mesh open instead (that bug
turned 176 four-face edges into 176 one-face edges before it was fixed).

Residual pinches mean two ribbon surfaces pass within a voxel without merging, so
`buildWovenTorus` escalates the smooth-union radius until the extraction comes out
manifold. If a parameter set still fails, the surface really does touch itself and
the validity gate is right to flag it.

## Scoring

| # | Item | Measurement | Score |
|---|------|-------------|-------|
| 0 | Validity (gate) | watertight, manifold, single component | pass ×1.0 · fail ×0.5 |
| 1 | Hole count | `N = genus − 1` | `15 · max(0, 1 − \|N−N_ref\|/N_ref)` |
| 2 | Hole consistency | coefficient of variation of hole areas | `10 · max(0, 1 − \|CV−CV_ref\|/0.3)` |
| 3 | Hole correspondence | Hungarian match, per-hole IoU | `25 · mean IoU` |
| 4 | Strand twist | half-turns per strand loop | `20 · fraction matching ref` |
| 5 | Outer bulge | sagitta ÷ chord of the outer arc | `15 · max(0, 1 − \|s−s_ref\|/s_ref)` |
| 6 | Overall shape | F-score, `τ` = 1% of bbox diagonal | `15 · F` |
| | **Total** | | `(sum) × validity` |

**Holes** are measured in the torus parameter domain. Every surface sample maps to
`(u, v)` on a fitted torus, material is rasterised onto a periodic grid, and each
empty connected component is one hole. This works for any roughly-toroidal mesh,
not only the ones this generator produces, and it gives both the per-hole area for
item 2 and the per-hole mask for the IoU in item 3. Item 1 still uses `genus − 1`
from the Euler characteristic; the raster count is reported alongside as a check
(they agree on the reference).

**Alignment.** A candidate may be rotated about the ring or rolled poloidally, so
before matching holes the two coverage masks are brute-forced over all `(du, dv)`
shifts on a coarse grid. The `du` part is a genuine rotation about Z, so it is also
applied before the F-score.

**Twist** is measured against the outward normal of the fitted torus, not a
parallel-transported frame. The rubric asks whether the outward face ends up facing
inward; a parallel frame would additionally pick up the writhe of the helical path
and report ±2 half-turns on a ribbon that in fact lies flat on the surface the
whole way round. The angle is unwrapped modulo π, not 2π, because the ribbon's two
faces make `+n` and `−n` the same state — that also handles the seam, where a
ribbon with an odd number of half-turns returns to `−n(0)`. The sign follows the
direction the centreline is sampled in and carries no meaning; only agreement with
the reference counts.

Twist needs per-strand centrelines and frames, which the generator attaches to its
output. Scoring an arbitrary third-party mesh would need those recovered by
skeletonisation; the other six items work from the triangles alone.

## Typical results

Reference: `genus 33`, `N = 32`, `CV 0.342`, `bulge 0.505`.

| candidate | defect | valid | count | cons | corr | twist | bulge | shape | total |
|---|---|---|---|---|---|---|---|---|---|
| A | barely off | ok | 15.0 | 9.9 | 24.4 | 20.0 | 15.0 | 15.0 | **99.3** |
| C | wider ribbons | ok | 15.0 | 6.0 | 14.6 | 20.0 | 14.4 | 15.0 | **84.9** |
| B | thin ribbons | ok | 15.0 | 5.7 | 14.2 | 20.0 | 14.9 | 14.9 | **84.7** |
| D | fewer strands | ok | 8.4 | 4.4 | 2.0 | 15.0 | 13.9 | 9.0 | **52.7** |
| E | too many strands | ok | 0.0 | 7.3 | 1.1 | 13.3 | 14.7 | 10.6 | **47.0** |
| G | no weave, flat | ok | 7.5 | 0.8 | 1.2 | 20.0 | 9.6 | 5.4 | **44.5** |
| F | twisted + wound | ok | 0.0 | 6.7 | 3.0 | 0.0 | 13.9 | 9.4 | **33.0** |

Hole areas are genuinely bimodal — the `familyPhase` offset makes 16 large and 16
small holes — so `CV ≈ 0.34` is the reference value, and item 2 is the most
sensitive of the seven. Widening the ribbons by a few percent takes a fixed band
off every hole, which costs the small ones proportionally far more and moves CV a
long way. That is the metric working, not misbehaving.

## Parameters

| param | default | meaning |
|---|---|---|
| `R`, `r` | 1, 0.33 | major radius, poloidal radius |
| `flatten` | 0.72 | z-squash of the cross-section (1 = circular) |
| `strands` | 4 | ribbons per family; total is `2·strands` |
| `wind` | 1 | poloidal turns per major turn |
| `width`, `thick` | 0.15, 0.075 | ribbon cross-section |
| `weave` | 0.03 | radial over/under amplitude; `< thick/2` to stay fused |
| `blend` | 0.06 | smooth-union radius; escalated automatically if needed |
| `twistHalfTurns` | 0 | extra half-turns of the ribbon per loop |
| `res` | 160 | surface-nets grid resolution on the longest axis |

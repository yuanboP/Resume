# Draft — Recommendation Letter (Dawn Song for Yuanbo Pang)

*Working draft for Prof. Song's team. Bracketed items are judgments only
Prof. Song can calibrate. Built around three concrete cases rather than
adjectives.*

---

To the Admissions Committee:

I write to give my strongest recommendation for Yuanbo Pang, an
undergraduate researcher in my group at Berkeley RDI/BAIR since October
2025. Rather than list qualities, let me describe three things he actually
did. [He is among the top X undergraduates I have worked with in Y years.]

**He turned a flood of raw submissions into a benchmark.** Agents' Last
Exam (ALE, under review at NeurIPS 2026; #1 Paper of the Week on Hugging
Face) collected tasks from hundreds of external domain experts — 310
authors in total. What arrived was raw: workflows in inconsistent formats,
missing environments, untestable claims. Yuanbo owned the review and
conversion layer that made this scale survivable. He reviewed external
submissions, decided what a benchmark-grade task required, and built the
pipeline that converted accepted workflows into executable VM tasks — the
load/start/evaluate contract all 1,000+ tasks now run on — together with
the cross-domain automated scoring that grades agent outputs without hand
labels and doubles as verifiable rewards for RL. ALE's influence rests on
the fact that its tasks actually run and its scores can be trusted; that
layer was Yuanbo's. He is one of five co-first authors, and when frontier
model teams later evaluated their agents on ALE, everything ran on his
infrastructure.

**He compresses weeks into days.** Yuanbo's distinctive engineering habit
is massive parallelization: work that would take another student a week —
converting a batch of submissions, standing up capture environments for a
new application family, re-running a scoring sweep after a contract change
— he routinely finishes in one or two days by decomposing it into
parallel jobs across fleets of machines and agents, with independent
review gating what ships. The same instinct shows up as cost discipline:
when capture workloads strained our budget, he set up a dedicated
transpacific link to low-cost machines and cut our server costs roughly
thirty-fold. This is not engineering for its own sake; it is why his
research moves at the pace it does.

**He proposed a research direction and carried it to a first-author
paper.** For ALE's second phase, Yuanbo asked a question the field had
not: can an agent *rebuild* professional software — AutoCAD, Maya, Blender
— from documentation alone, judged by replaying identical operation
scripts on the original and the reconstruction, checking state and GUI
after every step? That became *Software Last Exam* (under double-blind
review at CVPR 2027, Yuanbo as first author). He designed the seven-stage
construction pipeline, the hidden suites with negative controls that force
shortcut solutions to zero, and the production system behind it; the
pipeline has collected 130K+ cases across 76 applications on Windows,
Linux, and macOS. He also leads our medical track with Prof. Zihuai He at
Stanford, building benchmark tasks from Alzheimer's Disease Research
Center data.

The pattern across all three: Yuanbo finds the question worth asking, then
builds — at unusual speed — the system that answers it. I expect him to
become the kind of researcher who defines how we measure AI systems, and I
recommend him [without reservation / with my strongest enthusiasm].

Sincerely,

Dawn Song
Professor, EECS
University of California, Berkeley

---

## Notes for the drafting team

- ~520 words; one page on letterhead.
- Each paragraph is one verifiable case: (1) external-submission review →
  benchmark-grade tasks + pipeline/scoring ownership; (2) parallelization
  speed + 30× cost cut; (3) Software Last Exam first-author + medical
  track. No filler adjectives.
- Bracketed superlatives are Prof. Song's call.

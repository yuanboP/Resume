# Draft — Recommendation Letter (Dawn Song for Yuanbo Pang)

*Working draft for Prof. Song's team to edit. Everything here is consistent
with the contribution summary; bracketed items are judgments only Prof. Song
can calibrate.*

---

To the Admissions Committee:

I am writing to give my strongest recommendation for Yuanbo Pang, who is
applying to your PhD program. Yuanbo is an undergraduate researcher in my
group at Berkeley RDI/BAIR, where he has worked with me since October 2025.
In that time he has grown from a contributor on a large team project into
someone who independently leads research tracks, publishes as a first
author, and builds infrastructure the whole group depends on. [He is among
the top X undergraduates I have worked with in Y years at Berkeley.]

Yuanbo joined my group to work on Agents' Last Exam (ALE), our large-scale
benchmark for evaluating AI agents on long-horizon, real-world tasks (under
review at NeurIPS 2026; it reached #1 Paper of the Week on Hugging Face
Daily Papers). ALE is a 310-author effort, so I want to be precise about
what was his. Yuanbo is one of five co-first authors, and within the team he
owned two of the load-bearing pieces: the task pipeline that converts
expert-designed workflows into executable VM tasks — the load/start/evaluate
contract that every one of the benchmark's 1,000+ tasks runs on — and the
cross-domain automated scoring system, whose programmatic evaluators score
agent outputs without hand labels and double as verifiable rewards for RL
post-training. When we later ran large-scale evaluations with frontier model
teams, all of it ran on infrastructure Yuanbo had built. For an
undergraduate to own components at this level of criticality, in a project
of this size, is rare.

What distinguishes Yuanbo most is what happened next. For ALE's second
phase, he proposed and now leads the software-engineering track, which has
become its own research program: Software Last Exam (under double-blind review at
CVPR 2027, with Yuanbo as first author). The idea is demanding — agents must
rebuild professional applications such as AutoCAD, Maya, and Blender from
official documentation alone, and the evaluation replays identical operation
scripts on the original and the reconstruction, checking both program state
and the GUI after every operation. Yuanbo designed the construction
hierarchy and the seven-stage authoring and validation pipeline, including
hidden test suites with negative controls that force shortcut solutions to
score zero. He also built the operational side: independent review gating
every task, a progress dashboard tracking all applications through the
pipeline, and — characteristically — a dedicated transpacific link that
moved capture workloads onto low-cost machines and cut our server costs by
roughly thirty-fold. The pipeline has collected over 130,000 cases across 76
professional applications spanning Windows, Linux, and macOS. He thinks
simultaneously like a researcher (what makes a measurement trustworthy?) and
like a systems engineer (what makes it run at scale, affordably?), and I
rarely see both in one student.

Beyond the SWE track, Yuanbo leads our medical track in collaboration with
Prof. Zihuai He at Stanford, turning Alzheimer's Disease Research Center
data into benchmark tasks — he drives the task design and grader
construction day to day. He contributes to our bio track (protein-structure
tasks with the startup New Atlantic) and is second author on Agent's GameDev
Exam (under review at ICLR 2027). Outside my group, he does robot-learning
data research in Prof. Masayoshi Tomizuka's lab and has built his own
agent-infrastructure systems — breadth that feeds back into his work with
us.

Yuanbo is self-driven to an unusual degree: the collaborations, the
infrastructure, and the first-author paper above all began as his
initiative. He communicates clearly, takes feedback well, and is generous
with teammates. I expect him to thrive in a PhD program and to become the
kind of researcher who defines how we measure AI systems. I recommend him
[without reservation / with my strongest enthusiasm].

Sincerely,

Dawn Song
Professor, EECS
University of California, Berkeley

---

## Notes for the drafting team

- Bracketed superlatives (top-X ranking, closing strength) are Prof. Song's
  call; the rest is verifiable against the contribution summary and CV.
- Length ~650 words — standard one-to-1.5 pages on letterhead.
- If one paragraph must be cut for shorter forms, cut the "Beyond the SWE
  track" paragraph before anything else; the V1-ownership and Software Last Exam
  paragraphs carry the letter.

# Contribution Summary — Yuanbo Pang (for recommendation letter)

**To:** dawnsong.ref@gmail.com
**Applicant:** Yuanbo Pang, UC Berkeley EECS undergraduate (B.S. expected Dec 2026)
**Applying to:** PhD programs, Fall 2027 (AI agents, agent evaluation, robot learning)
**Group:** Berkeley RDI / BAIR, Prof. Dawn Song's group, Oct 2025 – present
**Contact:** yuanbopang@berkeley.edu · (408) 460-7526 · yuanbopang.pro

A list of schools and deadlines (Interfolio vs. direct upload) will follow in a
separate email.

ALE is a large team effort led by Prof. Song (310 authors on V1). This summary
is written to separate **what I personally built and own** from what the team
did around me.

---

## Part 1 · ALE V1 — what I contributed

*Agents' Last Exam*, arXiv:2606.05405, under review at NeurIPS 2026.
One of 5 co-first authors. #1 Paper of the Week, Hugging Face Daily Papers.

Within the V1 team, I owned:

- **The task pipeline.** I built the system that converts expert-designed
  workflows into executable VM tasks — the load/start/evaluate contract that
  every one of the 1,000+ tasks runs on, including computer-use tasks with
  browser/desktop automation.
- **The auto-scoring system.** I built the cross-domain programmatic
  evaluators (hash, tabular, geometric, visual, behavioral) that score agent
  outputs without hand labels, and that double as verifiable rewards for RL
  post-training (RLVR).

The team's large-scale evaluation runs — sandboxed execution on GCP and the
evaluations with frontier model teams (OpenAI, Anthropic, Meta TBD Lab, Qwen,
Seed) — ran on this pipeline and scoring infrastructure.

## Part 2 · ALE V2 — what I am doing, domain by domain

In V2 I moved from building shared infrastructure to owning domains.

**SWE — track lead, first author of ALE-Replica (CVPR 2027, under
double-blind review).**
First author of *ALE-Replica: Last Exam for Agents in Reconstructing
Professional Software*. Agents must rebuild professional applications —
commercial and open-source alike, across Windows, Linux, and macOS (AutoCAD,
Maya, Revit, Rhino, Ansys, Photoshop, 3ds Max; Blender, FontForge,
OpenModelica, and more) — from official documentation alone; unlike prior reconstruction or visual-code benchmarks, evaluation
replays the same operation scripts on the original and the reconstruction
and checks **both state readbacks and the GUI after every operation**, not
just final outputs. I designed the construction hierarchy (API → case →
module → software) and the seven-stage authoring/validation pipeline with
anti-shortcut hidden suites, with independent review gating every task and a
progress dashboard I built tracking each application through the pipeline.
On the infrastructure side, I set up a dedicated transpacific link that
moves capture and build workloads onto low-cost machines, cutting our GCP
server costs by roughly 30×.
The pipeline has collected 130K+ cases across 76 professional applications;
pilot evaluation: 22 bundles across six applications (~17K case
occurrences), where a frontier agent reaches 34.8% with zero fully passing
bundles.

**Medical — track lead, collaboration with Prof. Zihuai He (Stanford).**
I lead the medical track, working directly with Prof. Zihuai He to turn ADRC
(Alzheimer's Disease Research Center) data into benchmark tasks: I drive the
task design and grader construction for agent workflows over real
patient-derived research data.

**Bio — partnership with New Atlantic (newatlantic.ai).**
Participating in building protein-structure tasks with New Atlantic, a
company focused on evaluating and training scientific research agents with
university labs: agents work from 2D structure to 3D structure, with
programmatic verification of the predicted structures. I contribute to the
task specification and the verification design.

**Game.**
2nd author of *Agent's GameDev Exam* (under review, ICLR 2027): agent
evaluation in game-development environments.

Across tracks, I work within the same end-to-end loop I built for V1:
turning expert workflows into executable task specs, building graders,
calibrating difficulty, and QC before a task ships.

## Outputs

- *Agents' Last Exam* — co-first author; NeurIPS 2026 under review; HF #1 of
  the week.
- *ALE-Replica* — **first author**; CVPR 2027 under review.
- *Agent's GameDev Exam* — 2nd author; ICLR 2027 under review.
- *ScienceIDE* (arXiv:2609.19134) — co-author; HF #2 of the day.

## Themes the letter could speak to (suggestions only)

1. **Clear individual ownership inside a 310-author project** — the task
   pipeline and auto-scoring in V1 were mine; in V2 I lead the SWE track
   (first-author paper) and the medical track, and contribute to the bio and
   game tracks.
2. **Research taste plus systems ability** — I both decide what a trustworthy
   evaluation is and build the infrastructure that runs it at scale.
3. **Initiative across institutions** — I drive the Stanford collaboration
   (Prof. Zihuai He) on the medical track day to day, and contribute to the
   New Atlantic partnership on bio.

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

**SWE — track lead, first author of the ALE-SWE framework.**
I designed and am writing up the complete software-engineering track: task
schema, environment construction, graders, and QC. [1–2 sentences on what
makes ALE-SWE different from existing SWE benchmarks — fill in; status:
manuscript in preparation / adjust.]

**Medical — track lead, collaboration with Prof. Zihuai He (Stanford).**
Building medical-research agent tasks on ADRC (Alzheimer's Disease Research
Center) data: I drive the task design and grader construction for agent
workflows over real patient-derived research data.

**Bio — track lead, partnership with New Atlantic [confirm name].**
Designing protein-structure tasks: agents work from 2D structure to 3D
structure, with programmatic verification of the predicted structures. I own
the task specification and the verification design.

**Game — co-lead.**
Co-author (3rd author) of *Agent's GameDev Exam* (under review, ICLR 2027):
agent evaluation in game-development environments.

**Physics — co-lead.** [1 sentence on your concrete piece — fill in.]

**Astronomy — co-lead.** [1 sentence on your concrete piece — fill in.]

Across tracks, my role is the same end-to-end loop I built for V1: recruit
domain experts, turn their workflows into executable task specs, build the
graders, calibrate difficulty, and QC every task before it ships.

## Outputs

- *Agents' Last Exam* — co-first author; NeurIPS 2026 under review; HF #1 of
  the week.
- *Agent's GameDev Exam* — 3rd author; ICLR 2027 under review.
- *ScienceIDE* (arXiv:2609.19134) — co-author; HF #2 of the day.

## Themes the letter could speak to (suggestions only)

1. **Clear individual ownership inside a 310-author project** — the task
   pipeline and auto-scoring in V1 were mine; in V2 I independently lead
   three domains and co-lead three more.
2. **Research taste plus systems ability** — I both decide what a trustworthy
   evaluation is and build the infrastructure that runs it at scale.
3. **Initiative across institutions** — the Stanford (Prof. Zihuai He) and
   industry collaborations for the medical and bio tracks are ones I drive.

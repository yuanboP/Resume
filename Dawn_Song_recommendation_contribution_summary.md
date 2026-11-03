# Contribution Summary — Yuanbo Pang (for recommendation letter)

**To:** dawnsong.ref@gmail.com
**Applicant:** Yuanbo Pang, UC Berkeley EECS undergraduate (B.S. expected Dec 2026)
**Applying to:** PhD programs, Fall 2027 (AI agents, agent evaluation, robot learning)
**Group:** Berkeley RDI / BAIR, Prof. Dawn Song's group, Oct 2025 – present
**Contact:** yuanbopang@berkeley.edu · (408) 460-7526 · yuanbopang.pro

A list of schools and deadlines (including which ones need a direct upload vs.
Interfolio) will follow in a separate email.

---

## Overview

I joined Prof. Song's group in October 2025 and have worked on **Agents' Last
Exam (ALE)** continuously since then — first as a core builder of the V1
benchmark and evaluation system, now as the owner of several domain tracks and
the first author of the ALE-SWE framework. My work spans the full pipeline:
recruiting domain experts, turning expert workflows into executable task
environments, building the programmatic graders that produce verifiable
rewards, and running evaluations of frontier models.

## 1 · ALE V1 — co-first author

*Agents' Last Exam*, arXiv:2606.05405, under review at NeurIPS 2026.
Co-first author (5 co-first among 310 authors). **#1 Paper of the Week on
Hugging Face Daily Papers (June 2026).**

- Led the task pipeline and auto-scoring system: converted expert-designed
  workflows into 1,000+ executable VM tasks (load/start/evaluate contracts)
  across 55 subdomains, including computer-use tasks with browser/desktop
  automation.
- Built cross-domain programmatic evaluators (hash, tabular, geometric,
  visual, behavioral) producing verifiable rewards usable for both
  measurement and RL post-training (RLVR) — no hand labels in the scoring
  loop.
- Ran sandboxed agent evaluation at scale on GCP (container/VM task runners);
  worked with frontier model teams (OpenAI, Anthropic, Meta TBD Lab, Qwen,
  Seed) on agent evaluation through ALE — analyzing trajectories and
  reporting failure modes back to the labs.

## 2 · ALE-SWE — first author

- First author of the **ALE-SWE framework**: the complete software-engineering
  track of ALE, from task schema and environment design through graders and
  QC. [Status: manuscript in preparation / adjust as appropriate.]

## 3 · Agent's GameDev Exam — ICLR 2027, under review

- Co-author (3rd author) of *Agent's GameDev Exam* (with Zonglin Di, Yinhe
  Wang, et al., Dawn Song): agent evaluation in game-development
  environments; grew out of the ALE game track, which I co-lead.

## 4 · Domain leadership across ALE

- **Lead** of three ALE tracks: **SWE, Medical, Bio** — owning each end to
  end: expert recruiting, task specification, grader construction, difficulty
  calibration, and QC of every shipped task.
- **Co-lead** of three further tracks: **Game, Physics, Astronomy**.

## 5 · ALE-Medical — collaboration with Stanford

- Leading the medical track in collaboration with **Prof. Zihuai He
  (Stanford)**: building clinical/medical-research agent tasks on **ADRC
  (Alzheimer's Disease Research Center) data**, with graders that respect the
  constraints of real patient-derived datasets.

## 6 · ALE-Bio — protein-structure tasks

- Leading the bio track in partnership with **New Atlantic** [confirm exact
  organization name]: designing tasks where agents reason from **2D protein
  structure to 3D structure**, with programmatic verification of the
  predicted structures.

## 7 · ALE V2 — current directions

- Building 3D/spatial-understanding environments in simulation (Blender,
  NVIDIA Isaac Lab) where agents explore a scene to judge physical state.
- Designing ultra-long-horizon tasks from large-scale production software,
  with a harness that evaluates *teams* of agents — coordination, division of
  labor, context handoff.

## Other context (if useful for the letter)

- Additional publication: *ScienceIDE* (arXiv:2609.19134), #2 Paper of the
  Day on Hugging Face Daily Papers (Sep 2026).
- Robot-learning data benchmark (`roboqa`) in Prof. Tomizuka's lab, advised
  by Zhuo Xu: dataset-quality measurement at EgoDex scale; VLA
  train/post-train evaluation in simulation.
- Founded Equile (Apr–Oct 2026): sandboxed agent-runtime infrastructure.
- GPA 3.762 (in-major 3.811).

## Themes the letter could speak to (suggestions only)

1. **Ownership at unusual scale for an undergraduate** — from one of five
   co-first authors on a 310-author benchmark to independently leading three
   domain tracks and authoring the SWE framework.
2. **Full-stack research ability** — the rare combination of research taste
   (what makes an evaluation trustworthy) and the systems ability to build
   the infrastructure that runs it.
3. **Cross-institution initiative** — self-driven collaborations with
   Stanford (Prof. Zihuai He) and industry partners for the medical and bio
   tracks.

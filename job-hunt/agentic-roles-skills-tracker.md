# Agentic Roles — Skills Tracker

Last updated: 2026-07-14  
Goal: full-time Software / AI (agentic) after **Expected Dec 2026**  
Profile anchors: UC Berkeley EECS · ALE (co-first) · Equile · BAIR · Starbot · Geopogo

> **New JD log:** see [§ Unlabeled — LLM / Agentic Research](#14-unlabeled--llm--agentic-research-jd-captured-2026-07-14) (PhD/MS + RLHF/training bar).

---

## How to use this doc

1. **投递状态** 改 `Status` 列：`todo` → `applied` → `referral` → `interview` → `offer` / `reject` / `skip`
2. **技能** 分三档：
   - **Must** = JD 硬门槛 / 面试必考
   - **Nice** = 加分
   - **You have** = 你已有，申请时主动写
3. **学习优先级** 见文末；先补 **跨岗位共用技能**，再补单公司深度

---

## Snapshot: your current stack (baseline)

| Area | What you already have |
|------|------------------------|
| Agent eval / benchmarks | ALE co-first: task pipeline, auto-scoring, VM tasks (`load`/`start`/`evaluate`), RL-oriented reward envs |
| Agent runtime / sandbox | Equile: sessions, auth, multi-harness (Claude Code/Codex/Cursor/Grok/Docker), MCP, Modal workers, scheduling |
| Computer-use / desktop agents | ALE tasks + Cua tooling (in progress) |
| Full-stack product | Geopogo (React/TS, FastAPI, Gemini), OpenCache, Context8, Ludus |
| Robotics / VLA | Starbot: NL → planning/control, e2e robot system |
| Research signal | BAIR/RDI Dawn Song; arXiv ALE; Stevens FL+DP |
| Languages / systems | Python, C++, TS/JS, SQL, Rust basics; Docker, Postgres, Redis, PyTorch |

**Common gaps vs senior / frontier postings:** multi-year production ownership, large-scale training infra, customer FDE depth, official “12+ years”, pure research PhD track.

---

## Role tracker

### Legend (Status)

`todo` | `applied` | `messaged` | `interview` | `offer` | `reject` | `skip`

---

### 1. Distyl — Research Engineers, Agents

| Field | Detail |
|-------|--------|
| **Location** | SF hybrid (Tue–Thu in office) |
| **Level / pay** | ~$150–250K + equity (early–mid; entry-heavy applicant mix) |
| **Fit** | **High** — eval + agent systems + production |
| **Status** | `todo` |
| **Contact** | Sraavya Sambara (BAIR alum) — LinkedIn message drafted |
| **Apply note** | Ignore LinkedIn “low match”; 63% entry-level clickers |

**Must skills**
- Build agentic systems: tools, retrieval, planning, memory, multi-step execution
- Clean Python; debug stateful systems
- Compound AI: orchestration + evaluators + external APIs
- Evaluation frameworks (task success, reliability, failure modes)
- Customer/enterprise workflow translation (show vs tell)
- AI-native daily workflow (code, traces, debug with models)

**Nice**
- Production hardening with AI Engineers
- Observability / tracing for agents
- Domain workflows (telecom, healthcare, etc.)

**You have**
- ALE eval + scorers + sandboxes
- Equile runtime/orchestration
- Product shipping (not only papers)

**Gaps to close**
- [ ] One write-up: “agent failure taxonomy + how we score it” (ALE-based)
- [ ] Demo traces / logs of multi-step agent run (Equile or Cua)
- [ ] Short story: ambiguous workflow → agent design → eval

---

### 2. Cua (YC P25) — Research Intern (Summer 2026)

| Field | Detail |
|-------|--------|
| **Location** | SF / Remote US · US citizen/visa only |
| **Pay** | $8–9.25K/mo + 0.25–0.50% |
| **Fit** | **High on work**, **low on paper bar** (PhD preferred) |
| **Status** | `messaged` / apply as exception |
| **Note** | Already building ALE tasks + Cua tools — lead with that |

**Must skills**
- Multi-modal / computer-use agents (GUI, browser, OS)
- Data gen/curation at scale (screens, UI trajectories)
- Benchmarking agent orchestration (± human-in-the-loop)
- PyTorch, Python, cloud (AWS/GCP)
- Experiment design + open-source / publish mindset

**Nice**
- RL for agents
- Prior open benchmarks
- SF presence

**You have**
- ALE × Cua integration path
- Benchmark + sandbox DNA
- Equile (adjacent infra)

**Gaps to close**
- [ ] Minimal public Cua demo or 1-pager benchmark idea
- [ ] Confirm visa/CPT eligibility
- [ ] Honest framing: not PhD, exception via overlap

**Parallel**
- Consider **Founding Engineer, Infra & Agent Systems** if full-time track

---

### 3. Nous Research — Forward Deployed Engineer (primary)

| Field | Detail |
|-------|--------|
| **Location** | (check careers; often remote-friendly) |
| **Fit** | **Highest for “agentic engineer”** |
| **Status** | `todo` — email recruiting@nousresearch.com |
| **Apply** | Subject = role · resume link · cover in body · GitHub |

**Must skills**
- Deploy/adapt agents (Hermes) in customer environments
- Tool wiring, policies, reliability, security
- Agent harness / runtime practical knowledge
- Strong eng communication with customers

**Nice**
- Full-stack product surfaces
- Open-source agent harness familiarity (Hermes)

**You have**
- Equile multi-harness + sandbox + MCP
- ALE eval rigor
- Shipping instinct

**Gaps to close**
- [ ] Skim Hermes Agent docs / try install
- [ ] 5-bullet “customer deploy playbook” from Equile experience
- [ ] NDA-safe collab language (frontier labs) if asked

**Secondary role:** Full Stack Engineer (Nous Products) — same portfolio, product angle.

---

### 4. NVIDIA — ML and Agentic Systems Engineer (Cosmos)

| Field | Detail |
|-------|--------|
| **Location** | Santa Clara |
| **Level** | L5/L6 · **12+ years** · $224K–$431K base bands |
| **Fit** | **Low for NG** — skip as primary; intel only |
| **Status** | `skip` (or stretch only with strong referral) |
| **Contact** | Neha Hudait (EECS alum, Agentic security PM) — InMail for **new-grad path**, not this JD |

**Must skills (role itself)**
- Agentic workflows over full ML lifecycle (data, eval, train orchestration)
- AI-native systems: agents on codebases, experiments, envs
- Expert Python + PyTorch in large codebases
- Eval platforms at scale
- Multimodal pipelines
- 12+ years relevant exp (hard filter risk)

**Nice**
- Agent memory / context compression
- Agent safety, AuthN/AuthZ/IAM
- Strong OSS

**You have (partial)**
- Agent + eval + tooling story (junior depth)
- Python/PyTorch exposure via research

**Gaps**
- Years / scale of ML platform ownership
- Internal NVIDIA stack / Cosmos world models

**Action**
- [ ] Ask Neha: which teams hire NG for agentic/security/infra
- [ ] Watch separate NVIDIA NG/intern pipelines (Ignite, university)

---

### 5. OpenAI — Research Engineer, Codex / Agent Post-Training Research

| Field | Detail |
|-------|--------|
| **Location** | SF on-site |
| **Pay** | ~$295–445K |
| **Fit** | **Stretch** — need referral + deep agent/RL or coding-agent signal |
| **Status** | `todo` only with connection |

**Must skills**
- Coding agents / tool-using agents (Codex track)
- Or post-training: RL, preference/data, eval for agents
- Strong research + eng hybrid
- Production-quality Python systems

**You have**
- ALE + frontier-lab collab (NDA-aware)
- Multi-harness coding-agent runtimes (Equile)

**Gaps**
- Large-scale post-training ownership
- OpenAI-bar interview (systems + ML + research taste)

---

### 6. Perplexity — MTS (AI Software Engineer, Agents)

| Field | Detail |
|-------|--------|
| **Location** | SF on-site |
| **Pay** | ~$220–405K |
| **Fit** | **High-medium** — product agents eng |
| **Status** | `todo` |

**Must skills (typical)**
- Ship agent features in product
- Retrieval, tools, orchestration
- Strong SWE + LLM app systems
- Latency, reliability, eval in product

**You have**
- Equile + ALE + full-stack product

**Gaps**
- [ ] Consumer/search-agent product sense (optional reading)
- [ ] System design for high-QPS agent backends

---

### 7. xAI — MTS, Coding Agents

| Field | Detail |
|-------|--------|
| **Location** | Palo Alto on-site |
| **Fit** | **Medium-high** if coding-agent story tight |
| **Status** | `todo` |

**Must skills**
- Coding agents, harnesses, tools, sandboxes
- Strong SWE; agent reliability
- Possibly training/eval for coding tasks

**You have**
- Equile multi-harness (Claude Code, Codex, etc.)
- ALE-style task grading mindset

**Gaps**
- [ ] Public coding-agent eval or harness blog/demo
- [ ] xAI/Grok ecosystem familiarity

---

### 8. Cognition — Software Engineer

| Field | Detail |
|-------|--------|
| **Location** | SF on-site |
| **Fit** | **Medium-high** — Devin/coding-agent company |
| **Status** | `todo` |

**Must skills**
- Elite SWE; agent products
- Long-running agents, tools, envs
- Product + systems taste

**You have**
- Runtime/sandbox + coding harness experience

**Gaps**
- [ ] Sharp coding interview prep (LC + systems)
- [ ] Story: long-horizon agent reliability

---

### 9. Scale — Frontier Agents Engineer

| Field | Detail |
|-------|--------|
| **Location** | Bay Area hybrid |
| **Fit** | **High** — agents + data/eval culture |
| **Status** | `todo` |

**Must skills**
- Frontier agent systems
- Data/eval loops, tooling
- Production eng for agent workflows

**You have**
- ALE eval; Equile; data/task pipelines

**Gaps**
- [ ] Scale product surface (if any) skim
- [ ] Enterprise data flywheel narrative

---

### 10. Google — Software Engineer III, AI Agents

| Field | Detail |
|-------|--------|
| **Location** | Sunnyvale on-site |
| **Fit** | **Medium** — L3/L4-ish title risk for NG |
| **Status** | `todo` (university / NG portal better if available) |

**Must skills**
- SWE fundamentals (DSA, systems)
- AI agents product/infra
- Google-scale eng practices

**Gaps**
- [ ] Classic Google interview loop prep
- [ ] Prefer NG role title if exists

---

### 11. Anthropic — Research Engineer, Knowledge Team

| Field | Detail |
|-------|--------|
| **Location** | SF hybrid / remote variant |
| **Fit** | **Medium** — more knowledge/RAG systems than pure agents |
| **Status** | `todo` if interest in knowledge systems |

**Must skills**
- Retrieval, knowledge pipelines, research eng
- Strong Python/ML eng
- Safety/reliability culture fit

**You have**
- Context8 hybrid search/memory (partial)
- Eval mindset

**Gaps**
- [ ] Deeper RAG/knowledge eval story if applying

---

### 12. AMD — Forward Deployed AI Engineer

| Field | Detail |
|-------|--------|
| **Location** | Santa Clara hybrid |
| **Pay** | ~$204–306K |
| **Fit** | **Medium-high** for FDE track |
| **Status** | `todo` |

**Must skills**
- Deploy AI in customer envs
- Communication + customization
- ML/AI product integration

**You have**
- Overlaps Nous FDE story; less enterprise logos

---

### 14. Unlabeled — LLM / Agentic Research (JD captured 2026-07-14)

| Field | Detail |
|-------|--------|
| **Company / title** | *TBD — paste company name when known* |
| **Source** | User-pasted qualifications (2026-07-14) |
| **Fit** | **Medium-low on paper** (degree + large-scale training); **Medium-high on agent/eval slice** |
| **Status** | `todo` — identify company; only apply if “exceptional industry researchers” path is real |
| **Level signal** | Research-heavy: PhD/MS preferred; post-training + agent systems hybrid |

#### Raw JD requirements (verbatim summary)

1. **Degree:** Ph.D. or Master's in CS, AI, Math, or related (*exceptional industry researchers welcome*).
2. **LLM training stack:** Deep understanding of **Transformer** architectures, **RLHF**, and **large-scale LLM training** from **data curation → post-training optimization**.
3. **Agentic systems (hands-on build or research):** tool-use, **ReAct / chain-of-thought**, multi-step planning, or **multi-agent** coordination.
4. **Engineering + research hygiene:** Strong **PyTorch or JAX**; clean eng practices; **reproducible experiment design**.
5. **Eval:** Experience designing rigorous **evaluation benchmarks** or **simulation environments** for AI systems.
6. **Soft / working style:** Adaptability; fast learner; strong ownership; work across **research + systems + product**.

#### Requirement → you mapping

| Requirement | Match | Evidence / gap |
|-------------|-------|----------------|
| PhD or Master's (or exceptional industry) | **Weak** | BS EECS expected Dec 2026 — must lean **industry builder + ALE co-first**, not degree |
| Transformer / RLHF / large-scale LLM training (data → post-train) | **Weak–partial** | Course-level (e.g. CS229) + research adjacent; **no owned large-scale train/RLHF loop** |
| Agentic: tool-use, ReAct/CoT, multi-step planning, multi-agent | **Strong** | Equile multi-harness + MCP/tools; ALE multi-step VM tasks; Ludus dual-agent; Starbot planning |
| PyTorch or JAX + clean eng + reproducible expts | **Medium–strong** | PyTorch (ALE/URAP/Stevens); systems eng (Equile); strengthen **JAX + exp tracking (seeds, configs, ablations)** |
| Rigorous eval benchmarks / sim envs | **Strong** | **ALE co-first** — benchmarks, auto-scoring, sandboxed task envs, RL-oriented rewards |
| Research + systems + product ownership | **Strong** | BAIR research + Equile product/runtime + Geopogo ship |

#### Must skills (checklist)

- [ ] Transformer internals (attn, scaling laws intuition, context/limits) — *interview talk track*
- [ ] RLHF / preference optimization pipeline (SFT → reward/pref model → RL or DPO-class) — *at least end-to-end toy or solid reading + one repro*
- [ ] Data curation for post-training (filters, contamination, mix) — *gap*
- [ ] Tool-use / ReAct / multi-step / multi-agent — *have; package as explicit bullets*
- [ ] PyTorch (or JAX) reproducible training/eval runs — *partial*
- [ ] Benchmark or sim env design — *have via ALE*

#### Gaps to close (if pursuing this JD family)

- [ ] One **post-training mini-project**: small model + SFT + DPO/RLHF-style step + eval table (even 1B-class or public recipe)
- [ ] 1-page **“LLM training literacy”** notes: data → SFT → preference → eval (no need to claim cluster-scale)
- [ ] Resume line: separate **Agentic systems** vs **Eval/sim** vs do **not** overclaim “large-scale LLM training”
- [ ] Cover note: lead with ALE + agents; acknowledge training depth as growing; ask if industry exception applies

#### Interview / narrative angles

- **Lead:** eval + agent environments (ALE), agent runtime (Equile) = “post-training needs good envs/rewards/evals”
- **Bridge to RLHF:** ALE reward envs / auto-scoring as **environment + verifier** side of post-training, not full trainer ownership
- **Avoid:** claiming large-scale pretrain/RLHF production ownership you don’t have

---

### 13. Others (lower priority / keep watching)

| Company | Role | Fit | Notes |
|---------|------|-----|--------|
| Roku | SWE Embedded Agentic AI | Medium | Embedded + agents; different stack |
| Bosch | AI Research Engineer Agentic AI | Medium | Research-y, industry |
| Earnin | SWE Gen AI | Medium-low | GenAI product, less pure agents |
| Vast.ai | AI Agent Researcher | Medium | More research; check level |
| Salesforce | AI Builder Emerging Talent | **High for NG** | Emerging talent = better bar |
| Stanford | AI Engineer | Medium | Academic eng role |
| Modveon | AI Agent Engineer | Low-med | 5 months old posting |
| Deloitte | Agentic AI engineer | Low | Consulting flavor |
| OPPO | AI Engineer | Medium | Mobile/AI |
| Metamorphic | RE Agentic Systems | Medium | Early startup; check team |
| A1 | Applied AI Engineer | Medium | Check company/JD depth |
| NVIDIA | High Performance AI Engineer | Medium | Different from Cosmos agentic L5 |

---

## Cross-cutting skills matrix

What to learn vs roles (● = critical, ○ = useful)

| Skill | Distyl | Cua | Nous FDE | Perplexity/xAI/Cognition | Scale | OpenAI | NVDA Cosmos |
|-------|--------|-----|----------|---------------------------|-------|--------|-------------|
| Agent eval / benchmarks | ● | ● | ○ | ○ | ● | ● | ● |
| Sandbox / runtime / harness | ● | ● | ● | ● | ○ | ● | ○ |
| Tool use / MCP / orchestration | ● | ● | ● | ● | ● | ● | ● |
| Computer-use / GUI agents | ○ | ● | ○ | ○ | ○ | ○ | ○ |
| Coding agents | ○ | ○ | ○ | ● | ○ | ● | ○ |
| RL / post-training for agents | ○ | ● | ○ | ○ | ○ | ● | ● |
| Multimodal data pipelines | ○ | ● | ○ | ○ | ● | ○ | ● |
| Python systems design | ● | ● | ● | ● | ● | ● | ● |
| PyTorch / training loops | ○ | ● | ○ | ○ | ○ | ● | ● |
| Full-stack product | ○ | ○ | ● | ● | ○ | ○ | ○ |
| Customer deploy / FDE | ● | ○ | ● | ○ | ○ | ○ | ○ |
| Agent security / auth / isolation | ○ | ○ | ● | ○ | ○ | ○ | ● |
| SWE interview (DSA/systems) | ○ | ○ | ○ | ● | ● | ● | ● |
| Research writing / papers | ● | ● | ○ | ○ | ○ | ● | ○ |

---

## Shared skill backlog (start here)

Ordered for **max ROI across applications** — not a 6-month PhD plan.

### P0 — do in next 2 weeks (portfolio + apply)

| # | Skill / artifact | Why | Done? |
|---|------------------|-----|-------|
| 1 | **Public portfolio links** (resume PDF, GitHub pin, ALE, Equile) | All cold apps need links, no attach | [ ] |
| 2 | **1-page ALE × agent eval write-up** (failure modes, scorers, sandbox) | Distyl, Scale, OpenAI, Cua | [ ] |
| 3 | **Equile / harness architecture diagram + 5 bullets** | Nous, xAI, Cognition, Perplexity | [ ] |
| 4 | **Cua minimal demo or benchmark note** | Cua intern exception case | [ ] |
| 5 | **Unified “agentic eng” pitch (30s / 2min)** | All intros | [ ] |

### P1 — next 1–2 months (depth)

| # | Skill | How to practice | Done? |
|---|-------|-----------------|-------|
| 6 | Agent **tracing / observability** (logs, trajectories, replay) | Add to Equile or ALE runner | [ ] |
| 7 | **Eval harness design** (metrics, flaky UI, partial credit) | ALE computer-use tasks | [ ] |
| 8 | **RL / reward for agents** (light) | One toy env + reward; read 1–2 papers | [ ] |
| 9 | **Customer deploy narrative** | Mock FDE case: tools, auth, policy, SLOs | [ ] |
| 10 | Coding-agent **task suite** (fix/test/repair loop) | Tiny public repo | [ ] |

### P2 — interview loops

| # | Skill | Roles | Done? |
|---|-------|-------|-------|
| 11 | LeetCode medium + systems design (agent backend) | Google, big labs, Cognition | [ ] |
| 12 | ML system design (eval platform, data flywheel) | Distyl, Scale, OpenAI, NVDA | [ ] |
| 13 | Behavioral: ownership, ambiguity, safety | All | [ ] |

### P3 — only if targeting specific tracks

| Track | Extra skills |
|-------|----------------|
| Post-training / OpenAI / unlabeled MS-PhD research JD | SFT/RLHF/DPO literacy, data curation, ablations, reproducible PyTorch/JAX runs; optional toy post-train project |
| Computer-use / Cua | GUI grounding, action spaces, trajectory datasets |
| Security / NVIDIA-style | Agent identity, sandbox escape, AuthZ for tools |
| Enterprise FDE | Stakeholder comms, workflow mapping, reliability SLAs |

---

## Application queue (batch)

Use weekly; check boxes when done.

### Week of ______

**Apply**
- [ ] Distyl — Research Engineers, Agents
- [ ] Nous — FDE (+ optional Full Stack)
- [ ] Perplexity — MTS Agents
- [ ] Scale — Frontier Agents
- [ ] Cognition — SWE
- [ ] xAI — Coding Agents
- [ ] Salesforce — AI Builder Emerging Talent
- [ ] Cua — Research Intern note (if visa OK)
- [ ] AMD — Forward Deployed AI (optional)

**Messages**
- [ ] Distyl: Sraavya Sambara
- [ ] NVIDIA: Neha Hudait (NG path only)
- [ ] Nous: recruiting@ email
- [ ] Cua: Francesco / YC message

**Build**
- [ ] P0 artifacts 1–5

---

## One-line positioning (reuse everywhere)

> Berkeley EECS · co-first author of ALE (agent eval / sandboxed tasks) · founding engineer of Equile (agent runtime & multi-harness sandboxes) · seeking full-time agentic systems / eval / deploy roles for 2026–2027.

---

## Notes / decisions

| Date | Note |
|------|------|
| 2026-07-14 | YC founder track (Fall 2026) can run in parallel with intern/FT apps; don’t mention YC on company apps unless asked |
| 2026-07-14 | Cua Research Intern: PhD bar warning on YC site — apply as exception with ALE×Cua |
| 2026-07-14 | NVIDIA Cosmos ML Agentic Systems: skip as primary (12+ yrs) |
| 2026-07-14 | Distyl: primary high-fit full-time agent research eng target |
| 2026-07-14 | Captured unlabeled research JD: PhD/MS + Transformer/RLHF/large-scale train + agents + PyTorch/JAX + eval/sim. **Strong on agents/eval; weak on degree + large-scale training.** Treat as same family as OpenAI-style research eng; only prioritize if company allows industry exceptions |

---

## Changelog

- 2026-07-14: Initial tracker from LinkedIn agentic search + Cua / Nous / NVIDIA / Distyl deep dives.
- 2026-07-14: Logged unlabeled LLM/Agentic Research JD (PhD/MS, RLHF, Transformers, agents, PyTorch/JAX, benchmarks) + skill mapping vs profile.

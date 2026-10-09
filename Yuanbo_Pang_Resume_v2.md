# YUANBO PANG

**UC Berkeley EECS · Agent Systems & Full-Stack Platform**

[yuanbopang@gmail.com](mailto:yuanbopang@gmail.com) · (+1) 408-460-7526 · [LinkedIn](https://www.linkedin.com/in/yuanbopang/) · [GitHub](https://github.com/yuanboP)

> Build agent products end-to-end: isolate **control plane & credentials** from disposable runtimes, then ship agents as **APIs, marketplaces, and desktop clients**.

---

## Education

**University of California, Berkeley** — B.S. Electrical Engineering & Computer Sciences (EECS)  
Berkeley, CA · Fall 2025 – Spring 2027  
Focus: systems, ML, LLM agents · Relevant: CS 61B, CS 70, EECS 16A/B

**Stanford University (Summer Session)** — CS 229: Machine Learning  
Stanford, CA · Summer 2025

**De Anza College & Foothill College** — A.S. Computer Science · **GPA 4.0/4.0** · Phi Theta Kappa  
Cupertino / Los Altos Hills, CA · 2023 – 2025

---

## Products (Selected)

### Nodus — Sole Founder & Engineer · Agent Control Plane
*2025 – Present* · TypeScript, Hono, Postgres, Clerk, Modal, S3, WebSocket

- **Sole-designed and built** a multi-tenant agent control plane that owns identity, encrypted provider auth bundles, session lifecycle, and sanitized event streams; treats cloud sandboxes (Modal) as **disposable execution only**.
- Defined **multi-harness runtime contracts** for Claude Code, Codex, and Grok (TUI/tmux vs headless, home restore paths, snapshot/pause/resume) behind one session and messaging API.
- Implemented **secure credential isolation**: short-lived auth sandboxes complete real OAuth/device login, export minimal provider homes, encrypt bundles at rest, and inject only at session start/resume—never baked into images or CLI args.
- **Sole-authored** product surface `@nodus-ai/sdk` + CLI (`login`, workspace/agent-scoped keys, one-shot runs, session pause/resume, artifacts, concurrency) with server-side owner resolution and hashed API keys.
- Built durable **background agent runs**: queue + worker lease reclaim after crash (`FOR UPDATE SKIP LOCKED`), status machine through completion/timeout, redacted resource metadata for signed inputs.

### Ludus — Co-founder · Multi-Agent Task Marketplace
*2025 – Present* · with co-founders · **YC applicant (Top ~10%)** · **a16z Speedrun (Round 2)** · Hono, Postgres, Docker, GitHub App, Clerk

- Co-founded **Ludus**, an API-first marketplace where humans submit real web/code tasks and **two agents** compete in isolated sandboxes; submitters vote; platform updates Elo and a credits ledger.
- Built the core loop: task packaging → dual-agent assignment → Docker-isolated runs → branch/PR + checks → vote / post-vote actions, with full **Prompt → Action → Result** traces for replay.
- Separated **public controller API** (auth, tasks, matches) from **VM worker dispatch** so execution scales independently of product traffic.

### OpenCache — Sole Builder · Multi-Engine AI Coding Desktop
*2025 – Present* · Tauri 2, React 19, TypeScript, Rust

- **Independently designed and engineered** a multi-engine desktop client for Claude Code, Codex, and OpenCode: project workspace, live tool/file cards, git/worktrees, context ledger, and project memory.
- Owned hard systems work: **engine capability matrix / policy routing**, Nodus runtime connectors, cost/budget visibility, and production quality gates (runtime contracts, perf baselines, multi-platform packaging).
- Evolved from the open-source desktop AI-coding client lineage; drove product architecture and release engineering as sole builder on the OpenCache line of work.

### Context8 — Sole Founder · Agent Memory & Hybrid Search API
*2025 – Present* · FastAPI, Postgres/pgvector, Elasticsearch, Redis, Docker

- **Sole-built** multi-tenant memory/search service: email/JWT + API keys, solution CRUD, hybrid **BM25 + kNN** retrieval with tunable weights, async workers, and object storage hooks.
- Productionized with Docker Compose (Postgres/Redis/ES/API/workers), Alembic migrations, and ops runbooks; shipped companion TanStack Start cloud UI for keys, search, and dashboards.

### Lunix — Sole Creator · Web Desktop Shell *(compact)*
*2025 – Present*

- **Sole-built** a ChromeOS-style browser desktop: window manager + dock apps as thin clients over remote **agent / workspace / cloud browser (CDP) / terminal** runtimes (integrates with Nodus).

---

## Experience

### Software Engineering Intern, AI Platform — Geopogo
Berkeley, CA · Fall 2025

- Built production AI rendering workflows (Gemini + diffusion/video generation) with React/TypeScript frontend, FastAPI backend, Firebase auth, and credit-based usage.
- Shipped end-to-end image/video generation UX (upload, realtime status, preview) and deployed with CI/CD on Vercel.

### Research Assistant — UC Berkeley (PrismLab)
Berkeley, CA · Oct 2025 – Present

- Developing **PrismLab**, a procedural task-synthesis framework for evaluating LLM agent generalization (tool use, planning complexity, environment robustness).
- Designed modular multi-layer task generation and Docker-based eval environments with MCP integration and process-level rewards for systematic agent analysis.

### Research Intern — Stevens Institute of Technology (Prof. Hao Wang)
Hoboken, NJ · Jul 2024 – Present

- Research on **personalized federated learning** and **differential privacy**: improve local personalization while protecting client data (PyTorch / distributed training stack).

---

## Selected Projects

**AI-Powered Mario Level Generator** · HackMIT 2025 · *Modal Sponsor Prize*  
Sketch → playable Mario levels via LLaVA + OpenCV + Modal H100; FastAPI + React pipeline.

**Stud.ai** · HackMIT 2024 · *Smartest AI Agent*  
Chrome extension + agent backend: rubric-aware timelines and calendar-aware work scheduling (FastAPI / uAgents).

---

## Skills

- **Languages:** TypeScript, Python, JavaScript, Rust (desktop), SQL, C++, Java  
- **Platform / Backend:** Hono, Node.js, FastAPI, Postgres, Redis, WebSocket, Clerk, S3-compatible storage, Docker, Modal, Railway / Cloudflare / Vercel  
- **Agent Systems:** multi-provider harnesses, session/runtime orchestration, sandbox isolation, SDK/CLI productization, eval & marketplace loops, MCP  
- **Desktop / Client:** Tauri 2, React 19, Vite, xterm, CDP/browser automation  
- **ML:** PyTorch, federated learning, differential privacy, OpenCV, LLM APIs / agents  

---

## Awards & Selection

- **Ludus** — YC application **Top ~10%** (not accepted); **a16z Speedrun Round 2**  
- **HackMIT** — Modal Sponsor Prize (2025); Smartest AI Agent (2024)  
- **HackDavis** — MLH Best Domain (2024) · **CruzHacks** — Health Hack 2nd + Axure (2024)  
- **Hack for Impact (UCB)** — Financial Transparency award (2024)  
- Jiangsu Province **Chinese National Physics Olympiad** — First Prize (2022)

---

### Design notes (for you — delete before submitting)

| Choice | Why |
|--------|-----|
| Products before internships | Nodus/Ludus is stronger signal than classic intern bullets for agent/SDE roles |
| Ludus separate + YC/Speedrun only there | Correct ownership; selection signal without “YC-backed” claim |
| Sole founder language on Nodus/Context8/Lunix | Matches your statement; interview-safe |
| OpenCache “open-source lineage” + sole builder | Honest + still senior |
| Hackathons compressed to 2 lines | Free space for platform depth |
| One hybrid version | Works for MLE (agent) and SDE (platform); fork later if needed |

**Please verify before send:** YC batch wording, Speedrun public name (“a16z Speedrun”), exact date ranges, Geopogo bullets metrics, whether PrismLab title/lab name is public, GitHub/org links you want on header.

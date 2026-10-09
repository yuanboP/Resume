# Email to Zihan "Zenus" Wang

**To:** zihanw@u.northwestern.edu  
**Subject:** Research Collaboration Inquiry: Budget-Aware Coding Agents and ALE

Hi Zenus,

I am Yuanbo Pang, an EECS undergraduate researcher at UC Berkeley working with Prof. Dawn Song at Berkeley RDI/BAIR. I am interested in agent evaluation and agentic RL, and I plan to apply for Fall 2027 PhD programs. I saw that the MLL Lab is looking for research collaborators and wanted to reach out because BAGEN connects closely with my current work on coding agents.

I was particularly interested in BAGEN's formulation of budget awareness as progressive interval estimation: predicting the remaining resource budget and recognizing likely failure during execution, rather than measuring cost only after a rollout finishes. In a current project, TempO/RotCodeBench, I study complementary budget failures in coding agents. TempO analyzes Terminal-Bench trajectories for wasted execution time, such as repeated slow calls, excessive waiting, and repeated failed attempts. RotCodeBench studies cases where agents produce functionally correct patches that nonetheless violate implicit performance constraints, using rule-based, black-box performance oracles to identify these failures.

This suggests a natural connection: can we extend progressive budget estimation to coding-agent trajectories and jointly study the cost of the agent's execution and the downstream cost of the code it produces? The performance oracles could also provide verifiable reward signals for training budget-aware coding agents with RL/RLVR. I would be very interested in exploring this direction with you.

At Berkeley RDI/BAIR, I am also a co-first author and core contributor to Agents' Last Exam (ALE, arXiv:2606.05405), a large-scale benchmark spanning 1K+ long-horizon, real-world agent tasks across 55 subdomains. I helped build the end-to-end evaluation system that runs agents on executable tasks, automatically scores their performance, and produces verifiable rewards for RLVR. We are currently working with frontier model teams, including OpenAI, Meta TBD Lab, Qwen, Seed, and Anthropic, on large-scale agent evaluation.

I also noticed that you spent a semester at Berkeley. I would appreciate the opportunity to connect, learn more about your current work and the MLL Lab, and discuss whether there may be a good opportunity to collaborate. I have attached my CV and would be happy to share a short overview of the coding-agent project.

Best,  
Yuanbo Pang  
UC Berkeley EECS  
Berkeley RDI/BAIR

---

## Suggested Attachment

- `Yuanbo_Pang_CV_PhD_2027.pdf`

## Core Research Connection

- **BAGEN:** Can an agent estimate its remaining execution budget and recognize likely failure from a partial rollout?
- **TempO:** Where do coding agents waste execution time during long-horizon tool use?
- **RotCodeBench:** Can a coding agent recognize and satisfy implicit performance budgets in the artifact it produces, even when functional tests pass?
- **Potential collaboration:** Use progressive budget estimation and trajectory analysis to diagnose execution- and artifact-level budget failures, with rule-based performance oracles supplying verifiable rewards for agentic RL/RLVR.

# PhD Outreach Email — Omar Khattab (MIT EECS/CSAIL, OASYS)

**Timing:** mid-September to mid-October 2026 (before admissions season). One email, one follow-up max.
**Attach:** `Yuanbo_Pang_CV_PhD_2027.pdf`

**Subject:** Prospective Fall 2027 PhD student — 1K-task agent eval environments (ALE) as an optimization testbed

Dear Professor Khattab,

I am Yuanbo Pang, an EECS undergraduate at UC Berkeley (graduating Dec 2026), working with Prof. Dawn Song at Berkeley RDI/BAIR. I am applying to the MIT EECS PhD program for Fall 2027 and will list you as faculty of interest under AI Systems. I am writing because my work sits directly on the problem your group frames as AI's last mile.

I am a co-first author of Agents' Last Exam (ALE, arXiv:2606.05405): 1K+ executable, expert-designed agent tasks across 55 subdomains, each with a programmatic evaluator that produces verifiable rewards. I led the task pipeline and auto-scoring system (load/start/evaluate contracts, sandboxed VM/container execution on GCP), and we work with frontier model teams (OpenAI, Anthropic, Qwen, Meta) on evaluation through it.

The reason I am reaching out specifically: GEPA showed that reflective prompt evolution can outperform RL when optimizing LM programs — but that result's ceiling depends on having environments with dense, verifiable feedback at scale. ALE is exactly that substrate: 1K+ tasks where the evaluator emits not just a scalar but structured failure information (which check failed, at which step). I ran [GEPA-style optimization / DSPy pipelines] on a slice of ALE tasks and found [CONCRETE RESULT — fill in before sending; do not send without this]. I would love to explore whether ALE-scale environments can serve as a standard optimization and evaluation substrate for LM programs.

Two other things that may be relevant: I am a founding engineer of an agent runtime startup (sandboxed multi-harness execution, tool/MCP interfaces, snapshot pause/resume — the systems layer under agent programs), and the ALE harness is open-source [LINK — publish + adoption numbers before sending].

I would be grateful for any chance to discuss fit with OASYS. Thank you for your time.

Best regards,
Yuanbo Pang
UC Berkeley EECS · yuanbopang@berkeley.edu
[ALE link] · [GitHub]

---

## Send checklist（发送前必须完成，缺一不发）

1. **[CONCRETE RESULT]**：真的在 ALE 的一个子集上跑 DSPy/GEPA，拿到一个具体数字或发现。这封邮件的成败就在这一句——没有结果就是普通兴趣邮件，他不缺。
2. **ALE harness 开源可见**：repo 公开、README 完整、最好有第三方使用迹象。他的录取史显示他看 adoption。
3. CV 已更新（GitHub 用户名 yuanboP、ALE 一行在最上面）。

## 并行动作（比邮件更重要）

- **Warm path**：他的 PhD 导师 Matei Zaharia 现在就在 Berkeley Sky Lab（和 Dawn Song 的 RDI 在 agent eval 上高度重叠）。请 Song 或通过 Sky Lab 合作把你介绍给 Zaharia → Khattab，一句话推荐 > 十封冷邮件。
- **DSPy 生态参与**：给 DSPy/GEPA 提一个有实质内容的 issue 或 PR（比如 ALE 集成）。注意：DSPy 贡献历史上换来的是 mentorship 不是名额，但它换来的是他认识你——申请季他读到你的材料时不再是陌生名字。
- **申请本身**：MIT EECS，12 月截止，faculty of interest 列 Khattab（AI Systems 子领域），SoP 第一段就是 ALE。

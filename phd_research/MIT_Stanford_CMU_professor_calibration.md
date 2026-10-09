# MIT / Stanford / CMU（非 UCB）Tier 1 教授对标 — 学生水位与 match 评估

Updated: August 11, 2026. Companion to `Song_Schwager_student_calibration.md`（Song/Schwager 已单独成文）。
申请时点档案（2026 年 12 月）：Berkeley EECS 本科（Dec 2026 毕业）、ALE 共一（arXiv 已挂）、Tomizuka 数据 benchmark 一作（目标 11–12 月 arXiv）、UAV CVPR 一作（在投）、VLA 实习、Equile 创始工程师。**申请时无已接收的一作论文。**

## 总评级表

| 教授 | 校/系 | 轴向 | 评级 | 一句话策略 |
|---|---|---|---|---|
| **Omar Khattab** | MIT EECS | 完全对口 | **Likely-match（全场最强）** | EECS 申请 AI-Systems 子领域列名；他 2026 年就是该子领域主席，亲自读你的池子 |
| Graham Neubig | CMU LTI | 完全对口 | Stretch（CMU 最好赔率） | Lintang/lm-eval-harness 先例 = 评测基建可当敲门砖；冷申请结构可行 |
| Daniel Fried | CMU LTI | 完全对口 | Stretch | SoP 直接引用 Odysseys ↔ ALE 互补；与 Neubig/Welleck 共同列名 |
| Akari Asai | CMU LTI | 对口 | Stretch | 确认招 Fall 2027；唯一机制 = LTI+MLD 申请表勾 Faculty of Interest |
| Diyi Yang | Stanford CS | 完全对口 | Stretch 偏上 | John Yang 同构画像；需要 ALE 有可见采用度 + Song 信写清贡献 |
| Andreea Bobu | MIT AeroAstro | 半对口 | Stretch | 流程最明确：AeroAstro 主申列名，提交后可发邮件（固定主题行） |
| Aviral Kumar | CMU MLD/CSD | 完全对口 | Stretch（靠 warm path） | 5/5 学生有关系进组；需 Levine/Finn 圈递话；SoP 用 RL 框架不用评测框架 |
| Pulkit Agrawal | MIT EECS | 偏轴 | Stretch | 数据 benchmark 需带训练结果；Eka 分身，Fall 2027 名额 0–2 个，做对冲 |
| Dorsa Sadigh | Stanford CS | 半对口 | Stretch 偏下 | 她的组全是 BAIR/AUTOLAB/RAIL 谱系；你是对的学校错的实验室 |
| Tijana Zrnic | Stanford Stats/MS&E | 对口但系偏 | 高方差 wildcard | 唯一可以直接发邮件的；风险在 Stats 委员会的数学门槛 |
| Tim Dettmers | CMU CSD | 偏轴 | Unlikely | 录的全是量化/效率方向工业界研究员；顺手勾名即可 |

## MIT 细节

### Omar Khattab（Likely-match）
- 首批实际 5 个 PhD（2025 ×3 + 2026 ×2）。双峰录取：要么一作论文重装（Takehi：4 篇一作含 WSDM Best Paper + ColBERT 生态 OSS 200 万下载；Yang：CMU MSML 出来 ICML/ICLR 共一），要么 **benchmark/OSS 工程 + 学历信号**（Alex Zhang：SWE-bench MM + KernelBench 合作者 + GRFP + Princeton 第一名——你的 ALE 共一定位比他的合作者身份更强）。
- **关键情报**：他 2025 年在 EECS 招生委员会，2026 年是 AI-Systems 子领域主席——你的申请就送到他手里。
- 补强：把 ALE 评测 harness 做成有采用度的开源工件（他明显看重 adoption 指标）；GRFP。
- 别指望贡献 DSPy 换名额——DSPy 贡献者历史上只成为 visitor/mentee，PhD 都去了别校。

### Andreea Bobu（Stretch）
- 5 个学生全外校（Yale/SNU/武大→CMU MSR/Harvard/Toronto），入学前 5–7 篇、至少一篇强一作（NeurIPS/CVPR/HRI best paper finalist/IJRR），无零论文先例。
- 目标 8–10 人规模，仍在扩张，主页明写招 Fall 2027；advising statement 明说要一半「广义 ML 人」——你算这一半。
- **流程照做**：AeroAstro Computing 主申 + EECS 副申（都是 12 月 1 日截止），列她名字；**提交后**发邮件，主题 "Prospective PhD Student"，附 CV/成绩单/短 cover letter，发之前读完她的 advising statement。
- 叙事：「从大规模人类数据学习奖励与行为」串起 ALE 可验证奖励 + EgoDex/HOI4D。

### Pulkit Agrawal（Stretch）
- 双峰：外部陌生人 = 3–6+ 篇含名组（Pinto/Levine/Gupta）一作 CoRL/RSS/NeurIPS；低论文 admit 全有结构性联系或 GRFP。Berkeley 是他的第一大生源（4–5/20）。
- Eka Robotics 分身中，PhD 端净收缩（2024–26 走了 8 人，近年每年只进 ~2）。Fall 2027 名额是真不确定。
- 补强：Tomizuka benchmark 上 arXiv 时**必须带训练结果**（不能只是数据集）；走 Berkeley 人脉（Levine/Pinto 谱系）递话。

## Stanford 细节（Yang/Sadigh/Zrnic；Song/Schwager 见另一文件）

### Diyi Yang（Stretch 偏上）
- 学生全部带已发表一作或多年工业研究入学；John Yang（Berkeley 本科→Princeton MS→带着 SWE-bench 入学）是你的同构先例，差距是「已发表且出圈」。
- 明确禁邮件，委员会制；CS 申请列名。胜负手 = ALE 的可见采用度 + Song 信。

### Dorsa Sadigh（Stretch 偏下）
- 已核实学生 8+ 个 Berkeley 本科/硕士，但全部 BAIR/AUTOLAB/RAIL 谱系、入学前 2–7 篇机器人论文。Tomizuka 组不在这条 pipeline。官网禁申请前联系。
- 只有 Tomizuka benchmark 带真机实验上 arXiv + BAIR 可见的推荐人才有戏。

### Tijana Zrnic（wildcard）
- 尚无学生，Fall 2027 是她第一、二批。无禁邮件政策——**9–10 月直接发邮件**，引用 PPI 论文，谈 ALE 1K 任务自动评分的统计效度（她在 LMArena 兼职，正在想这个问题）。
- 风险：Stanford Stats 委员会硬筛数学（实分析/概率论）；MS&E 稍宽松。选她 = 放弃 CS 申请（一年一系）。

## CMU 细节

### Graham Neubig（Stretch，CMU 最好赔率）
- 中位数 1–3 篇一作，2024–25 上升到一作 ICLR/ICML 级。**Lintang Sutawika 靠 lm-evaluation-harness（开源评测基建）入学 = 你的直接先例**。
- 冷申请可行（他明说提前联系不加分不减分；发邮件用 "[prospective-student]" 主题标签）。注意他现在是 OpenHands chief scientist，cohort 规模未知。

### Daniel Fried（Stretch）
- 每个 admit 入学前 ≥1 篇一作同行评审（下限 = workshop 一作 + 题目完全对口）。4/5 共同指导 → 与 Neubig/Welleck/Salakhutdinov 组合列名。
- **Odysseys（arXiv:2604.24964）↔ ALE 是近乎完美互补**，SoP 直接引用。9–10 月回查他的 prospective 页面。

### Akari Asai（Stretch）
- **已确认招 Fall 2027**（"expect to recruit a few PhD students in the upcoming cycle"）；不收 2026–27 访问学生。
- 首批 cohort 不可见（≠零）。推断门槛：1–2 篇一作 *ACL/NeurIPS/ICLR/COLM 或高影响开源系统。
- **勿邮件；在 LTI 和 MLD 两份申请表都勾她的 Faculty of Interest**（她警告只写 SoP 会被漏）。

### Aviral Kumar（Stretch，靠关系）
- 5 学生 0 冷申请：Levine 组 RA、Finn 组多年合作、CMU MSML 内转、C3-CMU 合作。论文门槛 2+ 篇一作/共一顶会。
- 策略：MLD+CSD+RI 三份申请都列名；SoP 把 ALE 框成「RL 的环境/奖励设计」；找 Levine/DeepMind 圈的 ALE 合作者递话——这是唯一历史有效通道。

### Tim Dettmers（Unlikely）
- 录取全是量化/效率子领域、3–8 篇顶会的工业研究员（Samsung/VinAI/Yandex），无美本。勾名即可，勿花笔墨。

## 全局行动清单（覆盖全部教授的公约数）

1. **11 月中前两篇 arXiv**：Tomizuka 数据 benchmark（一作，带训练/定量结果，不能纯数据集）+ UAV CVPR 在投版。这是所有 stretch → competitive 的公共前提。
2. **ALE harness 开源化 + 采用度指标**（GitHub stars、leaderboard、frontier lab 使用）——对 Khattab、Neubig、Yang 三个最对口目标都是直接加分项。
3. **NSF GRFP（10 月，先确认资格）+ Knight-Hennessy（10 月 6 日）**——几乎每个组的低论文 admit 都带 fellowship。
4. **三封信**：Dawn Song（LM agents 轴）+ Tomizuka（robotics 轴）+ Zakhor（vision 轴）。
5. **邮件纪律**：可发 = Zrnic（9–10 月）、Bobu（提交后、固定主题行）、Neubig（可发但不加分，加标签）；禁发 = Kumar、Asai、Yang、Sadigh、Fried（页面明说没用）、Schwager、Song（泛泛邮件）。
6. **申请组合决策**：
   - MIT EECS 一份覆盖 Khattab + Agrawal（+ Bobu 副轴）；AeroAstro 主申才能最优触达 Bobu → 需抉择，EECS 优先（Khattab 是全场唯一 likely-match）。
   - CMU：LTI + MLD (+ RI) 多投，LTI 表勾 Asai/Neubig/Fried，MLD 表勾 Kumar/Asai。
   - Stanford 一年一系：CS（Yang+Sadigh+Song 列名）vs Aero/Astro（Schwager+Bohg/Song 副轴）vs Stats/MS&E（Zrnic）。11 月看两篇论文落点再定：robotics 论文强 → Aero/Astro 池子里更突出；ALE 采用度起飞 → CS。

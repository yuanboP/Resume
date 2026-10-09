const news = [
  {
    date: "Sep 2026",
    text: (
      <>
        New preprint: <em>ScienceIDE</em> — turning scientific codebases into
        agent-learnable environments (with AItonomy Foundation).
      </>
    ),
    isNew: true,
  },
  {
    date: "Sep 2026",
    text: (
      <>
        Building a large-scale robot-learning data benchmark with egocentric
        human manipulation data (with Zhuo Xu and Prof. Masayoshi Tomizuka).
      </>
    ),
  },
  {
    date: "Jun 2026",
    text: (
      <>
        <em>Agents&apos; Last Exam</em> is on arXiv, with an open evaluation
        framework for long-horizon, real-world agent tasks.
      </>
    ),
  },
  {
    date: "Apr 2026",
    text: <>Founded Equile — sandboxed runtimes for AI agents.</>,
  },
  {
    date: "Jan 2026",
    text: (
      <>
        Our robot delivery system integrating VLA and agentic workflows was
        demonstrated at CES 2026.
      </>
    ),
  },
];

const projects = [
  {
    tag: "Robot Data",
    title: "Robot-Learning Data Benchmark",
    text: (
      <>
        With Zhuo Xu and Prof. Masayoshi Tomizuka: a large-scale benchmark for
        robot learning. I clean and curate heterogeneous egocentric
        manipulation and human-object interaction data (EgoVerse, EgoDex,
        HOI4D) so that diverse human demonstrations become reliable training
        and evaluation resources for embodied systems.
      </>
    ),
    status: "Ongoing",
  },
  {
    tag: "UAV · Vision",
    title: "UAV-to-UAV Detection & Tracking",
    text: (
      <>
        With Prof. Avideh Zakhor: zero-shot UAV-to-UAV detection and
        multi-object tracking under high-speed motion and strong ego-motion,
        integrating optical-flow-based tracking with detection baselines.
      </>
    ),
    links: [{ label: "Code", href: "https://github.com/yuanboP/URAP2026" }],
    status: "Targeting CVPR",
  },
  {
    tag: "Agent Infra",
    title: "Equile",
    text: (
      <>
        Sandboxed agent runtimes: one session API across agent frameworks
        (Claude Code, Codex, Cursor), tool/MCP I/O, snapshot pause/resume, and
        scheduling — so agents can be deployed like model inference.
      </>
    ),
    links: [{ label: "equile.tech", href: "https://equile.tech" }],
  },
];

const experience = [
  {
    date: "Oct 2025 - Present",
    title: "Berkeley RDI / BAIR",
    detail: "Research Assistant · Prof. Dawn Song · agent evaluation & RLVR",
  },
  {
    date: "2026 - Present",
    title: "Robot-Learning Data Benchmark",
    detail: "Robotics research · Zhuo Xu and Prof. Masayoshi Tomizuka",
  },
  {
    date: "Jan 2026 - Present",
    title: "UC Berkeley EECS URAP",
    detail: "Research Assistant · Prof. Avideh Zakhor · UAV perception",
  },
  {
    date: "Apr 2026 - Present",
    title: "Equile",
    detail: "Founder · sandboxed agent runtimes and infrastructure",
  },
  {
    date: "Nov 2025 - Mar 2026",
    title: "Starbot",
    detail: "Robotics AI Engineering Intern · VLA and robot delivery",
  },
];

function ExternalLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noreferrer">
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <>
      <header className="site-header">
        <a className="wordmark" href="#top">
          Yuanbo Pang
        </a>
        <nav aria-label="Primary navigation">
          <a href="#news">News</a>
          <a href="#publications">Publications</a>
          <a href="#research">Research</a>
          <a href="#experience">Experience</a>
          <a className="nav-cv" href="/Yuanbo_Pang_CV.pdf">
            CV
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="intro">
          <div className="portrait">
            <div className="photo" aria-hidden="true">
              YP
            </div>
            <a className="email" href="mailto:yuanbopang@berkeley.edu">
              yuanbopang@berkeley.edu
            </a>
            <div className="icon-links">
              <ExternalLink href="https://github.com/yuanboP">
                GitHub
              </ExternalLink>
              <ExternalLink href="https://www.linkedin.com/in/yuanbopang/">
                LinkedIn
              </ExternalLink>
              <a href="/Yuanbo_Pang_CV.pdf">CV</a>
            </div>
          </div>

          <div className="intro-copy">
            <p className="hello">
              Hi there 👋 I am an EECS undergraduate at{" "}
              <strong>UC Berkeley</strong>. I study <strong>AI agents</strong>,{" "}
              <strong>agent evaluation</strong>, and{" "}
              <strong>robot learning</strong>.
            </p>
            <p>
              I work with <strong>Prof. Dawn Song</strong> at Berkeley
              RDI/BAIR, where I am a co-first author of{" "}
              <em>Agents&apos; Last Exam</em> (ALE). I also work with{" "}
              <strong>Zhuo Xu</strong> and{" "}
              <strong>Prof. Masayoshi Tomizuka</strong> on robot-learning data,
              and with <strong>Prof. Avideh Zakhor</strong> on UAV perception.
              Outside research, I build infrastructure for running AI agents as
              the founder of{" "}
              <ExternalLink href="https://equile.tech">Equile</ExternalLink>.
            </p>

            <p className="interests-title">My current research interests:</p>
            <ul className="interests">
              <li>
                Can we <strong>reliably evaluate long-horizon agents</strong>?
                How do we build task environments and automated evaluators
                whose <strong>verifiable rewards</strong> are strong enough to
                both measure frontier agents and train them (RLVR)?
              </li>
              <li>
                What <strong>data</strong> do robots actually need to learn
                from humans? Can heterogeneous{" "}
                <strong>egocentric human demonstrations</strong> become as
                useful to robot learning as web text is to language models?
              </li>
              <li>
                What does it take to run agents as{" "}
                <strong>real infrastructure</strong> — sandboxed, reproducible,
                schedulable — and how does that change how we study them?
              </li>
            </ul>

            <div className="callout">
              If you are interested in these directions and would like to
              collaborate — on research, benchmarks, or agent infrastructure —
              please <a href="mailto:yuanbopang@berkeley.edu">reach out</a>.
            </div>
          </div>
        </section>

        <section className="section band" id="news">
          <div className="section-inner">
            <div className="section-heading">
              <h2>News</h2>
            </div>
            <div className="news-list">
              {news.map((item, i) => (
                <div className="news-item" key={i}>
                  <time>{item.date}</time>
                  <p>
                    {item.text}
                    {item.isNew && <span className="badge-new">new</span>}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="publications">
          <div className="section-inner">
            <div className="section-heading">
              <h2>Publications</h2>
            </div>
            <p className="pub-year">2026</p>
            <div className="pub">
              <div className="pub-badges">
                <span className="venue-badge">Manuscript</span>
                <span className="venue-badge">HF #1 of the Week</span>
              </div>
              <div>
                <h3>Agents&apos; Last Exam</h3>
                <p className="authors">
                  Yiyou Sun*, Xinyang Han*, Weichen Zhang*,{" "}
                  <span className="me">Yuanbo Pang</span>*, Tianyu Wang*, et
                  al. &nbsp;·&nbsp; *equal contribution
                </p>
                <div className="pub-links">
                  <ExternalLink href="https://arxiv.org/abs/2606.05405">
                    PDF / arXiv
                  </ExternalLink>
                  <ExternalLink href="https://agents-last-exam.org">
                    Project
                  </ExternalLink>
                  <ExternalLink href="https://github.com/rdi-berkeley/agents-last-exam">
                    Code
                  </ExternalLink>
                  <span className="arxiv-id">arXiv:2606.05405</span>
                </div>
              </div>
            </div>
            <div className="pub">
              <div className="pub-badges">
                <span className="venue-badge">Preprint</span>
                <span className="venue-badge">HF #2 of the Day</span>
              </div>
              <div>
                <h3>
                  ScienceIDE: Turning World&apos;s Scientific Codebase into
                  Agent Learnable Environments
                </h3>
                <p className="authors">
                  Hejia Geng*, Zesen Huang*, Haoyang Li, Wenbin Li, Koutian
                  Wu, Zihan Zhou, <span className="me">Yuanbo Pang</span>, et
                  al., Ling Yang &nbsp;·&nbsp; *equal contribution
                </p>
                <div className="pub-links">
                  <ExternalLink href="https://arxiv.org/abs/2609.19134">
                    PDF / arXiv
                  </ExternalLink>
                  <span className="arxiv-id">arXiv:2609.19134</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section band" id="research">
          <div className="section-inner">
            <div className="section-heading">
              <h2>Research Projects</h2>
            </div>
            {projects.map((p) => (
              <div className="proj" key={p.title}>
                <span className="proj-tag">{p.tag}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <div className="proj-links">
                    {p.links?.map((l) => (
                      <ExternalLink href={l.href} key={l.href}>
                        {l.label}
                      </ExternalLink>
                    ))}
                    {p.status && <span className="status">{p.status}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="section" id="experience">
          <div className="section-inner">
            <div className="section-heading">
              <h2>Experience</h2>
            </div>
            <div className="experience-list">
              {experience.map((item) => (
                <div className="experience-item" key={item.title}>
                  <span className="date">{item.date}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-inner">
          <span className="quote">
            &ldquo;Deploy minds like websites.&rdquo;
          </span>
          <span>© 2026 Yuanbo Pang · Last updated October 2026</span>
        </div>
      </footer>
    </>
  );
}

import Nav from "@/components/Nav";
import Slides from "@/components/Slides";
import { Donut, GroupedBars, RangeCompare, Timeline } from "@/components/Charts";
import { CountUp, Reveal, RotatingWord } from "@/components/motion";
import { ArrowIcon, GitHubIcon, LinkedInIcon, MailIcon, PinIcon } from "@/components/icons";
import {
  achievements,
  education,
  experience,
  highlights,
  journey,
  loraParams,
  moodmuseAccuracy,
  profile,
  projects,
  skills,
} from "@/data/profile";

const PALETTE = ["#8b7fff", "#ff5fa2", "#ffb547", "#34d3b5", "#4cc9f0", "#c084fc", "#fb7185"];

function SectionHeading({ n, kicker, title, color, children }: { n: string; kicker: string; title: string; color: string; children?: React.ReactNode }) {
  return (
    <Reveal className="mb-12">
      <p className="mb-3 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.25em]" style={{ color }}>
        <span className="h-px w-8" style={{ background: color }} />
        {n} · {kicker}
      </p>
      <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</h2>
      {children && <p className="mt-4 max-w-2xl text-muted">{children}</p>}
    </Reveal>
  );
}

function Chip({ children, color }: { children: React.ReactNode; color?: string }) {
  return (
    <span
      className="rounded-full border px-3 py-1 text-xs"
      style={
        color
          ? { borderColor: `${color}55`, background: `${color}14`, color: "#f1f0ff" }
          : { borderColor: "var(--color-line)", background: "rgb(255 255 255 / 0.03)", color: "var(--color-muted)" }
      }
    >
      {children}
    </span>
  );
}

const ABOUT = [
  {
    t: "Clinical AI",
    d: "Wearable ECG pipelines, beat classification and arrhythmia screening, evaluated with per-class error analysis.",
    color: "#ff5fa2",
    icon: "M3 12h4l2-5 4 10 2-5h6",
  },
  {
    t: "Efficient models",
    d: "Knowledge distillation, LoRA fine-tuning and benchmarking for latency, throughput and memory on edge hardware.",
    color: "#34d3b5",
    icon: "M13 2L4 14h7l-1 8 9-12h-7l1-8z",
  },
  {
    t: "Speech & language",
    d: "Multilingual translation and Indian-language TTS: dataset pipelines, alignment and acoustic features.",
    color: "#ffb547",
    icon: "M12 3v18M8 7v10M4 10v4M16 7v10M20 10v4",
  },
];

export default function Home() {
  const [first, last] = profile.name.split(" ");
  const allSkills = skills.flatMap((s) => s.items);
  const half = Math.ceil(allSkills.length / 2);

  return (
    <>
      <Nav />
      <main id="top" className="relative overflow-hidden">
        {/* ================= Hero ================= */}
        <section className="grain relative min-h-[100svh]">
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="blob blob-1 left-[-10%] top-[-10%] h-[34rem] w-[34rem] bg-[#8b7fff]" />
            <div className="blob blob-2 right-[-12%] top-[5%] h-[30rem] w-[30rem] bg-[#ff5fa2]" />
            <div className="blob blob-3 bottom-[-15%] left-[25%] h-[28rem] w-[28rem] bg-[#34d3b5] opacity-35" />
            <div className="blob blob-1 bottom-[10%] right-[10%] h-[18rem] w-[18rem] bg-[#ffb547] opacity-30" />
            <div className="dot-grid absolute inset-0" />
          </div>

          <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-32 sm:px-8 lg:grid-cols-[1.3fr_1fr] lg:pt-40">
            <div>
              <Reveal>
                <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-teal/40 bg-teal/10 px-4 py-1.5 text-xs font-medium text-teal backdrop-blur">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal opacity-60" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-teal" />
                  </span>
                  {profile.availability}
                </p>
              </Reveal>
              <Reveal delay={80}>
                <h1 className="font-display text-6xl font-extrabold leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
                  {first}
                  <br />
                  <span className="rainbow-text">{last}</span>
                </h1>
              </Reveal>
              <Reveal delay={160}>
                <p className="mt-7 font-display text-2xl text-white sm:text-3xl">
                  {profile.role} for{" "}
                  <RotatingWord words={profile.focus} colors={["#ff5fa2", "#34d3b5", "#ffb547"]} />
                </p>
              </Reveal>
              <Reveal delay={240}>
                <p className="mt-6 max-w-xl leading-relaxed text-muted">{profile.summary}</p>
                <p className="mt-4 flex items-center gap-2 text-sm text-muted">
                  <PinIcon className="h-4 w-4 text-pink" /> {profile.location}
                </p>
              </Reveal>
              <Reveal delay={320}>
                <div className="mt-9 flex flex-wrap gap-3">
                  <a
                    href="#projects"
                    className="group inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-accent via-pink to-amber px-6 py-3.5 text-sm font-semibold text-white shadow-[0_12px_40px_-10px_#ff5fa2] transition-transform hover:-translate-y-0.5"
                  >
                    See my projects <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                  <a
                    href={`mailto:${profile.email}`}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white backdrop-blur transition-colors hover:border-pink"
                  >
                    <MailIcon className="h-4 w-4" /> Email me
                  </a>
                  {[
                    { href: profile.github, label: "GitHub", Icon: GitHubIcon, c: "hover:border-accent" },
                    { href: profile.linkedin, label: "LinkedIn", Icon: LinkedInIcon, c: "hover:border-sky" },
                  ].map(({ href, label, Icon, c }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className={`grid h-12 w-12 place-items-center rounded-2xl border border-white/15 bg-white/5 text-white/80 backdrop-blur transition-colors hover:text-white ${c}`}
                    >
                      <Icon />
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Stats card with a spinning rainbow border */}
            <Reveal delay={200} className="lg:justify-self-end">
              <div className="float rainbow-border w-full max-w-sm">
                <div className="rounded-[calc(1.75rem-1px)] bg-panel/95 p-7 backdrop-blur-xl">
                  <div className="mb-6 flex items-center gap-1.5" aria-hidden="true">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                    <span className="ml-3 font-mono text-xs text-muted">highlights.py</span>
                  </div>
                  <ul className="space-y-6">
                    {highlights.map((h, i) => (
                      <li key={h.label}>
                        <p className="font-display text-4xl font-bold" style={{ color: PALETTE[[3, 1, 2][i]] }}>
                          <CountUp value={h.value} />
                        </p>
                        <p className="mt-1 text-sm leading-snug text-muted">{h.label}</p>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-7 border-t border-line pt-5 font-mono text-xs text-muted">
                    <span className="text-pink">currently</span> = <span className="text-teal">&quot;clinical AI @ IIIT Hyderabad&quot;</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <a href="#about" aria-label="Scroll to About" className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 sm:block">
            <span className="flex h-10 w-6 justify-center rounded-full border border-white/25 pt-2">
              <span className="h-2 w-1 animate-bounce rounded-full bg-white/70" />
            </span>
          </a>
        </section>

        {/* ================= Skills ribbon ================= */}
        <div className="marquee relative -rotate-1 border-y border-white/10 bg-gradient-to-r from-accent/15 via-pink/15 to-amber/15 py-4" aria-hidden="true">
          {[allSkills.slice(0, half), allSkills.slice(half)].map((row, r) => (
            <div key={r} className={`marquee-track ${r ? "reverse mt-3" : ""}`}>
              {[...row, ...row].map((s, i) => (
                <span key={`${s}-${i}`} className="mx-2 inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-white/5 px-4 py-1.5 text-sm text-white/85">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: PALETTE[i % PALETTE.length] }} />
                  {s}
                </span>
              ))}
            </div>
          ))}
        </div>

        <div className="mx-auto max-w-6xl space-y-36 px-5 py-32 sm:px-8">
          {/* ================= About ================= */}
          <section id="about">
            <SectionHeading n="01" kicker="About" title="Research models that run on real devices" color="#34d3b5" />
            <div className="grid gap-6 md:grid-cols-3">
              {ABOUT.map((c, i) => (
                <Reveal key={c.t} delay={i * 120}>
                  <div className="card card-hover h-full overflow-hidden p-7" style={{ "--glow": c.color } as React.CSSProperties}>
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl" style={{ background: `${c.color}33` }} aria-hidden="true" />
                    <span className="relative mb-5 grid h-12 w-12 place-items-center rounded-2xl" style={{ background: `${c.color}22`, color: c.color }}>
                      <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d={c.icon} />
                      </svg>
                    </span>
                    <h3 className="relative mb-2 font-display text-xl font-semibold text-white">{c.t}</h3>
                    <p className="relative text-sm leading-relaxed text-muted">{c.d}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ================= Experience ================= */}
          <section id="experience">
            <SectionHeading n="02" kicker="Experience" title="My journey so far" color="#ffb547" />
            <Reveal>
              <div className="card mb-10 p-6 sm:p-8">
                <Timeline items={journey} from={2021} to={2027} />
              </div>
            </Reveal>
            <div className="grid gap-6 lg:grid-cols-2">
              {experience.map((e, i) => {
                const color = ["#ff5fa2", "#ffb547"][i % 2];
                return (
                  <Reveal key={e.role} delay={i * 120}>
                    <article className="card card-hover h-full overflow-hidden p-7" style={{ "--glow": color } as React.CSSProperties}>
                      <div className="absolute inset-x-0 top-0 h-1" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} aria-hidden="true" />
                      <span className="mb-4 inline-block rounded-full px-3 py-1 font-mono text-xs" style={{ background: `${color}1f`, color }}>
                        {e.period}
                      </span>
                      <h3 className="font-display text-xl font-semibold text-white">{e.role}</h3>
                      <p className="mt-1 text-sm text-muted">
                        {e.org} · {e.place}
                      </p>
                      <ul className="mt-5 space-y-2.5">
                        {e.points.map((p) => (
                          <li key={p} className="flex gap-3 text-sm leading-relaxed text-white/80">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: color }} aria-hidden="true" />
                            {p}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {e.tags.map((t) => (
                          <Chip key={t} color={color}>
                            {t}
                          </Chip>
                        ))}
                      </div>
                    </article>
                  </Reveal>
                );
              })}
            </div>
          </section>

          {/* ================= Projects ================= */}
          <section id="projects">
            <SectionHeading n="03" kicker="Projects" title="Open-source projects" color="#8b7fff">
              Both are open for contributions. Built in November 2026 with AI-assisted development; tested, documented and
              evaluated, with known limitations listed in each README.
            </SectionHeading>
            <div className="space-y-12">
              {projects.map((p, i) => (
                <Reveal key={p.name}>
                  <article
                    className="card card-hover grid overflow-hidden lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]"
                    style={{ "--glow": p.color } as React.CSSProperties}
                  >
                    <div className={`relative min-w-0 border-b border-line bg-panel lg:border-b-0 ${i % 2 ? "lg:order-2 lg:border-l" : "lg:border-r"}`}>
                      <Slides slides={p.slides} color={p.color} priority={i === 0} />
                    </div>
                    <div className="relative flex flex-col p-7 sm:p-9">
                      <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl" style={{ background: `${p.color}26` }} aria-hidden="true" />
                      <div className="relative mb-4 flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-teal/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-teal">Open source</span>
                        <span className="rounded-full bg-amber/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber">Contributions welcome</span>
                        {p.demo && (
                          <span className="inline-flex items-center gap-1.5 rounded-full bg-pink/15 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-pink">
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-pink" /> Live
                          </span>
                        )}
                      </div>
                      <h3 className="relative font-display text-3xl font-bold text-white">{p.name}</h3>
                      <p className="relative mt-1 font-medium" style={{ color: p.color }}>
                        {p.tagline}
                      </p>
                      <p className="relative mt-4 text-sm leading-relaxed text-muted">{p.description}</p>
                      <ul className="relative mt-5 space-y-2">
                        {p.points.map((pt) => (
                          <li key={pt} className="flex gap-3 text-sm text-white/80">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.color }} aria-hidden="true" />
                            {pt}
                          </li>
                        ))}
                      </ul>
                      <div className="relative mt-6 flex flex-wrap gap-2">
                        {p.stack.map((s) => (
                          <Chip key={s} color={p.color}>
                            {s}
                          </Chip>
                        ))}
                      </div>
                      <div className="relative mt-auto flex flex-wrap gap-3 pt-8">
                        {p.demo && (
                          <a
                            href={p.demo}
                            target="_blank"
                            rel="noreferrer"
                            className="group inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                            style={{ background: `linear-gradient(90deg, ${p.color}, #ffb547)`, boxShadow: `0 10px 30px -10px ${p.color}` }}
                          >
                            Live demo <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </a>
                        )}
                        <a
                          href={p.repo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:border-white/40"
                        >
                          <GitHubIcon className="h-4 w-4" /> View code
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </section>

          {/* ================= Numbers ================= */}
          <section id="numbers">
            <SectionHeading n="04" kicker="By the numbers" title="Measured, not guessed" color="#ff5fa2">
              Real results from my research and projects. Small samples are labelled as such.
            </SectionHeading>
            <div className="grid gap-6 lg:grid-cols-2">
              <Reveal>
                <div className="card card-hover h-full p-7" style={{ "--glow": "#ff5fa2" } as React.CSSProperties}>
                  <h3 className="font-display text-xl font-semibold text-white">MoodMuse sentiment accuracy</h3>
                  <p className="mb-6 mt-1 text-sm text-muted">Agreement with star ratings on the 70-review sample (a sanity check, not a benchmark).</p>
                  <GroupedBars rows={moodmuseAccuracy.rows} series={moodmuseAccuracy.series} />
                </div>
              </Reveal>
              <div className="grid gap-6">
                <Reveal delay={120}>
                  <div className="card card-hover p-7" style={{ "--glow": "#34d3b5" } as React.CSSProperties}>
                    <h3 className="font-display text-xl font-semibold text-white">LoRA on IndicTrans2</h3>
                    <p className="mb-6 mt-1 text-sm text-muted">
                      Share of model weights trained: <span className="font-semibold text-teal">~85–90% fewer</span> with LoRA.
                    </p>
                    <RangeCompare fullLabel="Full fine-tuning" loraLabel="LoRA adapters" low={loraParams.low} high={loraParams.high} />
                  </div>
                </Reveal>
                <Reveal delay={200}>
                  <div className="card card-hover grid grid-cols-3 gap-4 p-7 text-center" style={{ "--glow": "#ffb547" } as React.CSSProperties}>
                    {[
                      { v: "42", l: "automated tests across both projects", c: "#ffb547" },
                      { v: "2", l: "open-source projects, both live", c: "#8b7fff" },
                      { v: "150+", l: "NASA Space Apps participants mentored", c: "#4cc9f0" },
                    ].map((s) => (
                      <div key={s.l}>
                        <p className="font-display text-3xl font-bold sm:text-4xl" style={{ color: s.c }}>
                          <CountUp value={s.v} />
                        </p>
                        <p className="mt-1 text-xs leading-snug text-muted">{s.l}</p>
                      </div>
                    ))}
                  </div>
                </Reveal>
              </div>
            </div>
          </section>

          {/* ================= Skills ================= */}
          <section id="skills">
            <SectionHeading n="05" kicker="Skills" title="Tools I work with" color="#4cc9f0" />
            <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">
              <Reveal>
                <div className="card h-full p-7">
                  <h3 className="mb-6 font-mono text-xs uppercase tracking-[0.15em] text-sky">Skills by area</h3>
                  <Donut
                    centerLabel="tools & methods"
                    parts={skills.map((s, i) => ({ label: s.group, value: s.items.length, color: PALETTE[i % PALETTE.length] }))}
                  />
                </div>
              </Reveal>
              <div className="grid gap-5 sm:grid-cols-2">
                {skills.map((s, i) => {
                  const color = PALETTE[i % PALETTE.length];
                  return (
                    <Reveal key={s.group} delay={(i % 4) * 80}>
                      <div className="card card-hover h-full p-5" style={{ "--glow": color } as React.CSSProperties}>
                        <h3 className="mb-3 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em]" style={{ color }}>
                          <span className="h-2 w-2 rounded-full" style={{ background: color }} />
                          {s.group}
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {s.items.map((it) => (
                            <span key={it} className="rounded-lg px-2.5 py-1 text-[13px] text-white/90" style={{ background: `${color}1a` }}>
                              {it}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Reveal>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.5fr]">
              <Reveal>
                <div className="card card-hover h-full p-7" style={{ "--glow": "#4cc9f0" } as React.CSSProperties}>
                  <h3 className="mb-4 font-mono text-xs uppercase tracking-[0.15em] text-sky">Education</h3>
                  <p className="font-display text-lg font-semibold text-white">{education.degree}</p>
                  <p className="mt-1 text-sm text-muted">{education.school}</p>
                  <p className="mt-3 text-sm text-white/85">{education.detail}</p>
                  <p className="mt-1 font-mono text-xs text-muted">{education.period}</p>
                </div>
              </Reveal>
              <Reveal delay={120}>
                <div className="card h-full p-7">
                  <h3 className="mb-5 font-mono text-xs uppercase tracking-[0.15em] text-amber">Achievements & activities</h3>
                  <ul className="grid gap-5 sm:grid-cols-2">
                    {achievements.map((a, i) => (
                      <li key={a.title} className="border-l-2 pl-4" style={{ borderColor: PALETTE[(i + 1) % PALETTE.length] }}>
                        <p className="font-medium text-white">{a.title}</p>
                        <p className="mt-1 text-sm text-muted">{a.text}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </section>

          {/* ================= Contact ================= */}
          <section id="contact">
            <Reveal>
              <div className="rainbow-border">
                <div className="grain relative overflow-hidden rounded-[calc(1.75rem-1px)] bg-panel px-7 py-16 text-center sm:px-14">
                  <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                    <div className="blob blob-2 -left-20 -top-20 h-72 w-72 bg-[#8b7fff] opacity-40" />
                    <div className="blob blob-3 -bottom-24 -right-10 h-72 w-72 bg-[#ff5fa2] opacity-40" />
                  </div>
                  <div className="relative">
                    <p className="mb-3 font-mono text-xs uppercase tracking-[0.25em] text-amber">06 · Contact</p>
                    <h2 className="font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
                      Let&apos;s build something <span className="rainbow-text">reliable</span>
                    </h2>
                    <p className="mx-auto mt-5 max-w-xl text-muted">
                      I&apos;m available for freelance and contract work in ML, NLP, data pipelines and Python backends, and I&apos;m
                      happy to talk about research collaborations too.
                    </p>
                    <div className="mt-9 flex flex-wrap justify-center gap-3">
                      <a
                        href={`mailto:${profile.email}`}
                        className="inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:-translate-y-0.5"
                      >
                        <MailIcon className="h-4 w-4" /> {profile.email}
                      </a>
                      <a
                        href={profile.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white hover:border-sky"
                      >
                        <LinkedInIcon className="h-4 w-4" /> LinkedIn
                      </a>
                      <a
                        href={profile.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-medium text-white hover:border-accent"
                      >
                        <GitHubIcon className="h-4 w-4" /> GitHub
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </section>
        </div>

        <footer className="border-t border-line">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 text-sm text-muted sm:flex-row sm:px-8">
            <p>
              © {new Date().getFullYear()} {profile.name}
            </p>
            <p>
              Built with Next.js & Tailwind CSS · <span className="rainbow-text font-medium">made with care</span>
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}

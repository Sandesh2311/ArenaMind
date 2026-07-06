import { ArrowRight, Building2, Cpu, ShieldCheck } from 'lucide-react';
import { APP_NAME, TAGLINE } from '../constants/app.js';
import { architectureLayers, features, stats, testimonials } from '../data/stadiumData.js';
import { MetricCard } from './ui/MetricCard.jsx';
import { Section } from './ui/Section.jsx';

export function LandingPage() {
  return (
    <main>
      <section className="grid-field min-h-[88vh] px-4 pb-12 pt-8 sm:px-6 lg:px-8">
        <nav className="mx-auto flex max-w-7xl items-center justify-between py-4" aria-label="Primary">
          <a href="#home" className="flex items-center gap-3 text-white">
            <span className="grid h-11 w-11 place-items-center rounded-lg bg-arena-cyan text-slate-950">
              <Building2 size={24} aria-hidden="true" />
            </span>
            <span>
              <strong className="block text-lg">{APP_NAME}</strong>
              <span className="text-xs text-slate-400">PromptWars Virtual 2026</span>
            </span>
          </a>
          <div className="hidden items-center gap-6 text-sm text-slate-300 md:flex">
            <a href="#features" className="hover:text-white">
              Features
            </a>
            <a href="#architecture" className="hover:text-white">
              Architecture
            </a>
            <a href="#dashboards" className="hover:text-white">
              Dashboards
            </a>
          </div>
        </nav>

        <div id="home" className="mx-auto grid max-w-7xl items-center gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="mb-4 inline-flex rounded-md border border-arena-cyan/40 bg-arena-cyan/10 px-3 py-2 text-sm font-semibold text-arena-cyan">
              FIFA-scale smart stadium command intelligence
            </p>
            <h1 className="max-w-5xl text-5xl font-black text-white md:text-7xl">{APP_NAME}</h1>
            <p className="mt-5 max-w-2xl text-xl leading-8 text-slate-200">{TAGLINE}</p>
            <p className="mt-4 max-w-2xl text-slate-400">
              A production-grade GenAI venue operations platform for crowd flow, indoor navigation, real-time decision
              support, multilingual fan help, and volunteer coordination.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#dashboards"
                className="inline-flex min-h-12 items-center gap-2 rounded-md bg-arena-cyan px-5 font-semibold text-slate-950 transition hover:bg-cyan-300"
              >
                Launch dashboards <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a
                href="#architecture"
                className="inline-flex min-h-12 items-center rounded-md border border-white/15 px-5 font-semibold text-white transition hover:bg-white/10"
              >
                View architecture
              </a>
            </div>
          </div>

          <div className="glass animate-float rounded-lg p-5">
            <div className="rounded-lg border border-white/10 bg-slate-950/60 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-400">Command Center</p>
                  <h2 className="text-2xl font-bold text-white">Live Operations</h2>
                </div>
                <span className="rounded-md bg-arena-mint/15 px-3 py-2 text-sm font-semibold text-arena-mint">Online</span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {stats.map((item) => (
                  <MetricCard key={item.label} {...item} />
                ))}
              </div>
              <div className="mt-5 rounded-lg border border-white/10 bg-arena-navy p-4">
                <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-arena-gold">
                  <ShieldCheck size={16} aria-hidden="true" /> AI recommendation
                </p>
                <p className="text-sm leading-6 text-slate-200">
                  Gate D has elevated density. Open overflow lane D2, redeploy two volunteers from South Market, and route
                  families through Gate C for the next 18 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Section id="features" eyebrow="Main modules" title="Built for fans, organizers, volunteers, and on-ground staff.">
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <article key={feature.title} className="glass rounded-lg p-5 transition duration-300 hover:-translate-y-1">
              <feature.icon className="text-arena-cyan" size={28} aria-hidden="true" />
              <h3 className="mt-5 text-lg font-bold text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-300">{feature.description}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section id="architecture" eyebrow="Enterprise architecture" title="Hybrid AI design with operational guardrails.">
        <div className="mt-10 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="glass rounded-lg p-6">
            <Cpu className="text-arena-gold" size={32} aria-hidden="true" />
            <h3 className="mt-4 text-2xl font-bold text-white">Offline-first GenAI routing</h3>
            <p className="mt-3 leading-7 text-slate-300">
              Common venue FAQs are answered locally, complex decisions are sent to Gemini when configured, and all failures
              return safe venue-aware responses without exposing secrets.
            </p>
          </div>
          <ol className="space-y-3">
            {architectureLayers.map((layer, index) => (
              <li key={layer} className="glass flex items-center gap-4 rounded-lg p-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-white/10 font-bold text-arena-cyan">
                  {index + 1}
                </span>
                <span className="text-slate-200">{layer}</span>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section eyebrow="Proof points" title="Operationally credible from the first screen.">
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {testimonials.map((item) => (
            <figure key={item.name} className="glass rounded-lg p-5">
              <blockquote className="leading-7 text-slate-200">"{item.quote}"</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-arena-cyan">{item.name}</figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </main>
  );
}

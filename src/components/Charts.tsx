"use client";

// Small SVG charts that animate in when they scroll into view. Every number comes from src/data/profile.ts.
import { useInView } from "./motion";

const EASE = "cubic-bezier(0.2, 0.7, 0.2, 1)";

/* ---------- Horizontal bars with two series (MoodMuse accuracy) ---------- */

export function GroupedBars({
  rows,
  series,
  max = 100,
  unit = "%",
}: {
  rows: { label: string; values: number[] }[];
  series: { name: string; color: string }[];
  max?: number;
  unit?: string;
}) {
  const [ref, on] = useInView<HTMLDivElement>(0.3);
  return (
    <div ref={ref}>
      <div className="mb-5 flex flex-wrap gap-4 text-xs text-muted">
        {series.map((s) => (
          <span key={s.name} className="inline-flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} /> {s.name}
          </span>
        ))}
      </div>
      <ul className="space-y-5">
        {rows.map((r, ri) => (
          <li key={r.label}>
            <p className="mb-2 text-sm text-white/85">{r.label}</p>
            <div className="space-y-1.5">
              {r.values.map((v, si) => (
                <div key={series[si].name} className="flex items-center gap-3">
                  <div className="h-3 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: on ? `${(v / max) * 100}%` : "0%",
                        background: `linear-gradient(90deg, ${series[si].color}99, ${series[si].color})`,
                        boxShadow: `0 0 18px ${series[si].color}55`,
                        transition: `width 1.2s ${EASE} ${ri * 180 + si * 90}ms`,
                      }}
                    />
                  </div>
                  <span className="w-14 text-right font-mono text-xs text-white/90">
                    {v.toFixed(1)}
                    {unit}
                  </span>
                </div>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Before / after bar with a range (LoRA trainable parameters) ---------- */

export function RangeCompare({
  fullLabel,
  loraLabel,
  low,
  high,
}: {
  fullLabel: string;
  loraLabel: string;
  low: number; // % of parameters still trained, best case
  high: number; // worst case
}) {
  const [ref, on] = useInView<HTMLDivElement>(0.3);
  const bar = (label: string, width: number, color: string, delay: number, note: string, band?: [number, number]) => (
    <div>
      <div className="mb-2 flex items-baseline justify-between text-sm">
        <span className="text-white/85">{label}</span>
        <span className="font-mono text-xs text-muted">{note}</span>
      </div>
      <div className="relative h-9 overflow-hidden rounded-xl bg-white/[0.06]">
        <div
          className="h-full rounded-xl"
          style={{
            width: on ? `${width}%` : "0%",
            background: `linear-gradient(90deg, ${color}aa, ${color})`,
            transition: `width 1.3s ${EASE} ${delay}ms`,
          }}
        />
        {band && (
          <div
            className="absolute inset-y-0 border-x border-dashed border-white/50 bg-white/10"
            style={{ left: `${band[0]}%`, width: `${band[1] - band[0]}%`, opacity: on ? 1 : 0, transition: `opacity 0.6s ease ${delay + 900}ms` }}
            aria-hidden="true"
          />
        )}
      </div>
    </div>
  );
  return (
    <div ref={ref} className="space-y-5">
      {bar(fullLabel, 100, "#ff5fa2", 0, "100% of weights")}
      {bar(loraLabel, high, "#34d3b5", 250, `≈${low}–${high}% of weights`, [low, high])}
    </div>
  );
}

/* ---------- Donut (skills per area) ---------- */

export function Donut({ parts, centerLabel }: { parts: { label: string; value: number; color: string }[]; centerLabel: string }) {
  const [ref, on] = useInView<HTMLDivElement>(0.3);
  const total = parts.reduce((s, p) => s + p.value, 0);
  const R = 70;
  const C = 2 * Math.PI * R;
  let offset = 0;
  return (
    <div ref={ref} className="flex flex-col items-center gap-8 sm:flex-row sm:items-center">
      <div className="relative h-52 w-52 shrink-0">
        <svg viewBox="0 0 180 180" className="h-full w-full -rotate-90" role="img" aria-label={`${total} skills across ${parts.length} areas`}>
          <circle cx="90" cy="90" r={R} fill="none" stroke="rgb(255 255 255 / 0.06)" strokeWidth="22" />
          {parts.map((p, i) => {
            const len = (p.value / total) * C;
            const gap = 3;
            const el = (
              <circle
                key={p.label}
                cx="90"
                cy="90"
                r={R}
                fill="none"
                stroke={p.color}
                strokeWidth="22"
                strokeDasharray={`${Math.max(0, len - gap)} ${C}`}
                strokeDashoffset={on ? -offset : -offset + len}
                style={{ opacity: on ? 1 : 0, transition: `stroke-dashoffset 1s ${EASE} ${i * 110}ms, opacity 0.4s ease ${i * 110}ms` }}
              />
            );
            offset += len;
            return el;
          })}
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="font-display text-4xl font-bold text-white">{total}</p>
            <p className="text-xs text-muted">{centerLabel}</p>
          </div>
        </div>
      </div>
      <ul className="grid w-full gap-2.5 sm:grid-cols-1">
        {parts.map((p) => (
          <li key={p.label} className="flex items-center gap-3 text-sm">
            <span className="h-3 w-3 shrink-0 rounded" style={{ background: p.color }} />
            <span className="flex-1 text-white/85">{p.label}</span>
            <span className="font-mono text-xs text-muted">{p.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Timeline (Gantt) ---------- */

export function Timeline({
  items,
  from,
  to,
}: {
  items: { label: string; sub: string; start: number; end: number; color: string; ongoing?: boolean }[];
  from: number; // decimal year, e.g. 2021
  to: number;
}) {
  const [ref, on] = useInView<HTMLDivElement>(0.25);
  const pct = (y: number) => ((y - from) / (to - from)) * 100;
  const years = Array.from({ length: Math.floor(to) - Math.ceil(from) + 1 }, (_, i) => Math.ceil(from) + i);
  return (
    <div ref={ref}>
      <ul className="space-y-4">
        {items.map((it, i) => (
          <li key={it.label} className="grid items-center gap-2 sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-5">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3 shrink-0">
                {it.ongoing && <span className="absolute inset-0 animate-ping rounded-full opacity-70" style={{ background: it.color }} />}
                <span className="relative h-3 w-3 rounded-full" style={{ background: it.color }} />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">{it.label}</p>
                <p className="truncate text-xs text-muted">{it.sub}</p>
              </div>
            </div>
            <div className="relative h-8 rounded-full bg-white/[0.04]">
              {years.map((y) => (
                <div key={y} className="absolute inset-y-0 border-l border-dashed border-white/10" style={{ left: `${pct(y)}%` }} aria-hidden="true" />
              ))}
              <div
                className="absolute inset-y-1 rounded-full"
                style={{
                  left: `${pct(it.start)}%`,
                  width: on ? `${Math.max(pct(it.end) - pct(it.start), 2.5)}%` : "0%",
                  background: `linear-gradient(90deg, ${it.color}88, ${it.color})`,
                  boxShadow: `0 0 22px ${it.color}77`,
                  transition: `width 1.2s ${EASE} ${i * 250}ms`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-2 grid sm:grid-cols-[minmax(0,15rem)_1fr] sm:gap-5">
        <span className="hidden sm:block" />
        <div className="relative h-5 text-xs text-muted" aria-hidden="true">
          {years
            .filter((y) => y < to)
            .map((y) => (
              <span key={y} className={`absolute font-mono ${y > from ? "-translate-x-1/2" : ""}`} style={{ left: `${pct(y)}%` }}>
                {y}
              </span>
            ))}
        </div>
      </div>
    </div>
  );
}

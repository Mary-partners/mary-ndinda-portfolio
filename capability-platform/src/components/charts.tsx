"use client";

import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend, Cell,
} from "recharts";

const NAVY = "#10253F";
const NAVY2 = "#1E3A5F";
const GOLD = "#B69A57";
const GRID = "#E3E8EF";

export function CapabilityRadar({
  data,
}: {
  data: { dimension: string; current: number | null; baseline?: number | null }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={320}>
      <RadarChart data={data} outerRadius="72%">
        <PolarGrid stroke={GRID} />
        <PolarAngleAxis dataKey="dimension" tick={{ fontSize: 11, fill: "#64748B" }} />
        <PolarRadiusAxis domain={[0, 4]} tick={{ fontSize: 10, fill: "#94a3b8" }} tickCount={5} />
        {data.some((d) => d.baseline !== undefined && d.baseline !== null) && (
          <Radar name="Baseline" dataKey="baseline" stroke={GOLD} fill={GOLD} fillOpacity={0.12} />
        )}
        <Radar name="Current" dataKey="current" stroke={NAVY} fill={NAVY} fillOpacity={0.25} />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        <Tooltip formatter={(v: number) => (v === null ? "—" : v.toFixed(2))} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

export function DimensionBars({
  data,
}: {
  data: { name: string; score: number | null }[];
}) {
  return (
    <ResponsiveContainer width="100%" height={Math.max(220, data.length * 38)}>
      <BarChart data={data} layout="vertical" margin={{ left: 8, right: 24 }}>
        <CartesianGrid horizontal={false} stroke={GRID} />
        <XAxis type="number" domain={[0, 4]} tick={{ fontSize: 11, fill: "#64748B" }} />
        <YAxis type="category" dataKey="name" width={150} tick={{ fontSize: 11, fill: "#334155" }} />
        <Tooltip formatter={(v: number) => (v === null ? "—" : v.toFixed(2))} />
        <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={16}>
          {data.map((d, i) => (
            <Cell key={i} fill={(d.score ?? 0) < 2 ? "#b91c1c" : (d.score ?? 0) < 3 ? GOLD : NAVY} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}

export function DistributionBars({ data }: { data: { band: string; count: number }[] }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} margin={{ left: 0, right: 8 }}>
        <CartesianGrid vertical={false} stroke={GRID} />
        <XAxis dataKey="band" tick={{ fontSize: 11, fill: "#64748B" }} />
        <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#64748B" }} />
        <Tooltip />
        <Bar dataKey="count" fill={NAVY2} radius={[4, 4, 0, 0]} barSize={46} />
      </BarChart>
    </ResponsiveContainer>
  );
}

export function TrendLine({
  data,
  keys,
}: {
  data: Record<string, number | string>[];
  keys: { key: string; label: string; color?: string }[];
}) {
  const palette = [NAVY, GOLD, "#2c7d63"];
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data} margin={{ left: 0, right: 8 }}>
        <CartesianGrid stroke={GRID} />
        <XAxis dataKey="period" tick={{ fontSize: 11, fill: "#64748B" }} />
        <YAxis tick={{ fontSize: 11, fill: "#64748B" }} />
        <Tooltip />
        <Legend wrapperStyle={{ fontSize: 12 }} />
        {keys.map((k, i) => (
          <Line key={k.key} dataKey={k.key} name={k.label} stroke={k.color ?? palette[i % palette.length]} strokeWidth={2} dot={{ r: 3 }} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

// Simple horizontal adoption funnel (pure SVG-ish via divs).
export function AdoptionFunnel({ steps }: { steps: { label: string; value: number }[] }) {
  const max = Math.max(1, ...steps.map((s) => s.value));
  return (
    <div className="space-y-2">
      {steps.map((s, i) => {
        const pct = (s.value / max) * 100;
        return (
          <div key={i} className="flex items-center gap-3">
            <div className="w-56 shrink-0 text-sm text-ink-muted">{s.label}</div>
            <div className="h-7 flex-1 rounded-md bg-navy/5">
              <div
                className="flex h-7 items-center justify-end rounded-md bg-gradient-to-r from-navy-600 to-navy-700 px-2 text-xs font-semibold text-white"
                style={{ width: `${Math.max(pct, 6)}%` }}
              >
                {s.value}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

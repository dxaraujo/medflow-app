import { useState } from "react"
import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const PRIMARY = "#003c60"
const PRIMARY_CONTAINER = "#005483"
const ON_SURFACE_VARIANT = "#41474f"

type Tone = "mid" | "strong" | "peak" | "soft"

const DATA: { month: string; value: number; tone: Tone }[] = [
  { month: "Jan", value: 65, tone: "mid" },
  { month: "Fev", value: 72, tone: "mid" },
  { month: "Mar", value: 85, tone: "mid" },
  { month: "Abr", value: 60, tone: "mid" },
  { month: "Mai", value: 78, tone: "mid" },
  { month: "Jun", value: 92, tone: "strong" },
  { month: "Jul", value: 100, tone: "peak" },
  { month: "Ago", value: 45, tone: "soft" },
  { month: "Set", value: 30, tone: "soft" },
  { month: "Out", value: 25, tone: "soft" },
  { month: "Nov", value: 15, tone: "soft" },
  { month: "Dez", value: 10, tone: "soft" },
]

function barFill(tone: Tone, hovered: boolean): string {
  switch (tone) {
    case "peak":
      return PRIMARY_CONTAINER
    case "mid":
      return hovered ? PRIMARY_CONTAINER : "rgba(0, 84, 131, 0.6)"
    case "strong":
      return hovered ? PRIMARY_CONTAINER : "rgba(0, 84, 131, 0.8)"
    case "soft":
      return hovered ? "rgba(0, 84, 131, 0.6)" : "rgba(0, 84, 131, 0.4)"
    default:
      return PRIMARY_CONTAINER
  }
}

export function AttendanceBarChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div className="h-64 w-full px-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={DATA}
          margin={{ top: 8, right: 4, left: 4, bottom: 4 }}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            interval={0}
            tick={({ x, y, payload }) => {
              const label = String(payload.value)
              const isPeak = label === "Jul"
              return (
                <text
                  x={x}
                  y={y}
                  dy={12}
                  textAnchor="middle"
                  fill={isPeak ? PRIMARY : ON_SURFACE_VARIANT}
                  className="text-[10px] font-bold uppercase"
                >
                  {label}
                </text>
              )
            }}
          />
          <YAxis type="number" domain={[0, 100]} hide />
          <Tooltip
            cursor={{ fill: "transparent" }}
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null
              const row = payload[0].payload as (typeof DATA)[number]
              return (
                <div className="rounded-md border border-outline-variant/20 bg-white px-2 py-1 text-xs shadow-sm dark:bg-slate-800">
                  <span className="font-semibold text-on-surface">{row.month}</span>
                  <span className="text-on-surface-variant"> — {row.value}%</span>
                </div>
              )
            }}
          />
          <Bar
            dataKey="value"
            maxBarSize={28}
            radius={[4, 4, 0, 0]}
            onMouseEnter={(_, i) => setActiveIndex(i)}
          >
            {DATA.map((entry, index) => (
              <Cell
                key={entry.month}
                fill={barFill(entry.tone, activeIndex === index)}
                style={
                  entry.tone === "peak"
                    ? { filter: "drop-shadow(0 4px 6px rgba(0, 60, 96, 0.15))" }
                    : undefined
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

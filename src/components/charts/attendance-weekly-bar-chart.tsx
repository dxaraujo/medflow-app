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
import {
  ATTENDANCE_CHART_ON_SURFACE_VARIANT,
  ATTENDANCE_CHART_PRIMARY,
  attendanceBarFill,
} from "@/components/charts/attendance-chart-theme"
import { ATTENDANCE_WEEKLY_BAR_DATA, type AttendanceWeekDayPoint } from "@/data/attendance-weekly-series"

const PEAK_WEEKDAY_LABEL = "Qua"

export function AttendanceWeeklyBarChart() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <div className="h-64 w-full px-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={ATTENDANCE_WEEKLY_BAR_DATA}
          margin={{ top: 8, right: 4, left: 4, bottom: 4 }}
          onMouseLeave={() => setActiveIndex(null)}
        >
          <XAxis
            dataKey="weekday"
            axisLine={false}
            tickLine={false}
            interval={0}
            tick={({ x, y, payload }) => {
              const label = String(payload.value)
              const isPeak = label === PEAK_WEEKDAY_LABEL
              return (
                <text
                  x={x}
                  y={y}
                  dy={12}
                  textAnchor="middle"
                  fill={isPeak ? ATTENDANCE_CHART_PRIMARY : ATTENDANCE_CHART_ON_SURFACE_VARIANT}
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
              const row = payload[0].payload as AttendanceWeekDayPoint
              return (
                <div className="rounded-md border border-outline-variant/20 bg-white px-2 py-1 text-xs shadow-sm dark:bg-slate-800">
                  <span className="font-semibold text-on-surface">{row.weekday}</span>
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
            {ATTENDANCE_WEEKLY_BAR_DATA.map((entry, index) => (
              <Cell
                key={entry.weekday}
                fill={attendanceBarFill(entry.tone, activeIndex === index)}
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

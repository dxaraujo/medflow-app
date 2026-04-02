import { Pie, PieChart, ResponsiveContainer } from "recharts"

const PRIMARY = "#005483"
const TRACK = "rgba(193, 199, 208, 0.25)"

type AgendaOccupancyChartProps = {
  /** Percentual ocupado (0–100). */
  value: number
}

export function AgendaOccupancyChart({ value }: AgendaOccupancyChartProps) {
  const clamped = Math.min(100, Math.max(0, value))
  const data = [
    { name: "ocupado", v: clamped, fill: PRIMARY },
    { name: "livre", v: 100 - clamped, fill: TRACK },
  ]

  return (
    <div className="relative mx-auto flex h-32 w-32 items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="v"
            cx="50%"
            cy="50%"
            innerRadius="88%"
            outerRadius="100%"
            startAngle={90}
            endAngle={-270}
            stroke="none"
            isAnimationActive
          >
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute flex flex-col items-center">
        <span className="text-2xl font-bold">{Math.round(clamped)}%</span>
        <span className="text-[10px] font-bold uppercase text-on-surface-variant">Ocupado</span>
      </div>
    </div>
  )
}

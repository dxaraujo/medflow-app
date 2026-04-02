import { Button, Card, Link, ProgressBar } from "@heroui/react"
import {
  Armchair,
  CalendarCheck,
  Clock,
  Download,
  PieChart,
  UserPlus,
} from "lucide-react"
import { useState } from "react"
import { AgendaOccupancyChart } from "./charts/agenda-occupancy-chart"
import { AttendanceBarChart } from "./charts/attendance-bar-chart"

export function DashboardPage() {
  const [period, setPeriod] = useState<"semanal" | "historico">("historico")

  return (
    <div className="mx-auto max-w-7xl space-y-12 p-12">
      <section className="space-y-2">
        <h2 className="font-headline text-4xl font-extrabold tracking-tight text-primary">
          Painel de Gestão
        </h2>
        <p className="text-lg text-on-surface-variant">
          Visão estratégica da performance e produtividade da clínica.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card.Root className="flex aspect-square flex-col justify-between rounded-xl bg-primary-container p-6 text-white md:aspect-auto">
          <CalendarCheck className="size-10" />
          <div>
            <p className="font-headline text-6xl font-bold">12</p>
            <p className="text-sm font-medium uppercase tracking-widest opacity-90">
              Consultas Hoje
            </p>
          </div>
        </Card.Root>

        <Card.Root className="flex aspect-square flex-col justify-between rounded-xl border border-outline-variant/10 bg-surface-container-low p-6 md:aspect-auto">
          <UserPlus className="size-10 text-primary" />
          <div>
            <p className="font-headline text-4xl font-bold text-on-surface">42</p>
            <p className="text-sm font-medium uppercase tracking-widest text-on-surface-variant">
              Novos Pacientes / Mês
            </p>
            <p className="mt-1 text-xs font-medium text-green-600">+15% vs mês anterior</p>
          </div>
        </Card.Root>

        <Card.Root className="flex aspect-square flex-col justify-between rounded-xl border border-outline-variant/10 bg-surface-container-low p-6 md:aspect-auto">
          <Clock className="size-10 text-primary" />
          <div>
            <p className="font-headline text-4xl font-bold text-on-surface">
              14<span className="ml-1 text-2xl">min</span>
            </p>
            <p className="text-sm font-medium uppercase tracking-widest text-on-surface-variant">
              Tempo Médio de Espera
            </p>
            <p className="mt-1 text-xs font-medium text-green-600">Meta: &lt; 15 min</p>
          </div>
        </Card.Root>
      </section>

      <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-3">
        <section className="space-y-8 lg:col-span-2">
          <div className="mb-6 flex w-fit items-center gap-1 rounded-full border border-outline-variant/10 bg-surface-container-low p-1">
            <Button
              variant={period === "semanal" ? "primary" : "ghost"}
              className="rounded-full px-6 py-2 text-sm font-semibold"
              onPress={() => setPeriod("semanal")}
            >
              Semanal
            </Button>
            <Button
              variant={period === "historico" ? "primary" : "ghost"}
              className="rounded-full px-6 py-2 text-sm font-semibold shadow-sm"
              onPress={() => setPeriod("historico")}
            >
              Histórico
            </Button>
          </div>

          <div className="space-y-1">
            <h3 className="font-headline text-2xl font-bold">Histórico Anual de Atendimentos</h3>
            <p className="text-sm text-on-surface-variant">
              Análise consolidada da performance clínica no ano corrente.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { k: "Total Atendimentos", v: "1.250", c: "text-primary" },
              { k: "Ausências / Faltas", v: "42", c: "text-error" },
              { k: "Retornos", v: "312", c: "text-on-secondary-container" },
              { k: "Novos Pacientes", v: "128", c: "text-primary-container" },
            ].map((m) => (
              <Card.Root
                key={m.k}
                className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-4"
              >
                <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">
                  {m.k}
                </p>
                <p className={`font-headline text-xl font-bold ${m.c}`}>{m.v}</p>
              </Card.Root>
            ))}
          </div>

          <Card.Root className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-8">
            <AttendanceBarChart />
            <div className="mt-8 flex items-center justify-between border-t border-outline-variant/10 pt-6">
              <p className="max-w-md text-xs leading-relaxed text-on-surface-variant">
                Tendência de crescimento estável com pico sazonal identificado em Julho. Projeção de alta
                para o próximo trimestre baseada no histórico de retornos.
              </p>
              <Link.Root
                href="#"
                className="inline-flex items-center gap-1 text-sm font-bold text-primary no-underline hover:underline"
              >
                <Download className="size-4" />
                Exportar Relatório
              </Link.Root>
            </div>
          </Card.Root>
        </section>

        <aside className="space-y-8">
          <h3 className="font-headline text-2xl font-bold">Visão Geral</h3>

          <Card.Root className="space-y-4 rounded-xl bg-surface-container-low p-8">
            <div className="flex items-center justify-between">
              <p className="font-headline font-bold">Ocupação da Agenda</p>
              <Armchair className="text-primary" />
            </div>
            <div className="pt-2">
              <AgendaOccupancyChart value={88} />
            </div>
            <p className="text-center text-xs leading-relaxed text-on-surface-variant">
              Sua agenda desta semana está quase completa. 4 slots restantes.
            </p>
          </Card.Root>

          <Card.Root className="space-y-6 rounded-xl bg-surface-container-low p-8">
            <div className="flex items-center justify-between">
              <p className="font-headline font-bold">Perfil de Pagamento</p>
              <PieChart className="text-on-surface-variant" />
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-tight">
                  <span className="text-primary">Particulares</span>
                  <span>68%</span>
                </div>
                <ProgressBar.Root
                  value={68}
                  aria-label="Particulares 68 por cento"
                  className="w-full"
                  color="accent"
                >
                  <ProgressBar.Track className="h-2 rounded-full border border-outline-variant/5 bg-white">
                    <ProgressBar.Fill className="rounded-full bg-primary" />
                  </ProgressBar.Track>
                </ProgressBar.Root>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-tight">
                  <span className="text-on-secondary-container">Convênios</span>
                  <span>32%</span>
                </div>
                <ProgressBar.Root
                  value={32}
                  aria-label="Convênios 32 por cento"
                  className="w-full"
                  color="accent"
                >
                  <ProgressBar.Track className="h-2 rounded-full border border-outline-variant/5 bg-white">
                    <ProgressBar.Fill className="rounded-full bg-on-secondary-container" />
                  </ProgressBar.Track>
                </ProgressBar.Root>
              </div>
            </div>
            <div className="border-t border-outline-variant/10 pt-4">
              <p className="text-xs leading-relaxed text-on-surface-variant">
                Aumento de <strong>3%</strong> na taxa de pacientes particulares em relação ao período
                anterior.
              </p>
            </div>
          </Card.Root>
        </aside>
      </div>
    </div>
  )
}

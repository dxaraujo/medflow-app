import { DashboardAnalyticsSection } from "@/components/dashboard/dashboard-analytics-section"
import { DashboardKpiSection } from "@/components/dashboard/dashboard-kpi-section"
import { DashboardOverviewAside } from "@/components/dashboard/dashboard-overview-aside"
import { PageHero } from "@/components/layout/page-hero"

export function DashboardPage() {
  return (
    <div className="mx-auto p-12">
      <PageHero
        title="Painel de Gestão"
        subtitle="Visão estratégica da performance e produtividade da clínica."
      />
      <div className="mt-12">
        <DashboardKpiSection />
      </div>
      <div className="mt-12 grid grid-cols-1 items-start gap-12 lg:grid-cols-3">
        <DashboardAnalyticsSection />
        <DashboardOverviewAside />
      </div>
    </div>
  )
}

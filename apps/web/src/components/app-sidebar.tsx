import { SidebarBrand } from "@/components/layout/sidebar-brand"
import { SidebarNav } from "@/components/layout/sidebar-nav"
import { sidebarNavItems } from "@/data/nav-items"

export function AppSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col gap-2 border-r-0 bg-slate-50 p-6 dark:bg-slate-900">
      <SidebarBrand title="MedFlow" tagline="Tornando sua vida mais simple" />
      <SidebarNav items={sidebarNavItems} />
    </aside>
  )
}

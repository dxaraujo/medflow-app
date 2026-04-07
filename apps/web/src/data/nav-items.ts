import type { LucideIcon } from "lucide-react"
import { Calendar, FileText, LayoutDashboard, Settings, Users } from "lucide-react"

export type SidebarNavItem = {
  path: string
  label: string
  icon: LucideIcon
}

export const sidebarNavItems: SidebarNavItem[] = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/agenda", label: "Agenda", icon: Calendar },
  { path: "/pacientes", label: "Pacientes", icon: Users },
  { path: "/prontuarios", label: "Prontuários", icon: FileText },
  { path: "/configuracoes", label: "Configurações", icon: Settings },
]

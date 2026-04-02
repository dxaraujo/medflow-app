import type { LucideIcon } from "lucide-react"
import { Calendar, LayoutDashboard, Settings, Users } from "lucide-react"

export type SidebarNavItem = {
  href: string
  label: string
  icon: LucideIcon
  active: boolean
}

export const sidebarNavItems: SidebarNavItem[] = [
  { href: "#", label: "Dashboard", icon: LayoutDashboard, active: true },
  { href: "#", label: "Agenda", icon: Calendar, active: false },
  { href: "#", label: "Pacientes", icon: Users, active: false },
  { href: "#", label: "Configurações", icon: Settings, active: false },
]

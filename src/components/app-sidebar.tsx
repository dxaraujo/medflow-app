import { Link, buttonVariants, cn } from "@heroui/react"
import {
  Calendar,
  LayoutDashboard,
  Settings,
  Users,
} from "lucide-react"

const navItems = [
  { href: "#", label: "Dashboard", icon: LayoutDashboard, active: true },
  { href: "#", label: "Agenda", icon: Calendar, active: false },
  { href: "#", label: "Pacientes", icon: Users, active: false },
  { href: "#", label: "Configurações", icon: Settings, active: false },
] as const

export function AppSidebar() {
  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col gap-2 border-r-0 bg-slate-50 p-6 dark:bg-slate-900">
      <div className="mb-8 px-4">
        <h1 className="font-headline text-xl font-bold text-primary dark:text-white">
          MedFlow
        </h1>
        <p className="mt-1 text-xs text-on-surface-variant">
          Tornando sua vida mais simple
        </p>
      </div>
      <nav className="flex flex-col gap-1">
        {navItems.map(({ href, label, icon: Icon, active }) => (
          <Link.Root
            key={label}
            href={href}
            className={cn(
              buttonVariants({
                variant: active ? "primary" : "ghost",
                size: "md",
                fullWidth: false,
              }),
              "h-11 scale-95 justify-start gap-3 rounded-full px-4 no-underline active:scale-90 w-full",
              active
                ? "text-white"
                : "text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800",
            )}
          >
            <Icon className="size-[22px] shrink-0"/>
            <span className="font-headline text-sm tracking-tight">{label}</span>
          </Link.Root>
        ))}
      </nav>
    </aside>
  )
}

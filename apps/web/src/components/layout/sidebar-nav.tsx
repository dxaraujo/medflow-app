import { buttonVariants, cn } from "@heroui/react"
import { NavLink } from "react-router-dom"
import type { SidebarNavItem } from "@/data/nav-items"

type SidebarNavProps = {
  items: readonly SidebarNavItem[]
}

export function SidebarNav({ items }: SidebarNavProps) {
  return (
    <nav className="flex flex-col gap-1">
      {items.map(({ path, label, icon: Icon }) => (
        <NavLink
          key={path}
          to={path}
          end={path === "/"}
          className={({ isActive }) =>
            cn(
              buttonVariants({
                variant: isActive ? "primary" : "ghost",
                size: "md",
                fullWidth: false,
              }),
              "h-11 w-full scale-95 justify-start gap-3 rounded-full px-4 no-underline active:scale-90",
              isActive
                ? "text-white"
                : "text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800",
            )
          }
        >
          <Icon className="size-[22px] shrink-0" />
          <span className="font-headline text-sm tracking-tight">{label}</span>
        </NavLink>
      ))}
    </nav>
  )
}

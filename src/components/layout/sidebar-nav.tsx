import { Link, buttonVariants, cn } from "@heroui/react"
import type { SidebarNavItem } from "@/data/nav-items"

type SidebarNavProps = {
  items: readonly SidebarNavItem[]
}

export function SidebarNav({ items }: SidebarNavProps) {
  return (
    <nav className="flex flex-col gap-1">
      {items.map(({ href, label, icon: Icon, active }) => (
        <Link.Root
          key={label}
          href={href}
          className={cn(
            buttonVariants({
              variant: active ? "primary" : "ghost",
              size: "md",
              fullWidth: false,
            }),
            "h-11 w-full scale-95 justify-start gap-3 rounded-full px-4 no-underline active:scale-90",
            active
              ? "text-white"
              : "text-slate-600 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-slate-800",
          )}
        >
          <Icon className="size-[22px] shrink-0" />
          <span className="font-headline text-sm tracking-tight">{label}</span>
        </Link.Root>
      ))}
    </nav>
  )
}

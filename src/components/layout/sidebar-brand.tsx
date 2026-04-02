type SidebarBrandProps = {
  title: string
  tagline: string
}

export function SidebarBrand({ title, tagline }: SidebarBrandProps) {
  return (
    <div className="mb-8 px-4">
      <h1 className="font-headline text-xl font-bold text-primary dark:text-white">{title}</h1>
      <p className="mt-1 text-xs text-on-surface-variant">{tagline}</p>
    </div>
  )
}

type SectionHeaderProps = {
  title: string
  description?: string
}

export function SectionHeader({ title, description }: SectionHeaderProps) {
  return (
    <div className="space-y-1">
      <h3 className="font-headline text-2xl font-bold">{title}</h3>
      {description ? <p className="text-sm text-on-surface-variant">{description}</p> : null}
    </div>
  )
}

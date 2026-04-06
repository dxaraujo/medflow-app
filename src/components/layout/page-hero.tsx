type PageHeroProps = {
  title: string
  subtitle: string
}

export function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="space-y-2">
      <h2 className="font-headline text-4xl font-extrabold tracking-tight text-primary">{title}</h2>
      <p className="text-lg text-on-surface-variant">{subtitle}</p>
    </section>
  )
}

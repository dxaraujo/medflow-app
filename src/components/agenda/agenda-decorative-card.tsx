import { Card } from "@heroui/react"
import { MessageCircle } from "lucide-react"

const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&h=200&fit=crop&q=80"

export function AgendaDecorativeCard() {
  return (
    <Card.Root className="relative overflow-hidden rounded-xl border border-outline-variant/15 bg-surface-container-low shadow-sm">
      <div className="relative aspect-[4/3] w-full">
        <img
          src={PLACEHOLDER_IMG}
          alt=""
          className="size-full object-cover grayscale"
        />
        <div className="absolute bottom-3 right-3 flex size-10 items-center justify-center rounded-full bg-primary text-on-primary shadow-md">
          <MessageCircle className="size-5" aria-hidden />
        </div>
      </div>
    </Card.Root>
  )
}

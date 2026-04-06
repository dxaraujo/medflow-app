import { Button } from "@heroui/react"
import { Plus } from "lucide-react"

export function AgendaFab() {
  return (
    <Button
      aria-label="Novo agendamento"
      className="group fixed bottom-8 right-8 z-50 size-14 min-w-14 rounded-full bg-primary p-0 text-on-primary shadow-2xl transition-transform hover:scale-110 active:scale-95"
      onPress={() => {}}
    >
      <Plus className="size-8" strokeWidth={2} />
      <span className="pointer-events-none absolute right-full mr-4 whitespace-nowrap rounded-full bg-on-background px-3 py-1 text-[10px] font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
        NOVO AGENDAMENTO
      </span>
    </Button>
  )
}

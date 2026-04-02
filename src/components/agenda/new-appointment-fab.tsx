import { Button, cn } from "@heroui/react"
import { Plus } from "lucide-react"

export function NewAppointmentFab() {
  return (
    <Button
      variant="primary"
      aria-label="Novo agendamento"
      className={cn(
        "fixed bottom-8 right-8 z-50 size-14 min-w-0 rounded-full p-0 shadow-lg",
      )}
      onPress={() => {
        /* placeholder até modal de agendamento */
      }}
    >
      <Plus className="size-7" strokeWidth={2.5} />
    </Button>
  )
}

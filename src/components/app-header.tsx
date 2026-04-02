import { Avatar, Button, SearchField } from "@heroui/react"
import { Bell, HelpCircle } from "lucide-react"

const AVATAR_SRC = "https://lh3.googleusercontent.com/aida-public/AB6AXuDA1nve09lslZxPpvriMUTkfaO2Xp7oJksEqAOFOTkn1mPW_bUlpZvISqpfDVIvzJSgvyS9rRK7AQKIs3GLtc7um282D9qUqfJWeNoGJVx5WqWcHrAjbwB_3HbZTRDxtoaQZvRdJ-qTHNBbdOZ3WppgPMKRuPkGY32Ehontq9UChAzSWmbEz_AgljXxrn22sQFAgAcqLSwTiqzwISlphA4qird9YKj3jxHAKC4uO_TY2Qss-sxJiXRN7i72QrSdskrttn8iIJSj4Yk"

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between bg-white/80 px-8 shadow-sm backdrop-blur-xl dark:bg-slate-900/80 dark:shadow-none">
      <div className="flex flex-1 items-center gap-4">
        <SearchField name="search" aria-label="pesquisar prontuários" className="bg-surface-container-low border-none rounded-full text-sm focus:ring-2 focus:ring-primary/20" variant="secondary" >
          <SearchField.Group>
            <SearchField.SearchIcon />
            <SearchField.Input className="w-[480px] text-sm" placeholder="Pesquisar prontuários..." />
            <SearchField.ClearButton />
          </SearchField.Group>
        </SearchField>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex gap-4">
          <Button
            variant="ghost"
            isIconOnly
            aria-label="Notificações"
            className="text-on-surface-variant opacity-80 hover:opacity-100"
          >
            <Bell className="size-5" />
          </Button>
          <Button
            variant="ghost"
            isIconOnly
            aria-label="Ajuda"
            className="text-on-surface-variant opacity-80 hover:opacity-100"
          >
            <HelpCircle className="size-5" />
          </Button>
        </div>
        <div className="h-8 w-px bg-outline-variant/30" />
        <div className="flex items-center">
          <span className="text-sm font-medium text-primary">Dra. Liana Barbosa</span>
          <Avatar.Root size="sm" className="size-8 shrink-0">
            <Avatar.Image alt="Avatar do Médico" src={AVATAR_SRC} className="object-cover" />
            <Avatar.Fallback className="text-xs">LB</Avatar.Fallback>
          </Avatar.Root>
        </div>
      </div>
    </header>
  )
}

import { Bell, HelpCircle } from "lucide-react"
import { HeaderIconButton } from "@/components/layout/header-icon-button"
import { HeaderSearch } from "@/components/layout/header-search"
import { UserProfileSnippet } from "@/components/layout/user-profile-snippet"

const AVATAR_SRC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDA1nve09lslZxPpvriMUTkfaO2Xp7oJksEqAOFOTkn1mPW_bUlpZvISqpfDVIvzJSgvyS9rRK7AQKIs3GLtc7um282D9qUqfJWeNoGJVx5WqWcHrAjbwB_3HbZTRDxtoaQZvRdJ-qTHNBbdOZ3WppgPMKRuPkGY32Ehontq9UChAzSWmbEz_AgljXxrn22sQFAgAcqLSwTiqzwISlphA4qird9YKj3jxHAKC4uO_TY2Qss-sxJiXRN7i72QrSdskrttn8iIJSj4Yk"

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between bg-white/80 px-8 shadow-sm backdrop-blur-xl dark:bg-slate-900/80 dark:shadow-none">
      <div className="flex flex-1 items-center gap-4">
        <HeaderSearch />
      </div>
      <div className="flex items-center gap-6">
        <div className="flex gap-3">
          <HeaderIconButton aria-label="Notificações">
            <Bell className="size-5" />
          </HeaderIconButton>
          <HeaderIconButton aria-label="Ajuda">
            <HelpCircle className="size-5" />
          </HeaderIconButton>
        </div>
        <div className="h-8 w-px bg-outline-variant/30" />
        <UserProfileSnippet
          name="Dra. Liana Barbosa"
          imageSrc={AVATAR_SRC}
          imageAlt="Avatar do Médico"
          fallback="LB"
        />
      </div>
    </header>
  )
}

import { SearchField } from "@heroui/react"

type HeaderSearchProps = {
  placeholder?: string
  ariaLabel?: string
  inputClassName?: string
}

export function HeaderSearch({
  placeholder = "Pesquisar prontuários...",
  ariaLabel = "Pesquisar prontuários",
  inputClassName = "w-[480px] text-sm",
}: HeaderSearchProps) {
  return (
    <SearchField
      name="search"
      aria-label={ariaLabel}
      className="rounded-full border-none bg-surface-container-low text-sm focus:ring-2 focus:ring-primary/20"
      variant="secondary"
    >
      <SearchField.Group>
        <SearchField.SearchIcon />
        <SearchField.Input className={inputClassName} placeholder={placeholder} />
        <SearchField.ClearButton />
      </SearchField.Group>
    </SearchField>
  )
}

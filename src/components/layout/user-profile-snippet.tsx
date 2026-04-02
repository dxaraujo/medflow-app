import { Avatar } from "@heroui/react"

type UserProfileSnippetProps = {
  name: string
  imageSrc: string
  imageAlt: string
  fallback: string
}

export function UserProfileSnippet({ name, imageSrc, imageAlt, fallback }: UserProfileSnippetProps) {
  return (
    <div className="flex items-center">
      <span className="text-sm font-medium m-3 text-primary">{name}</span>
      <Avatar.Root size="sm" className="size-8 shrink-0">
        <Avatar.Image alt={imageAlt} src={imageSrc} className="object-cover" />
        <Avatar.Fallback className="text-xs">{fallback}</Avatar.Fallback>
      </Avatar.Root>
    </div>
  )
}

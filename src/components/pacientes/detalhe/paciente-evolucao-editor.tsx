import { Button } from "@heroui/react"
import { Bold, Italic, List, Paperclip, Sparkles } from "lucide-react"
import { useState } from "react"
import type { PatientHeroMeta } from "@/data/patient-detail-mock"

type PacienteEvolucaoEditorProps = {
  hero: PatientHeroMeta
}

export function PacienteEvolucaoEditor({ hero }: PacienteEvolucaoEditorProps) {
  const [text, setText] = useState(hero.clinicalNoteDraft)

  return (
    <div
      role="tabpanel"
      id="panel-evolucao"
      aria-labelledby="tab-evolucao"
      className="flex min-h-[min(500px,70vh)] flex-col gap-4 rounded-2xl bg-surface-container-lowest p-6 shadow-sm md:p-8"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-headline text-lg font-bold text-primary">Anotações da consulta</h3>
        <div className="flex gap-1 text-on-surface-variant">
          <Button isIconOnly variant="ghost" size="sm" aria-label="Negrito" className="text-on-surface-variant">
            <Bold className="size-5" />
          </Button>
          <Button isIconOnly variant="ghost" size="sm" aria-label="Itálico" className="text-on-surface-variant">
            <Italic className="size-5" />
          </Button>
          <Button isIconOnly variant="ghost" size="sm" aria-label="Lista" className="text-on-surface-variant">
            <List className="size-5" />
          </Button>
        </div>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Descreva a queixa principal, anamnese e conduta..."
        className="min-h-[280px] w-full flex-1 resize-none rounded-xl border-none bg-surface-container-low p-6 font-body text-base leading-relaxed text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-2 focus:ring-primary/10"
        aria-label="Texto da evolução clínica"
      />
      <div className="mt-2 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        {hero.clinicalNoteMeta ? (
          <p className="text-xs italic text-on-surface-variant/80">{hero.clinicalNoteMeta}</p>
        ) : (
          <span />
        )}
        <div className="flex gap-2">
          <Button
            isIconOnly
            variant="ghost"
            aria-label="Assistente"
            className="text-primary hover:bg-[#cde5ff]/50"
            onPress={() => {}}
          >
            <Sparkles className="size-5" />
          </Button>
          <Button
            isIconOnly
            variant="ghost"
            aria-label="Anexar arquivo"
            className="text-primary hover:bg-[#cde5ff]/50"
            onPress={() => {}}
          >
            <Paperclip className="size-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}

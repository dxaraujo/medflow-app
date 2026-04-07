import { usePatientDetailOutlet } from "@/components/pacientes/detalhe/paciente-detalhe-tab-routes"
import { DadosPessoaisField } from "@/components/pacientes/detalhe/tabs/paciente-dados-pessoais-field"
import { Contact, LocateFixed, ShieldCheck, UserRound } from "lucide-react"

export function PacienteTabDadosPessoais() {
  const { personal } = usePatientDetailOutlet()

  return (
    <div className="col-span-12 flex flex-col gap-6">
      <div
        role="tabpanel"
        id="panel-dados_pessoais"
        aria-labelledby="tab-dados_pessoais"
        className="grid grid-cols-1 gap-6 lg:grid-cols-2"
      >
        <section className="rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-2 text-primary">
            <UserRound className="size-5" aria-hidden />
            <h3 className="font-headline text-lg font-bold text-primary">Informações Básicas</h3>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <DadosPessoaisField label="Nome Completo" value={personal.fullName} />
            <DadosPessoaisField label="CPF" value={personal.cpf} />
            <DadosPessoaisField label="Data de Nascimento" value={personal.birthDate} />
            <DadosPessoaisField label="Gênero" value={personal.gender} />
            <DadosPessoaisField label="Nome da Mãe" value={personal.motherName} className="md:col-span-2" />
          </div>
        </section>

        <section className="rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-2 text-primary">
            <Contact className="size-5" aria-hidden />
            <h3 className="font-headline text-lg font-bold text-primary">Contato</h3>
          </div>
          <div className="space-y-4">
            <DadosPessoaisField label="Email" value={personal.email} />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <DadosPessoaisField label="Telefone (WhatsApp)" value={personal.whatsappPhone} />
              <DadosPessoaisField
                label="Contato de Emergência"
                value={`${personal.emergencyContact} - ${personal.emergencyPhone}`}
              />
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-2 text-primary">
            <LocateFixed className="size-5" aria-hidden />
            <h3 className="font-headline text-lg font-bold text-primary">Endereço Completo</h3>
          </div>
          <div className="grid grid-cols-6 gap-4">
            <DadosPessoaisField label="Logradouro" value={personal.address.street} className="col-span-4" />
            <DadosPessoaisField label="Número" value={personal.address.number} className="col-span-2" />
            <DadosPessoaisField
              label="Complemento"
              value={personal.address.complement}
              className="col-span-3"
            />
            <DadosPessoaisField label="Bairro" value={personal.address.district} className="col-span-3" />
            <DadosPessoaisField label="Cidade" value={personal.address.city} className="col-span-2" />
            <DadosPessoaisField label="Estado" value={personal.address.state} className="col-span-2" />
            <DadosPessoaisField label="CEP" value={personal.address.zipCode} className="col-span-2" />
          </div>
        </section>

        <section className="rounded-xl border border-outline-variant/10 bg-surface-container-lowest p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-2 text-primary">
            <ShieldCheck className="size-5" aria-hidden />
            <h3 className="font-headline text-lg font-bold text-primary">Convênio / Plano de Saúde</h3>
          </div>
          <div className="rounded-lg border border-outline-variant/10 bg-surface-container-high p-4">
            <div className="space-y-4">
              <DadosPessoaisField label="Nome do Plano" value={personal.insurance.planName} />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <DadosPessoaisField label="Número da Carteirinha" value={personal.insurance.cardNumber} />
                <DadosPessoaisField label="Validade" value={personal.insurance.validUntil} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

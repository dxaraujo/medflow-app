export type PatientStatus = "ativo" | "em_pausa" | "inativo"

export type PatientRow = {
  id: string
  displayId: string
  name: string
  avatarUrl: string
  lastConsultLabel: string
  phone: string
  status: PatientStatus
}

export const PATIENTS_TOTAL_DIRECTORY = 1284

export const PATIENTS_MOCK: PatientRow[] = [
  {
    id: "84920",
    displayId: "#84920",
    name: "Helena Silveira de Souza",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB6dZIN9yEUne1WmcW46cOuMyYVxDcxIl6P9NyXQNQkNbrEQyebZ8L7N_rA1iznvJ1brR3zkaJ1YdCueuwPkocw3v04OxCuDGtuc6G7OhuLzZHVBcfbZDRnQIy75cCgWf1vh8LUUoomdOstdUVbwsbaKv8OGEJ6mDQZvv2xFo5w2QdrG2a3ePRT8kJb9Bzrn4f82YgsKh1bfzNQEPQGvt6vqpC6SdnUfrvf0JX9iVswdIjoISHv7pmlcsmDD_z-z0It9mN_aBnfPjE",
    lastConsultLabel: "12 Out, 2023",
    phone: "(11) 98765-4321",
    status: "ativo",
  },
  {
    id: "84921",
    displayId: "#84921",
    name: "Ricardo Mendonça Costa",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCzbsxmibbyJQygG65QIoNLofkYSX7d_5A7l641W1z2NTX3LZ0Z8ELX4sZddmvVnOg175aq8h5jWQR1SmsMlh8qeb9jZpDHwE6-wMYAlS8Rmh_JkvpgitU-RgTiIsqNAQXE4-MALDeR7XyH3zH6VAXK0r6jBOHkhABfGwM04r9Jip69qKxg-BzNe9uPgnnwi3F19yNoIUZNyaRvG1YFdKpZ3lGdZpdzbJ0nXGdnGQ0-7r1qtkOTYFVKcatuaiXRYvDoJbxJLgGbZIo",
    lastConsultLabel: "05 Out, 2023",
    phone: "(21) 97654-3210",
    status: "em_pausa",
  },
  {
    id: "84922",
    displayId: "#84922",
    name: "Beatriz Helena Fonseca",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBcMwu-Ts287bSqpthVgo8_sSYYUQ6ZdhMAVEgOPtorGq6URh2J2lCC_iN7kLjYl3fARIdJrNxcv6JUuxioJiiGxRL3zYN8sJsGuSP1PFn2_nDALBLrTTotLSdQKlr8hag8SEpy0BJrpjNynInn6Z1IPM_tjgYO_nJr_Mzel0uaseQQa9GbtHWcX2Abg8IdZY3OzktnTUviNB4TAua6cOqUSJ4XdqhgPJ7_P6v3zV-D-Zqgj9k1jqhS-Mrq3yWsahn_Q1ZlZjfR1rg",
    lastConsultLabel: "28 Set, 2023",
    phone: "(31) 91234-5678",
    status: "ativo",
  },
  {
    id: "84923",
    displayId: "#84923",
    name: "Luísa Martins Albuquerque",
    avatarUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCxw1QQjbIf5JUmuouO_5W1Bw93OK24HIz2gp4y56JwQjSQmO0oSjUMruQMNIhCZAdaPrkQqf9EVmxn2uzSSWpdnd0MamwWrB0XjEaXOrHM4VYXTLqRpRZqkLObBW7ykfq8Q02VNO7Ue2_HU7VOkh_uzVcvbnb_kbk_gSJWJ5kUikKzAZDZgmm5MkSc5VKmydUeRIvaIvC6yn5l2CuALAbYbCwAw0sV9jqtC6iAr2uSlu9GMR1P3eaL0WzFpzaHxN2DldQv8eB6Pmw",
    lastConsultLabel: "15 Set, 2023",
    phone: "(11) 95555-4444",
    status: "inativo",
  },
]

# Medflow

Monorepo **pnpm** com frontend React (Vite) em `apps/web` e API **NestJS** + **MongoDB** em `apps/api`.

## Desenvolvimento local

1. Suba o MongoDB (ex.: `docker compose up -d mongo`).
2. Popule o banco: `pnpm seed` (usa `MONGODB_URI`, por padrão `mongodb://127.0.0.1:27017`; banco `medflow` via `MONGODB_DB_NAME`).
3. Terminal 1: `pnpm dev:api`
4. Terminal 2: `pnpm dev:web` — o Vite faz proxy de `/api` para `http://127.0.0.1:3000`.

Ou em um único processo: `pnpm dev`.

## Docker Compose (app completa)

Com o Docker em execução:

```bash
docker compose up -d --build
```

Com o Mongo exposto em `localhost:27017`, popule os dados no host:  
`MONGODB_URI=mongodb://127.0.0.1:27017 pnpm seed`

Abra **http://localhost:8080** — o Nginx serve o frontend e encaminha `/api/*` para o serviço `api`.

Imagens Docker: um único [`docker/Dockerfile`](docker/Dockerfile) com targets `api` e `web`; o estágio `workspace_deps` instala o workspace pnpm uma vez (cache compartilhado). Cada target só incorpora o código do respetivo app (`apps/api` ou `apps/web`).

- **MongoDB**: porta `27017` no host (para depuração).
- **API**: apenas na rede interna do Compose (porta 3000).
- **Web**: `8080` → `80` no container.

Variáveis úteis da API: `MONGODB_URI` (se omitida em dev local, usa `mongodb://127.0.0.1:27017`), `MONGODB_DB_NAME` (padrão `medflow`), `PORT`.

## Scripts na raiz

| Script        | Descrição              |
| ------------- | ---------------------- |
| `pnpm dev`    | Web + API em paralelo  |
| `pnpm dev:web`| Somente Vite           |
| `pnpm dev:api`| Somente NestJS         |
| `pnpm build`  | Build web e API        |
| `pnpm seed`   | Seed do Mongo (via API)|

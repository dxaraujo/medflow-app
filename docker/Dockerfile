# syntax=docker/dockerfile:1
# Monorepo: context = repositório raiz (.) — estágio `workspace_deps` compartilhado entre api e web (cache Docker).
#
#   docker build -f docker/Dockerfile --target api .
#   docker build -f docker/Dockerfile --target web .

FROM node:22-alpine AS workspace_deps
RUN corepack enable pnpm
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
RUN pnpm install --frozen-lockfile

# --- API: só código e build em apps/api ---
FROM workspace_deps AS api_build
COPY apps/api apps/api
RUN pnpm --filter api build

FROM node:22-alpine AS api
RUN corepack enable pnpm
WORKDIR /app
COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY apps/api/package.json apps/api/
COPY apps/web/package.json apps/web/
RUN pnpm install --frozen-lockfile --filter api --prod
COPY --from=api_build /app/apps/api/dist /app/apps/api/dist
WORKDIR /app/apps/api
ENV NODE_ENV=production
EXPOSE 3000
HEALTHCHECK --interval=10s --timeout=5s --start-period=5s --retries=5 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/health').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "dist/main.js"]

# --- Web: só código e build em apps/web ---
FROM workspace_deps AS web_build
COPY apps/web apps/web
RUN pnpm --filter web build

FROM nginx:alpine AS web
COPY apps/web/nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=web_build /app/apps/web/dist /usr/share/nginx/html
EXPOSE 80

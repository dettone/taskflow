# TaskFlow

Plataforma colaborativa de projetos e tarefas (boards kanban com tempo real), construída como
projeto de portfólio full stack.

> **Status:** Marco 0 concluído (fundação). Veja o [roadmap](docs/architecture.md#roadmap).

## Stack

| Camada     | Tecnologia                                          |
| ---------- | --------------------------------------------------- |
| Front      | React 18, TypeScript, Vite, Vitest                  |
| API        | NestJS 11, TypeScript, Jest + Supertest             |
| Banco      | PostgreSQL 16                                       |
| Mensageria | RabbitMQ 3.13                                       |
| Qualidade  | ESLint, Prettier, Husky, commitlint, GitHub Actions |

## Estrutura

```
taskflow/
├── apps/
│   ├── api/        # NestJS (monólito modular)
│   └── web/        # React + Vite
├── docs/           # arquitetura e ADRs
├── docker-compose.yml
└── .github/workflows/ci.yml
```

## Pré-requisitos

- Node.js 20+ (`nvm use` lê o `.nvmrc`)
- pnpm 9 (`corepack enable` já resolve)
- Docker + Docker Compose

## Começando

```bash
cp .env.example .env     # ajuste se necessário
pnpm install
pnpm infra:up            # sobe Postgres e RabbitMQ
pnpm dev                 # API em :3000 e Web em :5173
```

Verifique:

- API: http://localhost:3000/health
- Web: http://localhost:5173 (deve exibir "API online")
- RabbitMQ Management: http://localhost:15672 (usuário/senha: `taskflow`)

## Scripts

| Comando              | O que faz                        |
| -------------------- | -------------------------------- |
| `pnpm dev`           | API e Web em modo watch          |
| `pnpm build`         | Build de todos os apps           |
| `pnpm test`          | Testes de todos os apps          |
| `pnpm lint`          | ESLint em todo o repositório     |
| `pnpm format`        | Prettier em todo o repositório   |
| `pnpm typecheck`     | Checagem de tipos                |
| `pnpm infra:up/down` | Sobe/derruba Postgres e RabbitMQ |
| `pnpm infra:reset`   | Derruba e apaga os volumes       |

## Convenção de commits

[Conventional Commits](https://www.conventionalcommits.org/), validados pelo commitlint:

```
feat(api): adiciona registro de usuário
fix(web): corrige flicker ao mover card
docs: atualiza roadmap
```

Escopos sugeridos: `api`, `web`, `infra`, `ci`, `docs`, `deps`, `repo`.

## Documentação

- [Arquitetura](docs/architecture.md)
- [ADR 0001 — Monólito modular](docs/adr/0001-modular-monolith.md)

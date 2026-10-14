# Arquitetura

## Visão geral

O TaskFlow é um **monólito modular** (NestJS) com front React e mensageria via RabbitMQ para
trabalho assíncrono. A decisão está registrada em [ADR 0001](adr/0001-modular-monolith.md).

```mermaid
flowchart LR
  Web[React SPA] -- REST --> API
  Web <-- WebSocket --> API
  subgraph API[API NestJS - monólito modular]
    direction TB
    auth --- workspaces --- boards --- cards --- comments --- notifications
  end
  API -- SQL --> PG[(PostgreSQL)]
  API -- publica eventos --> MQ{{RabbitMQ}}
  MQ --> W1[Worker: activity log]
  MQ --> W2[Worker: notificações]
  MQ --> W3[Worker: e-mail]
  W2 --> API
```

## Estado atual (Marco 0)

Apenas a fundação existe: monorepo, infraestrutura local (Postgres + RabbitMQ), CI e um endpoint
`GET /health` consumido pelo front. Os módulos de domínio entram nos marcos seguintes.

## Roadmap

| Marco | Tema                           | Status |
| ----- | ------------------------------ | ------ |
| 0     | Fundação                       | ✅     |
| 1     | Autenticação                   | ⬜     |
| 2     | Workspaces e permissões        | ⬜     |
| 3     | Boards, colunas e cards        | ⬜     |
| 4     | Tempo real (WebSocket)         | ⬜     |
| 5     | RabbitMQ e processamento async | ⬜     |
| 6     | Qualidade e entrega            | ⬜     |

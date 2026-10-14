# ADR 0001 — Monólito modular em vez de microsserviços

- **Status:** aceita
- **Data:** 2026-10-14

## Contexto

O TaskFlow é um projeto de portfólio com um único desenvolvedor. O domínio (workspaces, boards,
cards, comentários, notificações) é coeso e ainda está em descoberta.

## Decisão

Uma única aplicação NestJS organizada em módulos com fronteiras claras. Trabalho assíncrono
(activity log, notificações, e-mail) roda em workers consumindo filas do RabbitMQ.

## Consequências

- **+** Deploy, debug e testes simples; transações locais no PostgreSQL.
- **+** Fronteiras de módulo permitem extrair serviços depois, se houver necessidade real.
- **−** Escala de forma conjunta; um módulo problemático pode afetar os demais.
- **Regra:** módulos só conversam por interfaces públicas ou eventos de domínio, nunca acessando
  tabelas uns dos outros.

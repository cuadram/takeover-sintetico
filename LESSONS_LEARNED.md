# LESSONS LEARNED — facturaflow

> Generado: 2026-04-24T13:03:43.111Z | Total: 81 LAs
> LAs proyecto: 1 | LAs SOFIA-CORE integradas: 80

## LAs del Proyecto

### LA-TO-001-01 · governance/git

**Descripción:** Los tres proyectos gobernados (BankPortal, ExperisTracker, TakeOverSintetico) iniciaron sin un modelo de ramas git definido ni repositorios remotos configurados. BankPortal acumuló 11 ramas feature huérfanas nunca mergeadas a develop ni main; Sprint 23 se ejecutó sobre rama de Sprint 15. ExperisTracker trabajó directamente en main durante 3 sprints sin rama feature. TakeOverSintetico careció de git init durante toda la fase de Takeover Sprint 0. Resultado: main y develop desactualizados en todos los proyectos, trazabilidad remota nula y commits de sprints activos sobre ramas incorrectas.

**Corrección:** REGLA PERMANENTE: al inicializar cualquier proyecto SOFIA, el primer paso obligatorio es (1) git init, (2) crear estructura main+develop, (3) push a remote. Cada sprint crea rama feature/FEAT-XXX-sprintYY desde develop. Al cerrar sprint: merge --no-ff feature → develop → push. Al crear release: merge --no-ff develop → main + tag vX.Y.0 → push. El branching model debe verificarse en Gate 1 (Setup) como precondición bloqueante.

_Registrada: 2026-04-11T14:19:28.899Z_

---

## LAs SOFIA-CORE Integradas

> Estas LAs han sido promovidas desde otros proyectos y aprobadas por el PO.
> Son de aplicación obligatoria en todos los proyectos SOFIA.

### LA-CORE-001 · process ⭐ CORE

**Descripción:** MCP config merge sin sobreescribir claude_desktop_config.json

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.161Z_

---

### LA-CORE-002 · devops ⭐ CORE

**Descripción:** realpath() en paths MCP, nunca aliases macOS

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-003 · process ⭐ CORE

**Descripción:** SOFIA_REPO en CLAUDE.md + GR-CORE-003

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-004 · process ⭐ CORE

**Descripción:** repo-template estructura canónica docs/ en onboarding

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-005 · process ⭐ CORE

**Descripción:** verify-persistence.js BLOQUEANTE, GR-013

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-006 · process ⭐ CORE

**Descripción:** FA documento único incremental, LA-FA-INCR

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-007 · ux ⭐ CORE

**Descripción:** TOC clickable con w:hyperlink+w:anchor, LA-TOC-CLICK

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-008 · onboarding ⭐ CORE

**Descripción:** wizard v2.6.11 verifica scripts críticos + inicializa FA-Agent

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-009 · ux ⭐ CORE

**Descripción:** Prototipo incremental, GR-014

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-010 · process ⭐ CORE

**Descripción:** Patch First ante correcciones, GR-015

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-011 · ux ⭐ CORE

**Descripción:** Verificar matriz de roles antes de construir navegación

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-012 · infrastructure ⭐ CORE

**Descripción:** sofia-shell PROJECT_ROOT dinámico por llamada (v2.0)

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-013 · architecture ⭐ CORE

**Descripción:** Application handlers NO importan Infrastructure, GR-016

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-014 · infrastructure ⭐ CORE

**Descripción:** MCP SDK en SOFIA-CORE, no en proyectos cliente (setup-shell-mcp.js)

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-015 · infrastructure ⭐ CORE

**Descripción:** sofia-shell aislamiento: registrar SOFIA-CORE como entry especial en projects.json

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-016 · dashboard ⭐ CORE

**Descripción:** org-baseline.json invisible en command center: leer en runtime, no hardcodear

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-017 · analysis ⭐ CORE

**Descripción:** ORG baseline: leer SOFIA_ORG_PATH canonico, nunca snapshot local del proyecto

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-018 · governance ⭐ CORE

**Descripción:** HITL obligatorio antes de persistir cualquier LA: aprobacion PO explicita

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-019 · governance ⭐ CORE

**Descripción:** COMPAT-001: clasificacion PATCH/MINOR/MAJOR obligatoria antes de aplicar cualquier cambio SOFIA-CORE

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-020 · governance ⭐ CORE

**Descripción:** COMPAT-002: session.json append-only; sin eliminacion ni cambio de tipo en campos existentes

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-021 · governance ⭐ CORE

**Descripción:** COMPAT-003: nuevos guardrails NO se activan en proyectos existentes sin upgrade explicito

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-022 · governance ⭐ CORE

**Descripción:** COMPAT-004: org-baseline.json con schema_version versionado; lector backward-compatible

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-023 · governance/takeover ⭐ CORE

**Descripción:** DTS obligatorio para toda documentacion cliente antes de T-3 FA Reverse; GR-CORE-023

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-024 · governance/takeover ⭐ CORE

**Descripción:** triangulacion obligatoria contra codigo para afirmaciones con DTS < 0.8; GR-CORE-024

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-025 · governance/takeover ⭐ CORE

**Descripción:** Gate GT-3 BLOQUEANTE hasta resolucion documentada de todos los flags DISCREPANCY; GR-CORE-025

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-026 · governance ⭐ CORE

**Descripción:** CONTEXT-ISOLATION: sesion SOFIA-CORE vs proyectos gobernados son contextos mutuamente excluyentes. GR-CORE-026

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-027 · takeover/planning ⭐ CORE

**Descripción:** T-5 reconcilia con T-4: items S1 postpuestos documentados explicitamente con justificacion antes de cerrar GT-5

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-028 · takeover/process ⭐ CORE

**Descripción:** NEEDS-VALIDATION de T-3 generan entradas estructuradas en session.json.needs_validation[] con sprint_target y assignee

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-029 · takeover/process ⭐ CORE

**Descripción:** BUILD_UNKNOWN en T-2 genera DEBT-TK automatico verify-build-day1 (0.5 SP, sprint S1, mandatory:true)

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-030 · takeover/process ⭐ CORE

**Descripción:** T-5 cierre Sprint 0 sigue checklist BLOQUEANTE: sprint_closed → log → dashboard. GR-CORE-027

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-031 · takeover/governance ⭐ CORE

**Descripción:** cmmi_l3_sprint_estimated calculado mecanicamente desde PA_scores de T-4; T-5 consume el valor, nunca lo recalcula independientemente

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-032 · takeover/governance ⭐ CORE

**Descripción:** open_debts incluye campo compliance:true para deudas legales/regulatorias (AEAT, GDPR, PCI-DSS); activa logica diferente en guardrails

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-023-01 · frontend ⭐ CORE

**Descripción:** desde bank-portal Sprint 23 — En componentes Angular, usar [href] nativo en enlaces internos causa full page r

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-033 · governance ⭐ CORE

**Descripción:** desde bank-portal Sprint 23 — Al ejecutar la-sync.js (GR-CORE-029), el Orchestrator aplicó el sync solo en los

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.31 · Importada: 2026-04-07T12:11:06.796Z_

---

### LA-CORE-035 · takeover/process ⭐ CORE

**Descripción:** T-3 FA Reverse Agent no generaba entregables explicativos orientados a equipo/negocio. Solo producia artefactos internos del pipeline.

**Corrección:** T-3 debe producir ademas T3-FUNCTIONAL-DESCRIPTION.md + T3-FUNCTIONAL-DESCRIPTION.docx. El .docx se deposita manualmente por el operador tras descarga. Ruta canonica: docs/functional-analysis/

_SOFIA-CORE v2.7 · Importada: 2026-04-10T02:00:00Z_

---

### LA-CORE-036 · infrastructure ⭐ CORE

**Descripción:** Binarios generados en contenedor Claude no pueden escribirse directamente en SOFIA_REPO. Base64 como puente de escritura es antipatron prohibido.

**Corrección:** Flujo canonico: generar binario → present_files → operador descarga → operador deposita en SOFIA_REPO. Documentar paso en checklist de cierre de steps que produzcan binarios.

_SOFIA-CORE v2.7 · Importada: 2026-04-10T02:00:00Z_

---

### LA-CORE-034 · governance ⭐ CORE

**Descripción:** CONTEXT-ISOLATION enforcement: en sesion SOFIA-CORE Continuar=framework; NUNCA leer session.json proyectos; contexto ambiguo=PREGUNTAR (refuerza GR-CORE-026)

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.37 · Importada: 2026-04-12T17:47:31.944Z_

---

### LA-CORE-037 · dashboard ⭐ CORE

**Descripción:** datos del dashboard SIEMPRE desde session.json en disco de cada proyecto registrado; nunca desde memoria o conversación anterior

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.37 · Importada: 2026-04-12T17:47:31.944Z_

---

### LA-CORE-038 · testing/configuration ⭐ CORE

**Descripción:** Audit @Value sin default obligatorio antes de crear perfil IT; grep exhaustivo previo a primera ejecucion

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.40 · Importada: 2026-04-16T05:16:48.143Z_

---

### LA-CORE-039 · testing/design ⭐ CORE

**Descripción:** Fixtures idempotentes ON CONFLICT DO NOTHING con UUIDs fijos para ITs con FK constraints; patron BizumIntegrationTestBase

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.40 · Importada: 2026-04-16T05:16:48.143Z_

---

### LA-CORE-040 · testing/jpa ⭐ CORE

**Descripción:** Bulk JPQL UPDATE bypassa Hibernate first-level cache; em.flush()+em.clear() obligatorio antes de findById() en tests @Transactional

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.40 · Importada: 2026-04-16T05:16:48.143Z_

---

### LA-CORE-041 · process/frontend ⭐ CORE

**Descripción:** Developer Agent debe leer prototipo HTML pantalla a pantalla ANTES de escribir template Angular; verificación previa, no reactiva

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.40 · Importada: 2026-04-16T05:16:48.143Z_

---

### LA-CORE-042 · process/frontend ⭐ CORE

**Descripción:** Auditar model.ts + service.ts + component.ts antes de escribir template Angular; solo referenciar lo que existe en el .ts

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.40 · Importada: 2026-04-16T05:16:48.143Z_

---

### LA-CORE-043 · process/governance ⭐ CORE

**Descripción:** LA-023-02 fidelidad prototipo aplica en G-4 como checklist BLOQUEANTE de entrada, no como corrección reactiva tras despliegue

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.40 · Importada: 2026-04-16T05:16:48.143Z_

---

### LA-CORE-044 · process/devops ⭐ CORE

**Descripción:** DevOps Agent Step 7 debe publicar Runbook MD en docs/runbooks/ como entrega BLOQUEANTE en G-7

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.40 · Importada: 2026-04-16T05:16:48.143Z_

---

### LA-CORE-045 · process/documentation ⭐ CORE

**Descripción:** Documentation Agent Step 8 debe sincronizar MD fuente a rutas canonicas docs/releases/ y docs/runbooks/; audit CMMI L3 obligatorio antes de declarar step completo

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.40 · Importada: 2026-04-16T05:16:48.143Z_

---

### LA-CORE-046 · process/governance ⭐ CORE

**Descripción:** Step 9 Workflow Manager: sincronizacion Jira con JQL completo del sprint, nunca rango fijo de keys; checklist G-9 bloqueante: 0 issues fuera de Finalizada

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.41 · Importada: 2026-04-16T12:48:20.096Z_

---

### LA-CORE-047 · process/dashboard ⭐ CORE

**Descripción:** Orchestrator invoca gen-global-dashboard.js tras CADA gate como parte atomica del protocolo de aprobacion; GR-011 bloqueante verificado en guardrail-pre-gate.js; sin excepcion por velocidad del pipeline

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.42 · Importada: 2026-04-16T12:48:20.096Z_

---

### LA-CORE-048 · process/governance ⭐ CORE

**Descripción:** Gate no persistido atomicamente + validate-fa-index CHECK 8 usaba idx.last_feat en lugar de session.current_feature + FA-Agent omitia campo feat en funcionalidades nuevas

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.43 · Importada: 2026-04-16T12:48:20.096Z_

---

### LA-025-02 · process/fa-agent ⭐ CORE

**Descripción:** Step 2b debe invocar gen-fa-document.py para actualizar el FA Word consolidado además de actualizar fa-index.json y ejecutar validate-fa-index. El .docx es el entregable formal del FA-Agent en Gate 2b. Detectado en 3 proyectos: BankPortal S25 (solo draft .md, sin docx), ExperisTracker (docx actualizado en 8b no en 2b), TakeOverSintetico (FA global inexistente, Sprint 1 sin consolidar).

**Corrección:** REGLA PERMANENTE: Step 2b checklist obligatorio: (1) actualizar fa-index.json con funcionalidades+BRs de la feature activa con campo feat, (2) validate-fa-index PASS 8/8, (3) invocar gen-fa-document.py → .docx actualizado, (4) registrar los 3 en artifacts[2b_sNN]. El .docx es BLOQUEANTE para Gate G-2b — sin él el gate no se aprueba.

_SOFIA-CORE v? · Importada: ?_

---

### LA-CORE-049 · process/fa-agent ⭐ CORE

**Descripción:** Step 2b gen-fa-document.py OBLIGATORIO actualizacion FA Word consolidado cada sprint; G-2b bloqueante sin docx

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.45 · Importada: 2026-04-16T14:45:33.116Z_

---

### LA-CORE-050 · ux/process ⭐ CORE

**Descripción:** PASO 0 herencia prototipo sprint-a-sprint obligatoria; cp archivo anterior + verificacion token portal real bloqueante G-2c

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.45 · Importada: 2026-04-16T14:45:33.116Z_

---

### LA-CORE-051 · process/governance ⭐ CORE

**Descripción:** current_step y pipeline_step escritura atomica obligatoria en cada gate; gate_pending solo valores canonicos GATE_ROLES — valores inventados rompen dashboard

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.47 · Importada: 2026-04-16T17:58:40.384Z_

---

### LA-025-01 · process/governance ⭐ CORE

**Descripción:** desde bank-portal Sprint 25 — Gate G-2 Sprint 25 aprobado explícitamente por el PO pero no persistido en sessi

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.52 · Importada: 2026-04-16T18:07:37.196Z_

---

### LA-025-03 · ux/process ⭐ CORE

**Descripción:** desde bank-portal Sprint 25 — UX/UI Designer Agent generó PROTO-FEAT-023-sprint25 desde el scaffold genérico d

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.52 · Importada: 2026-04-16T18:07:37.196Z_

---

### LA-025-04 · process/governance ⭐ CORE

**Descripción:** desde bank-portal Sprint 25 — current_step en session.json no se actualizaba al avanzar entre steps — quedó en

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.52 · Importada: 2026-04-16T18:07:37.196Z_

---

### LA-CORE-052 · process/governance ⭐ CORE

**Descripción:** Orchestrator no puede auto-aprobar LAs en session.json — la-promote.js + sofia-contribute.py --accept son BLOQUEANTES antes de approved_by; bypasear GR-CORE-028 deja la-promotion-log.json desactualizado e invisible al PO

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.52 · Importada: 2026-04-16T18:07:37.196Z_

---

### LA-CORE-053 · backend/jdbc ⭐ CORE

**Descripción:** schema-drift-sql-native: verificar nombres de columna de tablas previas con \d tabla o Flyway migration antes de escribir queries SQL nativas. GR-SQL-001 en G-4b.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.52 · Importada: 2026-04-16T21:24:09.034Z_

---

### LA-CORE-054 · backend/jdbc ⭐ CORE

**Descripción:** instant-timestamptz-binding: JdbcClient no puede bindear Instant directo a TIMESTAMPTZ. Usar Timestamp.from(instant). GR-JDBC-001 en G-4b. Complementa LA-019-13.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.52 · Importada: 2026-04-16T21:24:09.034Z_

---

### LA-CORE-055 · frontend/angular ⭐ CORE

**Descripción:** sign-contract-backend: backend devuelve CARGO con signo negativo; frontend aplica Math.abs() en todos los mapeos. Documentar en LLD. Mocks con valores negativos. GR-API-001 en G-4b.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.52 · Importada: 2026-04-16T21:24:09.034Z_

---

### LA-CORE-056 · frontend/process ⭐ CORE

**Descripción:** prototype-fidelity-visual-review: 36 bugs por no leer prototipo pantalla a pantalla. Checklist fidelidad BLOQUEANTE en G-4 para cada pantalla. PO hace screenshot comparison antes de G-4b. Refuerza LA-CORE-041/043.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.52 · Importada: 2026-04-16T21:24:09.034Z_

---

### LA-CORE-057 · frontend/angular ⭐ CORE

**Descripción:** select-twoway-binding-reset: (change) unidireccional no sincroniza DOM en reset programático. Usar [(ngModel)] + FormsModule en controles con reset. GR-ANGULAR-001 en G-4.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.52 · Importada: 2026-04-16T21:24:09.034Z_

---

### LA-025-09 · process/tooling ⭐ CORE

**Descripción:** desde bank-portal Sprint 25 — .sofia/scripts/gen-global-dashboard.js espera session.completed_steps como Array

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.61 · Importada: 2026-04-21T05:37:38.854Z_

---

### LA-025-10 · process/tooling ⭐ CORE

**Descripción:** desde bank-portal Sprint 25 — Las herramientas MCP Atlassian disponibles (searchJiraIssuesUsingJql, getJiraIss

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.61 · Importada: 2026-04-21T05:37:38.854Z_

---

### LA-025-12 · process/governance/git ⭐ CORE

**Descripción:** desde bank-portal Sprint 25 — SOFIA ejecutó una sesión de arranque completa (lectura session.json, skill loade

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.61 · Importada: 2026-04-21T05:37:38.854Z_

---

### LA-CORE-058 · infrastructure/governance ⭐ CORE

**Descripción:** repo-redundancy-via-github-not-onedrive: sistemas críticos SOFIA no pueden depender de OneDrive como única copia redundada. Remote git obligatorio para Tipo S (framework) y Tipo A (flujo git intensivo). OneDrive es sync, no backup transaccional. GR-INFRA-001.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.61 · Importada: 2026-04-21T05:37:38.854Z_

---

### LA-CORE-059 · process/tooling ⭐ CORE

**Descripción:** dashboard-completed-steps-schema: gen-global-dashboard.js asume Array en session.completed_steps pero el schema real es {sprint, feature, steps:[]}; normalizar al cargar. Bug cosmético adicional: banner concatena GATE-${step} cuando step ya es G-N (produce GATE-G-8). Refactor + tests de regresión. GR-DASH-002.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.61 · Importada: 2026-04-21T05:37:38.854Z_

---

### LA-CORE-060 · process/tooling ⭐ CORE

**Descripción:** mcp-atlassian-sprint-lifecycle-gap: las herramientas MCP Atlassian (searchJiraIssues, transitionJiraIssue) no exponen endpoints para abrir/cerrar sprints. Step 9 Workflow Manager debe registrar acción manual pendiente en Jira UI cuando MCP no cubre sprint lifecycle. GR-ATLASSIAN-001.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.61 · Importada: 2026-04-21T05:37:38.854Z_

---

### LA-CORE-061 · process/governance/git ⭐ CORE

**Descripción:** working-tree-git-divergence-undetected: Orchestrator arrancó sesión completa sin detectar 842 ficheros borrados del working tree. Añadir PASO 0 de verificación de integridad: git status --porcelain | grep '^ D' | wc -l; si > 0, bloquear. Verificar existencia de pom.xml/package.json. Registrar hash HEAD en sofia.log al arrancar. GR-GIT-001.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.61 · Importada: 2026-04-21T05:37:38.854Z_

---

### LA-CORE-062 · process/tooling - session-sprint-history-schema-drift: schema dict vs list en sprint_history incompatible entre proyectos - patron defensivo obligatorio ⭐ CORE

**Descripción:** 

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.68 · Importada: 2026-04-23T06:40:04.607Z_

---

### LA-CORE-063 · process/tooling - session-json-falsy-and-schema-derivation: dos bugs defensivos (sprint=0 falsy + process_areas ausente) en consumidores de session.json - patron hermano de LA-CORE-062 ⭐ CORE

**Descripción:** 

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.68 · Importada: 2026-04-23T06:40:04.607Z_

---

### LA-CORE-064 · qa/devops/process ⭐ CORE

**Descripción:** smoke-test-references-non-existent-endpoint: smoke test aprobado en G-7 con check contra PUT /api/v1/pfm/budgets/{id}/alert (endpoint inexistente en PfmController). 2 defectos hermanos: SM-05 leia id vs accountId, SM-09 no aceptaba 409 en re-ejecucion. Corregido via grep cruzado URL-vs-@RequestMapping obligatorio pre-G-7. GR-SMOKE-001.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.68 · Importada: 2026-04-23T06:40:04.607Z_

---

### LA-CORE-065 · process/governance/audit ⭐ CORE

**Descripción:** gate-history-mixes-pending-and-approved: gate_history mezcla gates HITL aprobados con marcadores -pending del dashboard. Refactor a gate_history (aprobados) + gate_history_pending (intermedios). Eliminar duplicados por clave gate+sprint+step. GR-AUDIT-001.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.68 · Importada: 2026-04-23T06:40:04.607Z_

---

### LA-CORE-066 · process/governance/cmmi ⭐ CORE

**Descripción:** cmmi-process-areas-incomplete-declaration: session.cmmi declaraba 9 PAs vs 16 canonicas L3. Schema obligatorio {project:[9], org:[4], engineering:[3], coverage_strategy, coverage_matrix_path}. Crear docs/cmmi/CMMI-COVERAGE-MATRIX.md mantenida en Step 9. GR-CMMI-001 bloquea G-9 si incompleto.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.68 · Importada: 2026-04-23T06:40:04.607Z_

---

### LA-CORE-067 · tooling/mcp/recovery ⭐ CORE

**Descripción:** mcp-shell-stdio-buffer-limit-large-payloads: MCP shell timeout en payloads >16KB como argumento. Patron: fs.appendFileSync en bloques <=6KB para artefactos >8KB. Helper write-large-artifact.js opcional. GR-MCP-001.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.68 · Importada: 2026-04-23T06:40:04.607Z_

---

### LA-CORE-068 · frontend/angular - nunca usar [href] nativo para navegacion interna en Angular (causa full page reload + ShellComponent desaparece). Usar router.navigateByUrl() para URLs dinamicas o [routerLink] para estaticas. Seeds de notificaciones deben referenciar SOLO rutas registradas en app-routing.module.ts. Checklist G-4/G-5 bloqueante: grep -r '[href]' src/app/features/ (GR-ANGULAR-HREF-001). ⭐ CORE

**Descripción:** 

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.68 · Importada: 2026-04-23T06:40:04.607Z_

---

### LA-CORE-070 · takeover/process - T-3 FA Reverse Agent debe producir T3-FUNCTIONAL-DESCRIPTION.md + T3-FUNCTIONAL-DESCRIPTION.docx como entregables explicativos del sistema heredado, ademas de los artefactos internos del pipeline (fa-index.json, fa-baseline, etc.). Sin estos entregables, el analisis funcional no queda accesible fuera del pipeline. ⭐ CORE

**Descripción:** 

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.68 · Importada: 2026-04-23T06:40:04.607Z_

---

### LA-CORE-071 · process/governance ⭐ CORE

**Descripción:** desde SOFIA-CORE Sprint 1 (orig LA-001-09) — En Sprint S01 Mini A Step 9, el Orchestrator ejecuto la secuencia de cierre form

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.3 · Importada: 2026-04-24T13:03:43.102Z_

---

### LA-CORE-072 · process/tooling ⭐ CORE

**Descripción:** desde SOFIA-CORE Sprint 1 (orig LA-001-03) — En Sprint S01 Mini A Step 6 Fase 2 (propagacion de LAs reformateadas H3->H2 a lo

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.3 · Importada: 2026-04-24T13:03:43.102Z_

---

### LA-CORE-073 · process/atomicity ⭐ CORE

**Descripción:** desde SOFIA-CORE Sprint 1 (orig LA-001-04) — En Sprint S01 Mini A Step 6, tras transicionar las issues SC-13 y SC-14 a estado

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.3 · Importada: 2026-04-24T13:03:43.102Z_

---


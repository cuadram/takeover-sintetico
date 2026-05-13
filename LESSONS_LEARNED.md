# LESSONS LEARNED — facturaflow

> Generado: 2026-05-13T08:22:04.939Z | Total: 105 LAs
> LAs proyecto: 1 | LAs SOFIA-CORE integradas: 104

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

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.746Z_

---

### LA-CORE-002 · devops ⭐ CORE

**Descripción:** realpath() en paths MCP, nunca aliases macOS

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.747Z_

---

### LA-CORE-003 · process ⭐ CORE

**Descripción:** SOFIA_REPO en CLAUDE.md + GR-CORE-003

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.747Z_

---

### LA-CORE-004 · process ⭐ CORE

**Descripción:** repo-template estructura canónica docs/ en onboarding

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.747Z_

---

### LA-CORE-005 · process ⭐ CORE

**Descripción:** verify-persistence.js BLOQUEANTE, GR-013

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.747Z_

---

### LA-CORE-006 · process ⭐ CORE

**Descripción:** FA documento único incremental, LA-FA-INCR

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.747Z_

---

### LA-CORE-007 · ux ⭐ CORE

**Descripción:** TOC clickable con w:hyperlink+w:anchor, LA-TOC-CLICK

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.747Z_

---

### LA-CORE-008 · onboarding ⭐ CORE

**Descripción:** wizard v2.6.11 verifica scripts críticos + inicializa FA-Agent

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.747Z_

---

### LA-CORE-009 · ux ⭐ CORE

**Descripción:** Prototipo incremental, GR-014

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.747Z_

---

### LA-CORE-010 · process ⭐ CORE

**Descripción:** Patch First ante correcciones, GR-015

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.747Z_

---

### LA-CORE-011 · ux ⭐ CORE

**Descripción:** Verificar matriz de roles antes de construir navegación

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.747Z_

---

### LA-CORE-012 · infrastructure ⭐ CORE

**Descripción:** sofia-shell PROJECT_ROOT dinámico por llamada (v2.0)

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.747Z_

---

### LA-CORE-013 · architecture ⭐ CORE

**Descripción:** Application handlers NO importan Infrastructure, GR-016

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.747Z_

---

### LA-CORE-014 · infrastructure ⭐ CORE

**Descripción:** MCP SDK en SOFIA-CORE, no en proyectos cliente (setup-shell-mcp.js)

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.747Z_

---

### LA-CORE-015 · infrastructure ⭐ CORE

**Descripción:** sofia-shell aislamiento: registrar SOFIA-CORE como entry especial en projects.json

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.747Z_

---

### LA-CORE-016 · dashboard ⭐ CORE

**Descripción:** org-baseline.json invisible en command center: leer en runtime, no hardcodear

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.747Z_

---

### LA-CORE-017 · analysis ⭐ CORE

**Descripción:** ORG baseline: leer SOFIA_ORG_PATH canonico, nunca snapshot local del proyecto

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.747Z_

---

### LA-CORE-018 · governance ⭐ CORE

**Descripción:** HITL obligatorio antes de persistir cualquier LA: aprobacion PO explicita

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.747Z_

---

### LA-CORE-019 · governance ⭐ CORE

**Descripción:** COMPAT-001: clasificacion PATCH/MINOR/MAJOR obligatoria antes de aplicar cualquier cambio SOFIA-CORE

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.747Z_

---

### LA-CORE-020 · governance ⭐ CORE

**Descripción:** COMPAT-002: session.json append-only; sin eliminacion ni cambio de tipo en campos existentes

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.747Z_

---

### LA-CORE-021 · governance ⭐ CORE

**Descripción:** COMPAT-003: nuevos guardrails NO se activan en proyectos existentes sin upgrade explicito

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.747Z_

---

### LA-CORE-022 · governance ⭐ CORE

**Descripción:** COMPAT-004: org-baseline.json con schema_version versionado; lector backward-compatible

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-023 · governance/takeover ⭐ CORE

**Descripción:** DTS obligatorio para toda documentacion cliente antes de T-3 FA Reverse; GR-CORE-023

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-024 · governance/takeover ⭐ CORE

**Descripción:** triangulacion obligatoria contra codigo para afirmaciones con DTS < 0.8; GR-CORE-024

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-025 · governance/takeover ⭐ CORE

**Descripción:** Gate GT-3 BLOQUEANTE hasta resolucion documentada de todos los flags DISCREPANCY; GR-CORE-025

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-026 · governance ⭐ CORE

**Descripción:** CONTEXT-ISOLATION: sesion SOFIA-CORE vs proyectos gobernados son contextos mutuamente excluyentes. GR-CORE-026

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-027 · takeover/planning ⭐ CORE

**Descripción:** T-5 reconcilia con T-4: items S1 postpuestos documentados explicitamente con justificacion antes de cerrar GT-5

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-028 · takeover/process ⭐ CORE

**Descripción:** NEEDS-VALIDATION de T-3 generan entradas estructuradas en session.json.needs_validation[] con sprint_target y assignee

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-029 · takeover/process ⭐ CORE

**Descripción:** BUILD_UNKNOWN en T-2 genera DEBT-TK automatico verify-build-day1 (0.5 SP, sprint S1, mandatory:true)

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-030 · takeover/process ⭐ CORE

**Descripción:** T-5 cierre Sprint 0 sigue checklist BLOQUEANTE: sprint_closed → log → dashboard. GR-CORE-027

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-031 · takeover/governance ⭐ CORE

**Descripción:** cmmi_l3_sprint_estimated calculado mecanicamente desde PA_scores de T-4; T-5 consume el valor, nunca lo recalcula independientemente

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-032 · takeover/governance ⭐ CORE

**Descripción:** open_debts incluye campo compliance:true para deudas legales/regulatorias (AEAT, GDPR, PCI-DSS); activa logica diferente en guardrails

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-023-01 · frontend ⭐ CORE

**Descripción:** desde bank-portal Sprint 23 — En componentes Angular, usar [href] nativo en enlaces internos causa full page r

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.6.29 · Importada: 2026-04-07T12:04:57.162Z_

---

### LA-CORE-033 · governance ⭐ CORE

**Descripción:** desde bank-portal Sprint 23 — Al ejecutar la-sync.js (GR-CORE-029), el Orchestrator aplicó el sync solo en los

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-035 · governance/git ⭐ CORE

**Descripción:** branching model SOFIA no aplicado desde inicio de proyecto -- deuda acumulada en BankPortal (11 ramas huerfanas), ExperisTracker (main directo 3 sprints), TakeOverSintetico (sin git init). REGLA: git init + main+develop + remote en Gate 1 obligatorio. Merge feature→develop por sprint, develop→main por release + tag.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-036 · infrastructure ⭐ CORE

**Descripción:** Binarios generados en contenedor Claude: flujo canonico = generate → present_files → operador descarga → deposita en SOFIA_REPO. filesystem:write_file solo texto plano. Base64 PROHIBIDO.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-034 · governance ⭐ CORE

**Descripción:** CONTEXT-ISOLATION enforcement: en sesion SOFIA-CORE Continuar=framework; NUNCA leer session.json proyectos; contexto ambiguo=PREGUNTAR (refuerza GR-CORE-026)

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-037 · dashboard ⭐ CORE

**Descripción:** datos del dashboard SIEMPRE desde session.json en disco de cada proyecto registrado; nunca desde memoria o conversación anterior

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-038 · testing/configuration ⭐ CORE

**Descripción:** Audit @Value sin default obligatorio antes de crear perfil IT; grep exhaustivo previo a primera ejecucion

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-039 · testing/design ⭐ CORE

**Descripción:** Fixtures idempotentes ON CONFLICT DO NOTHING con UUIDs fijos para ITs con FK constraints; patron BizumIntegrationTestBase

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-040 · testing/jpa ⭐ CORE

**Descripción:** Bulk JPQL UPDATE bypassa Hibernate first-level cache; em.flush()+em.clear() obligatorio antes de findById() en tests @Transactional

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-041 · process/frontend ⭐ CORE

**Descripción:** Developer Agent debe leer prototipo HTML pantalla a pantalla ANTES de escribir template Angular; verificación previa, no reactiva

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-042 · process/frontend ⭐ CORE

**Descripción:** Auditar model.ts + service.ts + component.ts antes de escribir template Angular; solo referenciar lo que existe en el .ts

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-043 · process/governance ⭐ CORE

**Descripción:** LA-023-02 fidelidad prototipo aplica en G-4 como checklist BLOQUEANTE de entrada, no como corrección reactiva tras despliegue

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-044 · process/devops ⭐ CORE

**Descripción:** DevOps Agent Step 7 debe publicar Runbook MD en docs/runbooks/ como entrega BLOQUEANTE en G-7

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-045 · process/documentation ⭐ CORE

**Descripción:** Documentation Agent Step 8 debe sincronizar MD fuente a rutas canonicas docs/releases/ y docs/runbooks/; audit CMMI L3 obligatorio antes de declarar step completo

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-046 · process/governance ⭐ CORE

**Descripción:** Step 9 Workflow Manager: sincronizacion Jira con JQL completo del sprint, nunca rango fijo de keys; checklist G-9 bloqueante: 0 issues fuera de Finalizada

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-047 · process/dashboard ⭐ CORE

**Descripción:** Orchestrator invoca gen-global-dashboard.js tras CADA gate como parte atomica del protocolo de aprobacion; GR-011 bloqueante verificado en guardrail-pre-gate.js; sin excepcion por velocidad del pipeline

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-048 · process/governance ⭐ CORE

**Descripción:** Gate persistencia atomica session.json + validate-fa-index CHECK 8 usa session.current_feature + FA feat field obligatorio

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-025-02 · process/fa-agent ⭐ CORE

**Descripción:** Step 2b debe invocar gen-fa-document.py para actualizar el FA Word consolidado además de actualizar fa-index.json y ejecutar validate-fa-index. El .docx es el entregable formal del FA-Agent en Gate 2b. Detectado en 3 proyectos: BankPortal S25 (solo draft .md, sin docx), ExperisTracker (docx actualizado en 8b no en 2b), TakeOverSintetico (FA global inexistente, Sprint 1 sin consolidar).

**Corrección:** REGLA PERMANENTE: Step 2b checklist obligatorio: (1) actualizar fa-index.json con funcionalidades+BRs de la feature activa con campo feat, (2) validate-fa-index PASS 8/8, (3) invocar gen-fa-document.py → .docx actualizado, (4) registrar los 3 en artifacts[2b_sNN]. El .docx es BLOQUEANTE para Gate G-2b — sin él el gate no se aprueba.

_SOFIA-CORE v? · Importada: ?_

---

### LA-CORE-049 · process/fa-agent ⭐ CORE

**Descripción:** Step 2b gen-fa-document.py OBLIGATORIO actualizacion FA Word consolidado cada sprint; G-2b bloqueante sin docx

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-050 · ux/process ⭐ CORE

**Descripción:** PASO 0 herencia prototipo sprint-a-sprint obligatoria; cp archivo anterior + verificacion token portal real bloqueante G-2c

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-051 · process/governance ⭐ CORE

**Descripción:** current_step y pipeline_step escritura atomica obligatoria en cada gate; gate_pending solo valores canonicos GATE_ROLES — valores inventados rompen dashboard

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

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

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-053 · backend/jdbc ⭐ CORE

**Descripción:** schema-drift-sql-native: verificar nombres de columna de tablas previas con \d tabla o Flyway migration antes de escribir queries SQL nativas. GR-SQL-001 en G-4b.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-054 · backend/jdbc ⭐ CORE

**Descripción:** instant-timestamptz-binding: JdbcClient no puede bindear Instant directo a TIMESTAMPTZ. Usar Timestamp.from(instant). GR-JDBC-001 en G-4b. Complementa LA-019-13.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-055 · frontend/angular ⭐ CORE

**Descripción:** sign-contract-backend: backend devuelve CARGO con signo negativo; frontend aplica Math.abs() en todos los mapeos. Documentar en LLD. Mocks con valores negativos. GR-API-001 en G-4b.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-056 · frontend/process ⭐ CORE

**Descripción:** prototype-fidelity-visual-review: 36 bugs por no leer prototipo pantalla a pantalla. Checklist fidelidad BLOQUEANTE en G-4 para cada pantalla. PO hace screenshot comparison antes de G-4b. Refuerza LA-CORE-041/043.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-057 · frontend/angular ⭐ CORE

**Descripción:** select-twoway-binding-reset: (change) unidireccional no sincroniza DOM en reset programático. Usar [(ngModel)] + FormsModule en controles con reset. GR-ANGULAR-001 en G-4.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

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

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-059 · process/tooling ⭐ CORE

**Descripción:** dashboard-completed-steps-schema: gen-global-dashboard.js asume Array en session.completed_steps pero el schema real es {sprint, feature, steps:[]}; normalizar al cargar. Bug cosmético adicional: banner concatena GATE-${step} cuando step ya es G-N (produce GATE-G-8). Refactor + tests de regresión. GR-DASH-002.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-060 · process/tooling ⭐ CORE

**Descripción:** mcp-atlassian-sprint-lifecycle-gap: las herramientas MCP Atlassian (searchJiraIssues, transitionJiraIssue) no exponen endpoints para abrir/cerrar sprints. Step 9 Workflow Manager debe registrar acción manual pendiente en Jira UI cuando MCP no cubre sprint lifecycle. GR-ATLASSIAN-001.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-061 · process/governance/git ⭐ CORE

**Descripción:** working-tree-git-divergence-undetected: Orchestrator arrancó sesión completa sin detectar 842 ficheros borrados del working tree. Añadir PASO 0 de verificación de integridad: git status --porcelain | grep '^ D' | wc -l; si > 0, bloquear. Verificar existencia de pom.xml/package.json. Registrar hash HEAD en sofia.log al arrancar. GR-GIT-001.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-062 · process/tooling ⭐ CORE

**Descripción:** El campo `sprint_history` de `.sofia/session.json` presenta dos schemas incompatibles en el portfolio: dict con keys `sprint_N` (BankPortal, ExperisTracker) y list de objetos con campo `sprint` (Ta...

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-063 · process/tooling ⭐ CORE

**Descripción:** Durante la generacion del dashboard FacturaFlow en FASE 3 de estabilizacion se detectaron dos bugs defensivos relacionados con schema drift de `session.json` (patron hermano de LA-CORE-062):

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-064 · qa/devops/process ⭐ CORE

**Descripción:** smoke-test-references-non-existent-endpoint: smoke test aprobado en G-7 con check contra PUT /api/v1/pfm/budgets/{id}/alert (endpoint inexistente en PfmController). 2 defectos hermanos: SM-05 leia id vs accountId, SM-09 no aceptaba 409 en re-ejecucion. Corregido via grep cruzado URL-vs-@RequestMapping obligatorio pre-G-7. GR-SMOKE-001.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-065 · process/governance/audit ⭐ CORE

**Descripción:** gate-history-mixes-pending-and-approved: gate_history mezcla gates HITL aprobados con marcadores -pending del dashboard. Refactor a gate_history (aprobados) + gate_history_pending (intermedios). Eliminar duplicados por clave gate+sprint+step. GR-AUDIT-001.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-066 · process/governance/cmmi ⭐ CORE

**Descripción:** cmmi-process-areas-incomplete-declaration: session.cmmi declaraba 9 PAs vs 16 canonicas L3. Schema obligatorio {project:[9], org:[4], engineering:[3], coverage_strategy, coverage_matrix_path}. Crear docs/cmmi/CMMI-COVERAGE-MATRIX.md mantenida en Step 9. GR-CMMI-001 bloquea G-9 si incompleto.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-067 · tooling/mcp/recovery ⭐ CORE

**Descripción:** mcp-shell-stdio-buffer-limit-large-payloads: MCP shell timeout en payloads >16KB como argumento. Patron: fs.appendFileSync en bloques <=6KB para artefactos >8KB. Helper write-large-artifact.js opcional. GR-MCP-001.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-068 · frontend/angular ⭐ CORE

**Descripción:** En componentes Angular, usar `[href]` nativo en enlaces internos causa full page reload: el ShellComponent desaparece y la pantalla queda en blanco sin menu.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-070 · takeover/process ⭐ CORE

**Descripción:** T-3 FA Reverse Agent produce únicamente artefactos internos del pipeline (fa-index.json, T3-FA-DRAFT.md, T3-FA-GAPS.md).

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-071 · process/governance ⭐ CORE

**Descripción:** desde SOFIA-CORE Sprint 1 (orig LA-001-09) — En Sprint S01 Mini A Step 9, el Orchestrator ejecuto la secuencia de cierre form

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-072 · process/tooling ⭐ CORE

**Descripción:** desde SOFIA-CORE Sprint 1 (orig LA-001-03) — En Sprint S01 Mini A Step 6 Fase 2 (propagacion de LAs reformateadas H3->H2 a lo

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-073 · process/atomicity ⭐ CORE

**Descripción:** desde SOFIA-CORE Sprint 1 (orig LA-001-04) — En Sprint S01 Mini A Step 6, tras transicionar las issues SC-13 y SC-14 a estado

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-075 · governance / tooling / process-isolation ⭐ CORE

**Descripción:** create-file-tool-no-persiste-en-disco-real-en-sesiones-sofia-core: Durante la verificación independiente del sub-paso 1.6 Step 1 S02 (aud

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-091 · process/protocol · meta-regla ⭐ CORE

**Descripción:** toda-alteracion-de-LA-debe-usar-flujo-canonico-contributions-JSON: Durante la ejecución de SC-35 (rescate de 3 LAs huérfanas: LA-CORE-001, LA-CORE-0

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-092 · governance / schema-evolution ⭐ CORE

**Descripción:** gr-core-029-scope-clarification-not-applicable-in-core-sessions: Al arrancar Sprint S02 Mini B-full · Step 1 INIT, se detectó una contradicción oper

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-076 · governance/tooling/idempotency ⭐ CORE

**Descripción:** Durante el sub-paso 1.2-bis del Sprint S02 Mini B-full Step 1 (registro de LA candidate LA-CORE-075), el entorno de tools de Claude **cayó mid-PATCH**.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-077 · governance/decision-archive ⭐ CORE

**Descripción:** D3 firmada en S01 cierre acordó archivar Claude Agent SDK como base operativa de SOFIA-CORE.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-078 · governance/propagation ⭐ CORE

**Descripción:** En Sprint S01 Mini A Step 9 (cierre formal G-9), tras ejecutar el merge `feature/sprint-arq-S01-mini-a → develop` (PR #1, merge_commit_sha `8d04bcf`), Claude generó anotaciones de post-merge en la...

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-084 · process/protocol/i18n ⭐ CORE

**Descripción:** En sesión Step 1 post-G-1 del sprint S02 (2026-04-26), múltiples casos de fricción operativa con Atlassian fueron causados por asumir convenciones inglesas API en un proyecto cuyas etiquetas UI est...

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-085 · process/protocol/sprint-close ⭐ CORE

**Descripción:** Lectura de `.sofia/session.json` al reanudar Step 2 del sprint S02 en chat fresh (2026-04-26T09:40Z) detectó que el cierre del sprint anterior (S01-mini-b-lite) había dejado **5 campos residuales**...

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-087 · process/protocol+workaround ⭐ CORE

**Descripción:** Drift estructural conocido del MCP Atlassian para Claude: implementa principalmente la API de Jira Platform (issues) pero **deja fuera la API de Jira Agile** (sprints/boards/epics).

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-090 · governance/verification-discipline ⭐ CORE

**Descripción:** En sesión Claude del 2026-04-30 (post G-4 sub_bloque_3 cerrado), el PO inicia reflexión meta-protocolo sobre la cantidad de errores recientes detectados al verificar respuestas del agente.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-093 · governance/quality-assurance/process-protocol ⭐ CORE

**Descripción:** Durante la verificación pre-diseño SC-30 sub-paso 2.3 Step 2 S02 (2026-04-26 ~14:00Z), se descubrió un patrón de DEBT silenciosa en LA-CORE-073: el header `## LA-CORE-073` existía en `LESSONS_LEARN...

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-079 · process/tooling ⭐ CORE

**Descripción:** regex-headers-markdown-debe-ser-anchor-explicito-con-negative-lookahead: toda regex sobre artefactos markdown que pretenda anclar a un nivel específico de heading DEBE usar negative lookahead (?!#) inmediatamente después de los # del nivel objetivo (severity:low · v2.7.15 · D-S02-Step5-30)

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-086 · technical/operational ⭐ CORE

**Descripción:** mcp-schema-doc-drift-fallback-to-enum-authoritative: cuando un schema MCP rechaza un valor que la description inline indica como válido, considerarlo drift documentación/schema y aplicar fallback al valor del enum autoritativo (severity:low · v2.7.16 · D-S02-Step5-30)

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-094 · governance/agent-tier-model/phase-2 ⭐ CORE

**Descripción:** LA-CORE-074 Fase 1 (Tier A · 6 agentes Opus 4.7) cerrada en SC-41 S03 con persistencia material en MANIFEST.agent_model_assignment.tier_a y validador exit=0. Fases 2 (Tier B · Sonnet 4.6 · 20 agentes productivos) y 3 (Tier C · Haiku 4.5 · 4 agentes integradores) quedan pendientes con placeholders explícitos `tier_b: PENDING_FASE_2_S04` y `tier_c: PENDING_FASE_2_S04` reservados en schema. Mientras el gap persista, orchestrator no aplica routing real por agente y se acumula coste excesivo en agentes integradores. H-S03-4 documenta gap material agents_total=24 vs disco=28 vs LA-074=30 que Fase 2 debe reconciliar. Corrección: rellenar placeholders existentes (NO extender schema), asignar 22 agentes restantes en disco según LA-074, reconciliar H-S03-4, validador v1→v2 (28/28 o 30/30), frontmatter YAML por SKILL.md. Aprendizaje: cuando una LA define universo amplio y el sprint solo cubre una fase, materializar fases pendientes con placeholders explícitos en schema convierte deuda implícita en deuda auditable. — Sprint S03 (canonized desde S04-CAND-1 promovido en Step 5 G-5 S03)

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-095 · governance/quality-assurance/canonical-promotion ⭐ CORE

**Descripción:** LA-CORE-093 (S02) define que toda LA promovida al corpus canónico SOFIA-CORE debe estar en 3 lugares sincronizados: (a) cuerpo H2 en LESSONS_LEARNED_CORE.md, (b) entry en MANIFEST.la_core_index, (c) contributions/la_core_NNN/contribution.json status ACCEPTED. LA-CORE-074 (S02) fue aceptada como contribution (review.at 2026-04-28T17:11:44Z, Confluence pageId 19922946) cubriendo solo el lugar (c); los lugares (a) y (b) quedaron sin completar (verificación H-S03-5: grep '## LA-CORE-074' LL_CORE → 0 matches; 'LA-CORE-074 in la_core_index' → False). Causa raíz cronológica: LA-CORE-074 aceptada antes de formalizarse LA-CORE-093, sin auditoría retroactiva. Auditoría sesión Step 5 S03 confirma LA-CORE-074 es la única LA-CORE genuina con este gap (otras 10 contributions ACCEPTED son LAs proyecto fuera de scope SOFIA-CORE). Corrección S04: ejecutar sofia-contribute --accept LA-CORE-074, verificar fingerprint LL_CORE cambia, re-validar manifest, commit con cross-reference LA ID. Aprendizaje: toda regla nueva con efecto sobre corpus canónico debe llevar acompañada script o checklist de aplicación retroactiva sobre LAs aceptadas previamente. — Sprint S03 (canonized desde S04-CAND-B/H-S03-5 promovido en Step 5 G-5 S03)

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-096 · technical/operational/macos-pipe-buf ⭐ CORE

**Descripción:** Durante SC-39 apply #1 (Step 3 S03 sub-paso 3.3), check post-apply ejecutó subprocess.run(['node','scripts/validate-manifest.js'], capture_output=True, text=True) sobre validator que emite ~79KB JSON. macOS limita PIPE_BUF a 64KB; con capture_output+text=True el contenido se trunca silenciosamente. Reproducción material en sesión Step 5: validator output 79143 bytes vs subprocess.run.stdout 77431 bytes (1712 bytes truncados, ~2.2%). El truncamiento provoca JSONDecodeError silently caught, falso positivo de validator falla, trigger de rollback automático aunque la mutación funcional había sido correcta. Antipatrón activo en producción: scripts/gen-lessons-core.py:286 usa el mismo patrón sobre el mismo validator. Corrección S04: doctrina explícita NO usar subprocess.run capture_output+text=True para outputs grandes; helper scripts/lib/safe_subprocess.py con run_capture_to_file; auditoría grep + migración de checkers afectados; gen-lessons-core.py:286 migrado como dogfooding; test unitario reproduce truncamiento. Aprendizaje: para outputs >64KB de procesos hijos en macOS (y sistemas con PIPE_BUF reducido), redirigir stdout a fichero antes de parsear; el falso positivo no es del proceso hijo sino del checker padre. — Sprint S03 (canonized desde S04-CAND-α promovido en Step 5 G-5 S03)

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-097 · process/governance ⭐ CORE

**Descripción:** desde bank-portal Sprint 26 (orig LA-026-04) — MANIFEST.la_core_index acumuló 8 entradas espurias con prefijo de ID local (LA-0

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-098 · process/governance/snapshots ⭐ CORE

**Descripción:** desde bank-portal Sprint 26 (orig LA-026-05) — El patron 'snapshot pre-update' establecido por phaseABC se trato como obligacio

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-099 · tooling/testcontainers/docker ⭐ CORE

**Descripción:** desde bank-portal Sprint 26 (orig LA-026-08) — Hallazgo lateral durante F.4. Consecuencia mas grave: TODOS los ITs del proyecto

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-100 · tooling/spring-boot/config ⭐ CORE

**Descripción:** desde bank-portal Sprint 26 (orig LA-026-07) — El comportamiento Spring Boot YAML profile-specific es no-intuitivo. Documentaci

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-101 · process/governance/audit ⭐ CORE

**Descripción:** desde bank-portal Sprint 26 (orig LA-026-06) — Patron de auditoria insuficiente: grep en archivo objetivo del analisis sin segu

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-102 · governance/configuration-management ⭐ CORE

**Descripción:** manifest-scripts-must-stay-bidirectional-with-disk: durante verificación pre-diseño SC-28 sub-paso 2.1 Step 2 S02 (2026-04-26) se detectó drift de 14 scripts en disco no registrados en MANIFEST.scripts (set(disco) - set(MANIFEST)). Severidad medium (no bloquea operación pero debilita evidencia CMMI CM+PPQA+OPF). Cerrado operacionalmente en F4 S05 (D-S05-F4-Q8-manifest-cleanup-prime · MANIFEST v2.8.1 · scripts_drift=0). Promovida en G-7 S05 como recordatorio doctrinal: MANIFEST.scripts debe permanecer bidireccional con disco · candidato extensión validator (reverse check disco→manifest) y pre-commit hook futuro que rechace scripts/*.{js,py} no listados en MANIFEST.scripts.

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-12T18:27:45.748Z_

---

### LA-CORE-103 · governance/agent-tier-model/promotion ⭐ CORE

**Descripción:** php-legacy-reverse promoted from Tier B (sonnet-4-6 high) to Tier A (opus-4-7 xhigh) in SC-61 S06 F4 via Q-F4-2 sub-firma intra-G-7 (D-S06-F4-Q4-2-TIER-A · PO quote verbatim 2026-05-13: 'Apruebo β Promover Tier A (+ LA-CORE-095 candidate)'). Stub original SC-51 S04 F1 firmó Tier B con tier_reassessment_pending:true por prudencia conservadora; post-content-drafting analysis confirmó FA real (Functional Archaeology · análogo arquitectónico canónico fa-reverse-agent Tier A SC-41 S03). Consumidor previsto IMESAPI es regulado (FACE/FACEB2B/AEAT). Status: candidate · pending RETRO F5 formal promotion via LA-CORE-018 flujo HITL. NOTA: PO quote menciona 'LA-CORE-095' pero ese ID estaba ocupado en la_core_index (governance/quality-assurance/canonical-promotion · S03) · ID corregido a LA-CORE-103 por gap conflict (LA-CORE-090 disk supersedes memory) · MANIFEST sync firmada por PO con D-S06-F4-Q4-2-MANIFEST-UPDATE ('Apruebo α'). Sprint S06 (canonized desde D-S06-F4-Q4-2-TIER-A · pending RETRO F5 final acceptance).

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-13T08:22:04.930Z_

---

### LA-CORE-104 · governance/cross-project-sync/skill-local-overlay ⭐ CORE

**Descripción:** la-sync.js v1.1.0 hotfix S06 F3 ADR-009 R5/R7 Skill Local Overlay awareness implementation. Pre-hotfix la-sync.js sobreescribía skills cliente con contenido CORE perdiendo overlay local (bloques marcados con `<!-- SKILL_LOCAL_OVERLAY -->`). Hotfix: (a) detección de overlay markers antes de sobreescribir; (b) merge selectivo preservando bloques marcados; (c) defense-in-depth refactor con tests unitarios T1-T5 garantizando idempotencia + overlay preservation; (d) la-sync.js v1.1.0 ACTIVE. Resuelve finding HIGH H-S06-F3-1. Aprobado D-S06-F3-G9-CLOSE 2026-05-12 (G-5 APPROVED · firma cierre F3). Canonización formal vía contribution F5.1 firmada D-S06-F5-F5.1-DERIVADA-LA104-APPROVED ('procedemos con α').

**Corrección:** Ver LESSONS_LEARNED_CORE.md en SOFIA-CORE para corrección completa.

_SOFIA-CORE v2.7.21 · Importada: 2026-05-13T08:22:04.930Z_

---


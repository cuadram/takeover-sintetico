# SOFIA Adoption Roadmap — FacturaFlow
**Proyecto:** FacturaFlow · **Cliente:** RetailCorp S.L.
**Generado:** 2026-04-07 · Sprint 0 Takeover
**Process Maturity de partida:** AD-HOC (0.08/3.0) · CMMI L1–L2
**Velocidad de referencia:** 40 SP/sprint (equipo estándar)

---

## ⚠️ Alerta de capacidad Sprint 1

```
Mandatory DEBT-TK (seguridad + CI/CD):   26 SP
Funcionales HIGH urgentes (TK-011/012/014): 8 SP
Overhead gobernanza AD-HOC (15% + adj):   6 SP
─────────────────────────────────────────────
Total comprometido Sprint 1:             40 SP
Velocidad de referencia:                 40 SP
SP libres para evolutivos de negocio:     0 SP
```

**Sprint 1 es de estabilización pura.** El primer evolutivo de negocio viable ocurrirá en Sprint 2 con ~17 SP disponibles. Comunicar al cliente en GT-5 antes de firmar el plan de trabajo.

---

## Nivel 0 — Sprint 0 (COMPLETADO ✅)

El Pipeline Takeover ha producido la base de gobernanza inicial:

| Artefacto | Estado |
|---|---|
| T0-DOC-MATRIX.json (DTS por tipo) | ✅ |
| T1-INVENTORY.md + T1-STACK-MAP.json | ✅ |
| T2-QUALITY-BASELINE.md + 14 DEBT-TK | ✅ |
| fa-index.json v0.1 + T3-FA-DRAFT.md | ✅ |
| T3-FA-GAPS.md (4 DISCREPANCYs resueltas) | ✅ |
| T4-GOVERNANCE-GAP.md + T4-CMMI-ASSESSMENT.md | ✅ |
| session.json inicializado con estado completo | ✅ |
| sofia.log con trazabilidad de cada step | ✅ |
| BASELINE-DOCUMENT-v1.0.md (T-5, pendiente) | ⏳ |
| SPRINT-000-data.json (T-5, pendiente) | ⏳ |

**CMMI L3 PAs completadas en Sprint 0:** 0/9 (pipeline de toma de control — no evolutivo)
**Documentación Sprint 0:** 8/17 artefactos SOFIA iniciados (EXISTE_PARCIAL)

---

## Nivel 1 — Sprints 1–2: Pipeline básico operativo

### Sprint 1 — Estabilización + Gobernanza inicial

**Objetivo:** Resolver toda la deuda de seguridad crítica, establecer el pipeline SOFIA básico y arrancar la gobernanza desde cero.

**Overhead de gobernanza:** 6 SP (15% base + 5 SP ajuste AD-HOC)
**SP mandatory DEBT-TK:** 26 SP
**SP funcionales urgentes:** 8 SP (TK-011, TK-012, TK-014)
**SP evolutivos:** 0 SP

**Acciones de estabilización (26 SP mandatory):**
- [ ] DEBT-TK-001: Upgrade EF Core 6→8 (5 SP)
- [ ] DEBT-TK-002: Upgrade JwtBearer 6→8 (1 SP)
- [ ] DEBT-TK-003: Rotar JWT secret + variables de entorno (1 SP)
- [ ] DEBT-TK-004: Rotar DB password + variables de entorno (1 SP)
- [ ] DEBT-TK-005: Migrar passwords usuarios a bcrypt (5 SP)
- [ ] DEBT-TK-006: Plan de tests básico — ciclo de vida factura + CRUD (8 SP)
- [ ] DEBT-TK-007: Pipeline CI/CD básico — GitHub Actions (build + test) (5 SP)

**Acciones funcionales urgentes (8 SP):**
- [ ] DEBT-TK-011: Endpoint `PUT /facturas/{id}/pagar` — EMITIDA→PAGADA (3 SP)
- [ ] DEBT-TK-012: Endpoint `PUT /facturas/{id}/anular` — EMITIDA→ANULADA (2 SP) *(coordinar con TK-008)*
- [ ] DEBT-TK-014: Recuperar código exportación PDF de Miguel Fernández + integrar (3 SP)

**Acciones de gobernanza (6 SP):**
- [ ] Jira: crear proyecto FacturaFlow + workflow SOFIA + board Sprint 1 (1 SP — PM)
- [ ] Confluence: crear space FacturaFlow + estructura de pages (1 SP — PM)
- [ ] Git Flow: configurar branching strategy + branch protection en main (0.5 SP — TL)
- [ ] CM Plan: documentar Git Flow + convención de commits (0.5 SP — TL)
- [ ] SRS baseline: formalizar desde fa-index.json v0.1 (2 SP — TL)
- [ ] Risk Register: crear en Confluence desde DEBT-TK (0.5 SP — PM)
- [ ] Plan de Proyecto Sprint 0→S2: hitos y velocidad ajustada (0.5 SP — PM)

**CMMI PAs que alcanzan CONFORME en Sprint 1:**
- PP: Plan de Proyecto creado ✅
- VER: PRs obligatorios + CI con test gate ✅
- VAL: QA Step 6 + aceptación PO ✅
- CM: Git Flow + CM Plan ✅

---

### Sprint 2 — Consolidación técnica + primer evolutivo

**Overhead de gobernanza:** 5 SP (12%)
**SP evolutivos disponibles:** ~15 SP
**Prioridad evolutiva recomendada:** Módulo de Facturas (transiciones pendientes ya cubiertas en S1, ahora implementar Informes básicos)

**Acciones de estabilización (5 SP — deudas no mandatory):**
- [ ] DEBT-TK-008: Cambiar DELETE físico → transición ANULADA en borrador (3 SP) *(ya parcialmente cubierto con TK-012 en S1)*
- [ ] DEBT-TK-009: Migrar Newtonsoft.Json 12 → System.Text.Json o v13 (2 SP)

**Acciones de gobernanza (5 SP):**
- [ ] CI pipeline: añadir deploy a staging (si servidor disponible) (3 SP — TL/DevOps)
- [ ] ADRs retroactivos: EF Core, JWT, monolito vs microservicios (2 SP — TL/Architect)

**Documentación retroactiva (incluida en overhead):**
- [ ] HLD del sistema: diagrama C4 nivel 1 y 2 (3 SP — Architect)
- [ ] Trazabilidad US → código → test: primer sprint con trazabilidad completa

**CMMI PAs que alcanzan CONFORME en Sprint 2:**
- PMC: Dashboard SOFIA activo con métricas S1 ✅
- RSKM: Risk Register actualizado con retrospectiva S1 ✅
- REQM: US trazables a fa-index.json + Jira ✅
- DAR: Primeros ADRs retroactivos ✅

---

## Nivel 2 — Sprints 3–5: FA-Agent activo + Documentación completa

### Sprint 3 — FA-Agent + PPQA inaugural

**Overhead de gobernanza:** 4 SP (10%)
**SP evolutivos disponibles:** ~20 SP

**Acciones de gobernanza:**
- [ ] FA-Agent: steps 2b, 3b, 8b activos — fa-index.json evoluciona de v0.1 a v1.x (integrado en el pipeline)
- [ ] PPQA: primera auditoría interna SOFIA (1 SP — PM)
- [ ] Documentation Agent (Step 8): primeros 10 DOCX generados
- [ ] DEBT-TK-010: Refactor Repository Pattern — módulo Clientes (8 SP — puede distribuirse)
- [ ] DEBT-TK-013: Informes REST — endpoint 1 (facturas por período) (3 SP)

**CMMI PAs que alcanzan CONFORME en Sprint 3:**
- PPQA: primera auditoría realizada ✅
- **→ CMMI L3 completo estimado en Sprint 3** (todas las 9 PAs en CONFORME)

---

### Sprints 4–5 — Madurez y 17 DOCX

**Overhead de gobernanza:** 3 SP (8%)
**SP evolutivos disponibles:** ~21 SP

- [ ] Step 8 completo: 17 DOCX por sprint
- [ ] MA Baseline: primeras métricas de proceso cross-sprint
- [ ] DEBT-TK-013: Informes REST — endpoints 2 y 3 (3 SP)
- [ ] DEBT-TK-010: Repository Pattern completo (resto del refactor)
- [ ] Retrospectivas formales documentadas

---

## Nivel 3 — Sprint 6+: CMMI L3 consolidado

**Overhead de gobernanza:** 2 SP (5%) — gobernanza como hábito

- [ ] 9 PAs CMMI con evidencias completas en cada sprint
- [ ] MA Baseline con tendencias de calidad y velocidad
- [ ] Cobertura de tests >= 60% (desde ratio 0.17 en Sprint 0)
- [ ] CMMI L3 auditado formalmente si el cliente lo requiere

---

## Resumen de overhead de adopción

| Sprint | Overhead gobernanza | SP libres evolutivos | Foco principal |
|---|---|---|---|
| S0 | Takeover Pipeline | — | Baseline completo |
| **S1** | **6 SP (15%)** | **0 SP ⚠️** | Estabilización pura (seguridad + CI + funcional urgente) |
| S2 | 5 SP (12%) | ~15 SP | Primer evolutivo real + ADRs + CI completo |
| S3 | 4 SP (10%) | ~20 SP | FA-Agent activo + PPQA + CMMI L3 |
| S4 | 3 SP (8%) | ~21 SP | 17 DOCX + métricas |
| S5+ | 2 SP (5%) | ~22 SP | Hábito consolidado |

---

## Dependencias críticas para arrancar Sprint 1

| Dependencia | Responsable | Plazo | Riesgo si no se resuelve |
|---|---|---|---|
| Acceso write al repositorio | Equipo saliente + TL | Antes de S1 day 1 | Sprint 1 bloqueado |
| Credenciales del servidor de producción | Miguel Fernández | Antes de S1 | Deploy imposible |
| Código exportación PDF (DEBT-TK-014) | Miguel Fernández | S1 week 1 | Funcionalidad en riesgo de perderse |
| Confirmación entorno staging | Miguel Fernández | S1 week 1 | CI/CD limitado a build+test |
| Jira + Confluence configurados | PM | Sprint 0 (ahora) | Gobernanza de S1 degradada |
| Rotación de secrets (JWT + DB) | TL | **INMEDIATO** | Vulnerabilidad activa en producción |

---

## Proyección CMMI L3

```
Sprint 0 (actual):  L1–L2  ████░░░░░░░░░░░░░░░░  5/9 PAs INFORMAL
Sprint 1:           L2     ████████████░░░░░░░░  4/9 PAs CONFORME
Sprint 2:           L2–L3  ████████████████░░░░  8/9 PAs CONFORME
Sprint 3:           L3     ████████████████████  9/9 PAs CONFORME ✅
Sprint 4+:          L3+    Consolidación con métricas y evidencias maduras
```

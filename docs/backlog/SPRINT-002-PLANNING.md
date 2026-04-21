# Sprint 2 Planning — FacturaFlow — STAB-S2/EVO-S2

**Proyecto:** FacturaFlow · **Cliente:** RetailCorp S.L. · **SOFIA:** v2.6.25
**Periodo:** 2026-04-21 → 2026-05-05 (2 semanas)
**Perfil:** BALANCEADO (IT + endpoints + compliance)
**SM/PM/PO:** Angel · **Planning:** 2026-04-20

---

## 🎯 Sprint Goal

> Habilitar ciclo de vida completo de factura (pagar/anular/borrar lógico) cumpliendo AEAT/GDPR, y consolidar la base de testing e integración como cimiento para la certificación CMMI L3 en S3.

---

## 📊 Capacidad

| Concepto | Horas | SP |
|---|---|---|
| Capacidad bruta (10d × 7h × 1p) | 70 | — |
| − Ceremonias | 4 | — |
| − Buffer impedimentos | 7 | — |
| − Refinamiento FEAT nuevo | 4 | — |
| **Capacidad neta** | **55** | **24 teóricos** |
| **Committed** | — | **23** |
| **Contingente (TK-014)** | — | **+3** |
| **Upper bound si TK-014 entra** | — | **26** |

Ratio histórico S1: **0.436 SP/h** · margen de seguridad: **1 SP**.

---

## 🗂️ Backlog committed (23 SP)

| # | Jira (esp.) | Debt | Resumen | Área | SP | Prio | Mand. |
|---|---|---|---|---|---|---|---|
| 1 | FF-23 | TK-015 | Integration Tests Testcontainers | Tests/IT | 5 | HIGH | ✅ |
| 2 | FF-24 | TK-011 | Endpoint `/pagar` EMITIDA→PAGADA | Functional | 3 | HIGH | — |
| 3 | FF-25 | TK-012 | Endpoint `/anular` EMITIDA→ANULADA | Functional | 2 | HIGH | — |
| 4 | FF-26 | TK-008 | Soft-delete AEAT/GDPR | Compliance | 3 | HIGH | — |
| 5 | FF-27 | TK-006-S2 | Cobertura tests 20% → 45% | Tests | 5 | HIGH | — |
| 6 | FF-28 | GOV-S2-L3-PREP | Preparación CMMI L3 (PPQA+VAL+DAR) | Governance | 2 | MED | — |
| | | | **Total committed** | | **20+3** | | |

**Mix:** Evolutivos 8 SP · Compliance 3 SP · Tests 10 SP · Governance 2 SP.

### 🕒 Contingente (+3 SP)

| Jira | Debt | Resumen | Condición |
|---|---|---|---|
| FF-29 | TK-014 | Recuperar PDF export Miguel Fdez | Entra si llega código antes del **2026-04-23 18:00 UTC** (día 3). Fallback: defer a S3. |

### 📌 Diferidos

- FEAT evolutivo nuevo (pending_refinement) — candidato change-scope si PM aprueba
- DEBT-TK-010 (Repository Pattern, 8 SP, S3-S4)
- DEBT-TK-013 (Informes REST, 8 SP, S3)
- DEBT-TK-006-S3 (cobertura 45%→80%, 3 SP, S3)

---

## 📅 Secuenciación

**Semana 1 (21–25 abr):**
- FF-23 (IT fundación) — arranca día 1 porque bloquea validación E2E
- FF-24 (`/pagar`) — en paralelo
- FF-25 (`/anular`) — tras FF-24 (máquina estados compartida)
- FF-29 (PDF) — decisión día 3 según input Miguel Fdez

**Semana 2 (28 abr – 2 may):**
- FF-26 (soft-delete AEAT/GDPR)
- FF-27 (cobertura unitaria)
- FF-28 (prep CMMI L3)

---

## ⚠️ Risk Register Sprint 2

| ID | Riesgo | Cat | P | I | Exp | Owner |
|---|---|---|---|---|---|---|
| R-S2-001 | Miguel Fdez no entrega código PDF | Externo | M | M | M | PM |
| R-S2-002 | Testcontainers incompatible CI runner free | Técnico | M | M | M | TL |
| R-S2-003 | Máquina estados Factura mal definida en FA | Técnico | B | A | M | PO |
| R-S2-004 | Soft-delete leak en queries existentes | Técnico | M | A | **A** | TL |
| R-S2-005 | FEAT nuevo mid-sprint rompe Sprint Goal | Negocio | M | M | M | PM |

**Acción crítica (R-S2-004 exposición ALTA):** ADR obligatorio en Step 3 sobre Global Query Filter strategy antes de implementar.

---

## ✅ Exit Criteria

1. IntegrationTestBase + 3 ITs verdes en CI con Testcontainers
2. `/pagar` y `/anular` transicionan correctamente + rechazan transiciones inválidas + audit trail
3. Soft-delete activo con Global Query Filter · endpoint restore admin · test no-leak
4. Cobertura unitaria ≥ 45%
5. Plantillas PPQA/VAL/DAR publicadas · PA scores 0→1 en esos 3 PAs
6. Semáforo calidad AMBER · 0 CVEs críticos · 0 secrets
7. Velocidad real 20–26 SP (committed 23 ±15%)

---

## 🎖️ Objetivo CMMI L3 (preparatorio)

| PA | Score actual | Target post-S2 | Target S3 (L3) |
|---|---|---|---|
| PP | 1 | 1 | 2 |
| PMC | 0 | **1** | 2 |
| RSKM | 1 | 1 | 2 |
| VER | 1 | 1 | 2 |
| VAL | 0 | **1** | 2 |
| CM | 1 | 1 | 2 |
| PPQA | 0 | **1** | 2 |
| REQM | 1 | 1 | 2 |
| DAR | 0 | **1** | 2 |

**S2 activa los 3 PAs faltantes (PMC/VAL/PPQA/DAR a baseline=1). S3 los sube a 2 para certificar L3.**

---

## 🛡️ Guardrails activos S2

- GR-CORE-030: branching `feature/FEAT-XXX-sprint02`
- GR-CORE-025: sin DISCREPANCYs abiertas antes de G-3
- LA-025-02: `gen-fa-document.py` BLOQUEANTE en G-2b
- LA-CORE-051: current_step + gate_pending escritura atómica
- LA-CORE-046: Step 9 WM sync Jira con JQL completo
- LA-CORE-047: `gen-global-dashboard.js` tras cada gate

---

## 🔗 Dependencias

- **Externas:** Miguel Fernández (R-S2-001 / FF-29)
- **Internas:** FF-25 ← FF-24 · FF-26 ← FF-23 (IT para no-leak) · FF-27 ← código estable FF-24/25

---

*Gate pendiente: G-1 HITL PO — aprobación de este planning para avanzar a Step 2 (requirements-analyst / SRS-SPRINT-002).*

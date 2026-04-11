# FA Gaps & Discrepancias — Takeover Sprint 0
**Proyecto:** FacturaFlow · **Cliente:** RetailCorp S.L. (Laboratorio Sintético SOFIA)
**Fecha:** 2026-04-07 · **Agente:** FA Reverse Agent SOFIA v1.0
**Estrategia DTS:** DOCUMENT-LED + CODE-VALIDATED · DTS_FUNC=0.645 (GOOD)

**Total DISCREPANCY (bloquean GT-3):** 4 · **Resueltas:** 4 ✅ · **Abiertas:** 0
**Total NEEDS-VALIDATION (recomendadas GT-3):** 8

> ✅ GR-CORE-025 SATISFECHO: todas las DISCREPANCYs tienen resolución documentada.
> Gate GT-3 desbloqueado en lo que respecta a este fichero.

---

## SECCIÓN A — DISCREPANCY
### Resolución documentada — GT-3 desbloqueado

---

### DISC-T3-001 — Registro de pago de factura (transición EMITIDA → PAGADA)

**Tipo:** DOCUMENTED-NOT-FOUND
**Estado:** ✅ RESUELTO — `CONFIRMED-MISSING`
**Resolución:** Angel (PO) · 2026-04-07

**Descripción del gap:**
El manual funcional (§4) documenta la transición EMITIDA → PAGADA como "Registrar pago", solo para Contabilidad y Admin. El estado PAGADA existe en la BD y en la spec OpenAPI, pero no existe ningún endpoint `/facturas/{id}/pagar` en el código.

**Resolución documentada:**
La funcionalidad **no está implementada** en el sistema actual. Es deuda funcional pendiente. Se registra como `DEBT-TK-011` con prioridad HIGH para Sprint 1.

**Acción derivada:** `DEBT-TK-011` — Implementar endpoint `PUT /api/v1/facturas/{id}/pagar` con transición de estado EMITIDA → PAGADA, restringido a roles Contabilidad y Admin. Incluye test de ciclo de vida.

**Regla de negocio afectada:** RN-TK-008 (pendiente de validación código — solo en documentación)
**Estimación:** 3 SP · Sprint objetivo: S1

---

### DISC-T3-002 — Anulación de factura emitida (transición EMITIDA → ANULADA)

**Tipo:** DOCUMENTED-NOT-FOUND
**Estado:** ✅ RESUELTO — `CONFIRMED-MISSING`
**Resolución:** Angel (PO) · 2026-04-07

**Descripción del gap:**
El manual funcional (§4) documenta la transición EMITIDA → ANULADA como "Anular", solo para Admin. El estado ANULADA existe en la BD. El `DELETE /facturas/{id}` existente no es equivalente — borra físicamente BORRADOR y no transiciona EMITIDA → ANULADA.

**Resolución documentada:**
La funcionalidad de anulación formal de facturas emitidas **no está implementada**. Es deuda funcional. Se registra como `DEBT-TK-012`. Debe implementarse junto con el cambio de DEBT-TK-008 (DELETE físico → ANULADA), ya que son partes del mismo problema de ciclo de vida.

**Acción derivada:** `DEBT-TK-012` — Implementar endpoint `PUT /api/v1/facturas/{id}/anular` con transición EMITIDA → ANULADA, restringido a Admin. Coordinar con DEBT-TK-008 (corregir DELETE físico). Incluye test de ciclo de vida.

**Regla de negocio afectada:** RN-TK-009 (pendiente de validación código)
**Estimación:** 2 SP (coordinado con DEBT-TK-008, 3 SP) · Sprint objetivo: S1

---

### DISC-T3-003 — Informes de facturación

**Tipo:** DOCUMENTED-NOT-FOUND
**Estado:** ✅ RESUELTO — `CONFIRMED-MISSING`
**Resolución:** Angel (PO) · 2026-04-07

**Descripción del gap:**
El manual funcional (§6) describe tres informes (facturas por período, pendientes de cobro, volumen por cliente). El propio documento reconocía que no tienen endpoint REST. No se detectó ningún controller ni librería de reporting en el código.

**Resolución documentada:**
Los informes **no están implementados** en el sistema actual en ninguna forma. Es funcionalidad pendiente. Se registra como `DEBT-TK-013` con prioridad MEDIUM para backlog.

**Acción derivada:** `DEBT-TK-013` — Implementar endpoints REST de informes: (1) GET `/api/v1/informes/facturas-por-periodo`, (2) GET `/api/v1/informes/facturas-pendientes-cobro`, (3) GET `/api/v1/informes/volumen-por-cliente`. Incluye definición de parámetros y formato de respuesta con PO en Sprint de planificación.

**Estimación:** 8 SP · Sprint objetivo: Backlog (priorizar con PO en planificación S2)

---

### DISC-T3-004 — Exportación de factura a PDF

**Tipo:** DOCUMENTED-NOT-FOUND → `CONFIRMED-EXISTS-MISSING-CODE`
**Estado:** ✅ RESUELTO — `CONFIRMED-EXISTS-MISSING-CODE`
**Resolución:** Angel (PO) · 2026-04-07

**Descripción del gap:**
El manual funcional (§3.3) reconocía que "existe un endpoint de exportación a PDF pero no está documentado". No se detectó endpoint ni librería de PDF en el repositorio entregado. El `.csproj` no incluye dependencias de generación de PDF.

**Resolución documentada:**
La funcionalidad **existe en producción** pero el código **no fue incluido en el repositorio entregado**. Es deuda de código del proceso de takeover. Se registra como `DEBT-TK-014` con prioridad HIGH — el código debe ser solicitado y recuperado del equipo saliente antes de Sprint 1.

**Acción derivada:** `DEBT-TK-014` — Solicitar urgentemente a Miguel Fernández (TI RetailCorp) el código del endpoint de exportación PDF. Una vez recibido: (a) incorporar al repositorio, (b) incluir las dependencias NuGet correspondientes en `.csproj`, (c) documentar en openapi.yaml. Hasta que el código sea recuperado, la funcionalidad está en riesgo de pérdida de conocimiento.

**Riesgo adicional:** Si el código solo existe en el servidor de producción (FTP) y no en un repositorio de control de versiones, puede perderse ante cualquier incidente en el servidor. Escalar como urgente.

**Estimación:** 3 SP (recuperar + integrar + documentar) · Sprint objetivo: S1 (URGENTE — antes de cualquier despliegue)

---

## SECCIÓN B — NEEDS-VALIDATION
### Validación recomendada en GT-3

| VAL-ID | FA | Descripción | Fuente de aclaración |
|---|---|---|---|
| VAL-001 | FA-TK-002 | ¿El backend debe calcular automáticamente el Total o es responsabilidad del cliente de la API? Test con FIXME. | PO |
| VAL-002 | FA-TK-004 | Comportamiento esperado ante NIF/CIF duplicado (actualmente: error genérico de BD) | PO |
| VAL-003 | FA-TK-008 | Filtrado en memoria con 8.000 facturas/año — ¿aceptable hasta Sprint 1? | PO + TL |
| VAL-004 | FA-TK-009 | ¿Debe validarse existencia del cliente al crear factura? ¿Cómo se gestiona numeración por ejercicio? | PO |
| VAL-005 | FA-TK-011 | ¿La emisión requiere validar que el cliente esté activo? (documentado en manual §4, no implementado) | PO |
| VAL-006 | FA-TK-012 | ¿La "eliminación de borrador" cambia a "anulación de borrador" en Sprint 1? (AEAT/GDPR — DEBT-TK-008) | PO |
| VAL-007 | FA-TK-013 | ¿Cómo se genera el token JWT? ¿Existe endpoint de login no entregado? | Equipo saliente (Miguel Fernández) |
| VAL-008 | FA-TK-014 | ¿Existe controller de usuarios no incluido en el repositorio? ¿O gestión manual vía BD? | Equipo saliente (Miguel Fernández) |

---

## Resumen de DEBTs derivados de las resoluciones

| DEBT-TK | Origen DISC | Tipo | Prioridad | SP | Sprint |
|---|---|---|---|---|---|
| DEBT-TK-011 | DISC-T3-001 | Funcional pendiente | HIGH | 3 | S1 |
| DEBT-TK-012 | DISC-T3-002 | Funcional pendiente | HIGH | 2 | S1 |
| DEBT-TK-013 | DISC-T3-003 | Funcional pendiente | MEDIUM | 8 | Backlog |
| DEBT-TK-014 | DISC-T3-004 | Código no entregado | HIGH | 3 | S1 — URGENTE |

**SP adicionales derivados de resoluciones GT-3:** 16 SP
**SP mandatory S1 totales (incluyendo T-2 + T-3):** 26 + 8 (TK-011, TK-012, TK-014) = **34 SP**

---

## Estado final para GT-3

| Categoría | Total | Resueltas | Abiertas |
|---|---|---|---|
| DISCREPANCY (bloqueaban GT-3) | 4 | **4 ✅** | 0 |
| NEEDS-VALIDATION (recomendadas) | 8 | 0 | 8 |

> ✅ **GR-CORE-025 SATISFECHO** — discrepancies_open = 0.
> El PO puede aprobar GT-3 una vez revisado el catálogo funcional en T3-FA-DRAFT.md.
> Las 8 NEEDS-VALIDATION pueden quedar pendientes para sesión de refinamiento en Sprint 1.

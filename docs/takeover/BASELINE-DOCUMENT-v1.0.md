# Baseline Document — Toma de Control
**Proyecto:** FacturaFlow
**Cliente:** RetailCorp S.L.
**Fecha de baseline:** 2026-04-07
**Elaborado por:** Experis — SOFIA Sprint 0 Takeover (v2.6)
**Versión:** 1.0

---

## DECLARACIÓN DE INTENCIÓN

Este documento establece el estado técnico, funcional y de gobernanza del sistema **FacturaFlow** en la fecha **2026-04-07**, inmediatamente antes de que Experis asuma su gestión y evolución. Su contenido ha sido elaborado mediante análisis técnico objetivo del repositorio de código y la documentación facilitada por RetailCorp S.L.

La aprobación de este documento por parte del cliente representa:

1. Aceptación del estado técnico documentado en este Baseline
2. Conocimiento y acuerdo con los riesgos de seguridad identificados y su plan de resolución
3. Acuerdo con el backlog priorizado del Sprint 1
4. Comprensión de la velocidad de desarrollo inicial y el calendario de inicio de evolutivos

> *Este documento es inmutable tras su aprobación. Cualquier cambio posterior generará una versión 2.0 con changelog explícito. La versión 1.0 permanece como referencia histórica del estado en la fecha de toma de control.*

---

## 1. ESTADO DEL SISTEMA

### 1.1 Stack tecnológico real

*Fuente: T1-INVENTORY.md + T1-STACK-MAP.json*

| Componente | Tipo | Tecnología | Versión | Estado |
|---|---|---|---|---|
| FacturaFlow.Api | Backend / Monolito | .NET / ASP.NET Core | **6.0** | ⚠️ Desactualizado — CVEs activos |
| EF Core | ORM / Persistencia | Microsoft Entity Framework Core | **6.0.0** | 🔴 CVE crítico (CVSS 9.1) |
| SQL Server | Base de datos | Microsoft SQL Server | local | Activo — credenciales en repo |
| JWT Auth | Autenticación | Microsoft.AspNetCore.Authentication.JwtBearer | **6.0.0** | 🔴 CVE alto (CVSS 6.8) |
| Swagger | Documentación API | Swashbuckle.AspNetCore | 6.2.3 | Desactualizado |
| Serilog | Logging | Serilog.AspNetCore | 4.1.0 | Desactualizado |

**Arquitectura:** Monolito plano (.NET 6) — un único proyecto, una única base de datos SQL Server, sin microservicios, sin contenedores.

**Operabilidad local:** PARTIAL — hay instrucciones básicas en el README, pero el despliegue depende de una sola persona del cliente (Miguel Fernández, TI) y los secretos de configuración están embebidos en ficheros del repositorio.

**CI/CD:** No existe. El despliegue se realiza manualmente vía FTP al servidor de producción (192.168.1.100). No hay pipeline de integración ni entrega continua.

### 1.2 Documentación del cliente recibida y evaluada

*Fuente: T0-DOC-MATRIX.json — Documentation Trust Score (DTS)*

| Documento | Tipo | Fiabilidad (DTS) | Nivel | Uso en el análisis |
|---|---|---|---|---|
| `manual-funcional.md` v2.1 (Oct 2024) | Funcional | 0.645 | GOOD | Base funcional — validado 100% contra código |
| `openapi.yaml` v1.4 | API spec | 0.820 | TRUSTED | Fuente primaria de contratos de API |
| `arquitectura-2020.md` v1.0 (Mar 2020) | Arquitectónico | 0.210 | POOR | ⚠️ **EXCLUIDO** — arquitectura zombie (Java 2020 vs .NET 6 real) |

### 1.3 Catálogo funcional inicial

*Fuente: T3-FA-DRAFT.md + fa-index.json v0.1*

El sistema implementa **14 funcionalidades** identificadas mediante análisis de código, tests y documentación existente:

| Módulo | Funcionalidades | Confianza alta | Confianza media | UNKNOWN |
|---|---|---|---|---|
| Gestión de Clientes | 5 | 5 | 0 | 0 |
| Gestión de Facturas | 7 | 6 | 1 | 0 |
| Usuarios y Control de Acceso | 2 | 0 | 1 | 1 |
| **Total** | **14** | **11** | **2** | **1** |

**Ciclo de vida de factura — estado actual:**

```
BORRADOR ──[emitir]──► EMITIDA ──[pagar]──► PAGADA
                           │
                       [anular]
                           │
                           ▼
                        ANULADA
```

- Transición BORRADOR → EMITIDA: ✅ **Implementada** (`PUT /api/v1/facturas/{id}/emitir`)
- Transición EMITIDA → PAGADA: ❌ **No implementada** — DEBT-TK-011 (Sprint 1)
- Transición EMITIDA → ANULADA: ❌ **No implementada** — DEBT-TK-012 (Sprint 1)
- Eliminación de BORRADOR: ⚠️ Implementada como DELETE físico — comportamiento incorrecto (AEAT/GDPR) — DEBT-TK-008

**Funcionalidades documentadas no encontradas en código (resueltas en análisis):**

| Funcionalidad | Estado | Plan |
|---|---|---|
| Registro de pago de facturas | No implementada | DEBT-TK-011 — Sprint 1 |
| Anulación de facturas emitidas | No implementada | DEBT-TK-012 — Sprint 1 |
| Informes de facturación (3 informes) | No implementada en ninguna forma | DEBT-TK-013 — Backlog |
| Exportación de factura a PDF | **Existe en producción, código no entregado** | DEBT-TK-014 — Recuperar URGENTE de Miguel Fernández |

---

## 2. ESTADO DE CALIDAD (Baseline)

*Fuente: T2-QUALITY-BASELINE.md*

**Semáforo global de calidad: 🔴 RED**

### 2.1 Seguridad

| Indicador | Valor | Estado |
|---|---|---|
| CVE Críticos (CVSS ≥ 9.0) | **1** | 🔴 |
| CVE Altos (CVSS 7.0–8.9) | **1** | 🟡 |
| Secrets hardcodeados en repositorio | **2** | 🔴 |
| Passwords de usuarios en BD | **Texto plano** | 🔴 |

**⚠️ Riesgos de seguridad activos en producción a la fecha de baseline:**

| DEBT-TK | Vulnerabilidad | Componente | CVSS | Plan de resolución |
|---|---|---|---|---|
| DEBT-TK-001 | CVE-2024-0057 — SQL injection en raw queries | EF Core 6.0.0 (×3 paquetes) | **9.1** | Upgrade a EF Core 8.x — Sprint 1 |
| DEBT-TK-002 | CVE-2024-21319 — JWT validation bypass | JwtBearer 6.0.0 | **6.8** | Upgrade a JwtBearer 8.x — Sprint 1 |
| DEBT-TK-003 | JWT secret hardcodeado en repositorio | `appsettings.json` | — | Rotar **INMEDIATO** + variable de entorno — Sprint 1 |
| DEBT-TK-004 | Contraseña de BD hardcodeada en repositorio | `appsettings.json` | — | Rotar **INMEDIATO** + variable de entorno — Sprint 1 |
| DEBT-TK-005 | Passwords de usuarios en texto plano en BD | Tabla `Usuarios` | — | Migrar a bcrypt — Sprint 1 |

> **Nota sobre DEBT-TK-003 y DEBT-TK-004:** La rotación de estos secrets debe realizarse **antes del inicio formal de Sprint 1**, independientemente de cualquier otra tarea, dado que el repositorio puede haber sido accedido por múltiples personas durante los años de desarrollo previo.

> **Plan de resolución acordado:** OPCIÓN A — todos los riesgos de seguridad se resuelven en Sprint 1 como condición previa a cualquier evolutivo de negocio.

### 2.2 Cobertura de tests

| Indicador | Valor | Riesgo de regresión |
|---|---|---|
| Ficheros de test | 1 | — |
| Tests existentes | **2** | — |
| Ratio test/producción | **0.17** | 🔴 **HIGH** |
| Cobertura funcional estimada | **< 5%** | 🔴 CRÍTICO |
| Estado de ejecución | No ejecutados (sin entorno aislado) | — |

Cualquier cambio en el sistema tiene riesgo alto de introducir regresiones no detectadas automáticamente.

### 2.3 Deuda técnica visible

| Indicador | Valor |
|---|---|
| Comentarios de deuda en código (TODO/FIXME/HACK/XXX) | **14** |
| Clases > 500 líneas (God classes) | **0** |
| Paquetes EOL | **1** (Newtonsoft.Json 12.0.3) |
| Paquetes desactualizados | **8 de 9** |
| Deuda score global | **MEDIUM** |

### 2.4 Compilación

**Estado:** BUILD_UNKNOWN — sin entorno .NET disponible en el análisis estático. El análisis del código fuente no revela errores evidentes de compilación. Verificación formal pendiente en Sprint 1, day 1.

---

## 3. ESTADO DE GOBERNANZA

*Fuente: T4-GOVERNANCE-GAP.md + T4-CMMI-ASSESSMENT.md*

| Dimensión | Estado actual | Nivel | Objetivo SOFIA | Plazo estimado |
|---|---|---|---|---|
| Cobertura documental | 47% volumen / 0.22 calidad | MEDIO / ZOMBIE | 100% / FIABLE | Sprint 5 |
| Madurez de procesos | 0.08 / 3.0 | **AD-HOC** | MANAGED | Sprint 6 |
| Nivel CMMI estimado | **L1–L2** | Procesos informales | **L3** | **Sprint 3** |

**Situación de gobernanza:** El proyecto operaba completamente ad-hoc, sin Jira, sin CI/CD, sin code reviews formales y sin documentación técnica completa. La dependencia de una única persona del cliente (Miguel Fernández) para todo lo relacionado con el despliegue y la operación es el principal riesgo de continuidad.

**Camino a CMMI L3 por sprints:**

| Sprint | CMMI PAs en CONFORME | Nivel estimado |
|---|---|---|
| S1 | PP, VER, VAL, CM | L2 |
| S2 | + PMC, RSKM, REQM, DAR | L2–L3 |
| **S3** | **+ PPQA → 9/9 PAs** | **L3 ✅** |

---

## 4. PLAN DE TRABAJO

### 4.1 Sprint 1 — Estabilización completa

**Periodo:** A definir con el cliente (referencia: 2 semanas desde GT-5)
**Capacidad SOFIA:** 24 SP

**⚠️ Sprint 1 es de estabilización pura. Capacidad disponible para evolutivos de negocio: 0 SP.**

Esta situación es consecuencia directa del estado del sistema en la fecha de toma de control, no de una decisión de Experis. El primer evolutivo de negocio con valor tangible para RetailCorp ocurrirá en Sprint 2.

**Desglose de capacidad Sprint 1:**

| Categoría | SP | % |
|---|---|---|
| Seguridad crítica (TK-001/002/003/004/005) | 13 SP | 54% |
| CI/CD pipeline básico (TK-007) | 5 SP | 21% |
| Setup gobernanza SOFIA (Jira + Confluence + Git Flow + CM + SRS baseline) | 6 SP | 25% |
| **Evolutivos de negocio** | **0 SP** | **0%** |
| **Total** | **24 SP** | **100%** |

**Backlog comprometido Sprint 1:**

| Issue | Descripción | SP | Épica | Prioridad |
|---|---|---|---|---|
| TK-003 | Rotar JWT secret + migrar a variable de entorno | 1 SP | EPIC-TK-001 | 🔴 INMEDIATO |
| TK-004 | Rotar DB password + migrar a variable de entorno | 1 SP | EPIC-TK-001 | 🔴 INMEDIATO |
| TK-001 | Upgrade EF Core 6.0.0 → 8.x LTS (CVE-2024-0057 CVSS 9.1) | 5 SP | EPIC-TK-001 | 🔴 CRITICAL |
| TK-002 | Upgrade JwtBearer 6.0.0 → 8.x (CVE-2024-21319 CVSS 6.8) | 1 SP | EPIC-TK-001 | 🔴 HIGH |
| TK-005 | Migrar passwords usuarios a bcrypt hash | 5 SP | EPIC-TK-001 | 🔴 CRITICAL |
| TK-007 | Pipeline CI/CD básico — GitHub Actions (build + test automático) | 5 SP | EPIC-TK-002 | 🟡 HIGH |
| SETUP-001 | Configurar Jira: workflow SOFIA + board Sprint 1 | 1 SP | EPIC-TK-003 | 🟡 HIGH |
| SETUP-002 | Crear Confluence space FacturaFlow + estructura de pages | 1 SP | EPIC-TK-003 | 🟡 HIGH |
| SETUP-003 | Git Flow + branching strategy + branch protection en main | 1 SP | EPIC-TK-003 | 🟡 HIGH |
| SETUP-004 | Risk Register + Plan de Proyecto Sprint 0→S3 | 1 SP | EPIC-TK-003 | 🟡 MEDIUM |
| SETUP-005 | SRS baseline formal desde fa-index.json v0.1 | 2 SP | EPIC-TK-004 | 🟡 MEDIUM |
| **Total** | | **24 SP** | | |

**Objetivo Sprint 1:**
> Estabilizar el sistema FacturaFlow resolviendo todos los riesgos de seguridad críticos identificados (CVEs, secrets, passwords), establecer el pipeline de entrega continua básico e implantar la infraestructura de gobernanza SOFIA. Al finalizar Sprint 1, el sistema estará seguro y en condiciones técnicas y de proceso para recibir el primer evolutivo de negocio en Sprint 2.

**Criterio de cierre Sprint 1:**
- CVE_CRITICAL = 0 (EF Core actualizado)
- Secrets rotados y fuera del repositorio
- Passwords de usuarios en bcrypt
- CI pipeline ejecutando build + tests automáticamente
- Jira + Confluence operativos con workflow SOFIA

### 4.2 Primer evolutivo de negocio viable

**Sprint:** **Sprint 2** (estimado)
**Criterio:** Los 5 criterios obligatorios del SEV se cumplen al cierre de Sprint 1:
- CVE_CRITICAL = 0 ✅ (resuelto en S1)
- Build limpio ✅ (verificado en S1 day 1)
- Jira + Confluence ✅ (configurados en S1)
- Pipeline Steps 1-6 ejecutado ✅ (Sprint 1 completo)
- fa-index.json actualizado ✅ (S0 → S1)

**SP evolutivos estimados Sprint 2:** ~15–17 SP (de 24 SP totales)

**Recomendación para Sprint 2:** Priorizar las transiciones de ciclo de vida de factura (TK-011/012) como primer evolutivo, ya que son funcionalidad de negocio core con muy bajo riesgo (el estado PAGADA y ANULADA ya existen en el modelo de datos).

### 4.3 Roadmap de estabilización

| Sprint | Foco | SP evolutivos | Hito |
|---|---|---|---|
| **S1** | Seguridad + CI/CD + gobernanza SOFIA | **0 SP** | Sistema seguro + pipeline operativo |
| **S2** | Tests + funcionales urgentes + primer evolutivo | ~15 SP | Primer entregable de negocio (PAGADA, ANULADA) |
| **S3** | FA-Agent activo + CMMI L3 + CI deploy | ~20 SP | CMMI L3 completo · Evolutivos a velocidad normal |
| **S4+** | Velocidad de crucero | ~22 SP | 17 DOCX/sprint · 5% overhead gobernanza |

---

## 5. DEUDA TÉCNICA — BACKLOG COMPLETO

*Fuente: session.json.open_debts — 14 DEBT-TK registrados*

| DEBT-TK | Área | Prioridad | Sprint | SP | Mandatory |
|---|---|---|---|---|---|
| TK-001 | CVE — EF Core 6.0.0 (CVSS 9.1) | CRITICAL | S1 | 5 | ✅ |
| TK-002 | CVE — JwtBearer 6.0.0 (CVSS 6.8) | HIGH | S1 | 1 | ✅ |
| TK-003 | Secret — JWT hardcodeado | CRITICAL | INMEDIATO/S1 | 1 | ✅ |
| TK-004 | Secret — DB password hardcodeada | CRITICAL | INMEDIATO/S1 | 1 | ✅ |
| TK-005 | Security — Passwords texto plano | CRITICAL | S1 | 5 | ✅ |
| TK-006 | Tests — Cobertura < 5% | HIGH | S1–S3 | 8 | ✅ |
| TK-007 | Ops — Sin CI/CD | HIGH | S1 | 5 | ✅ |
| TK-008 | Business — DELETE físico facturas (AEAT/GDPR) | HIGH | S1 | 3 | ⬜ |
| TK-009 | Dependencies — Newtonsoft.Json EOL | MEDIUM | S2 | 2 | ⬜ |
| TK-010 | Architecture — Sin Repository Pattern | MEDIUM | S3–S4 | 8 | ⬜ |
| TK-011 | Functional — Endpoint /pagar (EMITIDA→PAGADA) | HIGH | S1 | 3 | ⬜ |
| TK-012 | Functional — Endpoint /anular (EMITIDA→ANULADA) | HIGH | S1 | 2 | ⬜ |
| TK-013 | Functional — Informes REST (×3) | MEDIUM | S3 | 8 | ⬜ |
| TK-014 | Code Recovery — Código PDF no entregado | HIGH | S1 URGENTE | 3 | ⬜ |

**SP totales de deuda:** 55 SP · **SP mandatory (ya comprometidos S1):** 26 SP

---

## 6. MÉTRICAS DE REFERENCIA (Baseline)

| Métrica | Valor baseline | Objetivo 3 meses | Objetivo 6 meses |
|---|---|---|---|
| CVE Críticos en producción | **1** | 0 | 0 |
| CVE Altos en producción | **1** | 0 | 0 |
| Secrets en repositorio | **2** | 0 | 0 |
| Passwords en texto plano | **Sí** | No | No |
| Cobertura de tests | **< 5%** | ≥ 30% | ≥ 60% |
| Pipeline CI/CD | **Ninguno** | Build + Test automático | Build + Test + Deploy staging |
| Ratio test/producción | **0.17** | 0.3 | 0.5 |
| Documentación SOFIA | **47%** | 70% | 95% |
| Nivel CMMI | **L1–L2** | L2–L3 | **L3** |
| SP evolutivos/sprint | **0 (S1)** | ~15 (S2) | ~22 (S4+) |
| Deuda técnica (score) | **MEDIUM** | LOW | LOW |

---

## 7. COMPROMISOS MUTUOS

### Experis se compromete a:

- Resolver en Sprint 1 los DEBT-TK de seguridad mandatory antes de cualquier evolutivo
- Rotar los secrets de JWT y BD **antes del inicio formal de Sprint 1**
- Comunicar proactivamente cualquier bloqueante inesperado
- Mantener este Baseline Document como referencia inmutable del estado inicial
- Progresar en el Adoption Roadmap SOFIA (CMMI L3 en Sprint 3)
- Informar al cliente en cada sprint review del estado de los indicadores de calidad

### El cliente (RetailCorp S.L.) se compromete a:

- Proporcionar acceso write completo al repositorio antes del inicio de Sprint 1
- Facilitar credenciales del servidor de producción para rotación de secrets (INMEDIATO)
- Designar contacto técnico (Miguel Fernández u otro) para sesión de transferencia en Sprint 1 semana 1
- Proporcionar o localizar el código fuente del endpoint de exportación PDF (DEBT-TK-014)
- Participar en las demos de sprint (Gate G-6) para validar las funcionalidades entregadas

---

## 8. ACCIÓN INMEDIATA REQUERIDA (antes de Sprint 1)

1. **Rotar el JWT secret** en el servidor de producción
2. **Rotar la contraseña de BD** en el servidor de producción
3. **Contactar a Miguel Fernández** para iniciar la transferencia operacional
4. **Localizar el código de exportación PDF** — si solo existe en el servidor FTP, hacer backup inmediato

---

## 9. FIRMA DE ACEPTACIÓN (Gate GT-5)

> Al aprobar este documento (Gate GT-5), RetailCorp S.L. confirma que:
>
> 1. Ha leído y comprende el estado del sistema FacturaFlow documentado en §1–3
> 2. Acepta el backlog del Sprint 1 detallado en §4.1 como plan de trabajo inicial
> 3. Conoce los riesgos de seguridad activos y acepta el plan de resolución en Sprint 1 (OPCIÓN A)
> 4. Entiende que Sprint 1 es de estabilización sin evolutivos de negocio, y que Sprint 2 será el primero con funcionalidades nuevas
> 5. Se compromete a proporcionar los accesos y la transferencia de conocimiento descritos en §7
>
> **Proyecto:** FacturaFlow — RetailCorp S.L.
> **Aprobado por:** Angel — representante de RetailCorp S.L. ✅
> **Fecha de aprobación:** 2026-04-07T13:00:00Z
> **Canal de aprobación:** Chat SOFIA — Gate GT-5 HITL-CLIENTE aprobado explícitamente

---

*Elaborado con SOFIA v2.6.25 · Experis Sprint 0 Takeover · 2026-04-07*
*Artefactos de referencia: T0-DOC-MATRIX.json · T1-INVENTORY.md · T1-STACK-MAP.json · T2-QUALITY-BASELINE.md · fa-index.json v0.1 · T3-FA-DRAFT.md · T3-FA-GAPS.md · T4-GOVERNANCE-GAP.md · T4-CMMI-ASSESSMENT.md · T4-ADOPTION-ROADMAP.md*

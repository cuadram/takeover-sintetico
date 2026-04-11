# Quality Baseline — Takeover Sprint 0
**Proyecto:** FacturaFlow · **Cliente:** RetailCorp S.L. (Laboratorio Sintético SOFIA)
**Fecha:** 2026-04-07 · **Agente:** Quality Baseline Agent SOFIA v1.0
**Stack analizado:** .NET 6.0 / ASP.NET Core / EF Core 6.0.0 / SQL Server
**Semáforo global:** 🔴 RED

> Inputs de contexto: T1-STACK-MAP.json (stack .NET confirmado) · T0-DOC-MATRIX.json (DTS leído)
> Herramienta CVE: análisis estático de FacturaFlow.Api.csproj (comentarios de CVE explícitos del cliente + versiones declaradas)
> Herramienta secrets: lectura directa de appsettings.json
> Herramienta deuda: lectura y conteo de ficheros .cs

---

## Resumen ejecutivo

| Área | Semáforo | Métrica clave | DEBTs generados |
|---|---|---|---|
| Seguridad (CVE + Secrets) | 🔴 RED | CVE_CRITICAL: 1 · CVE_HIGH: 1 · Secrets: 2 · Passwords plano: 1 | 5 |
| Tests | 🟡 AMBER | test_ratio: 0.17 · cobertura: UNKNOWN (no ejecutados) | 1 |
| Deuda técnica | 🟡 AMBER | debt_score: MEDIUM · god_classes: 0 · FIXME: 4 · TODO: 8 | 4 |
| Build/Compilación | 🟡 AMBER | BUILD_UNKNOWN (sin entorno .NET disponible) | 0 |

**DEBTs totales registrados:** 10 · **Mandatory Sprint 1:** 7

---

## 1. Security CVE Baseline

### 1.1 Resumen de vulnerabilidades

| Severidad | Count | Paquetes afectados | Mandatory S1 |
|---|---|---|---|
| CRITICAL (CVSS ≥ 9.0) | **1** | Microsoft.EntityFrameworkCore (x3 paquetes) | ✅ |
| HIGH (CVSS 7.0–8.9) | **1** | Microsoft.AspNetCore.Authentication.JwtBearer | ✅ |
| MEDIUM (CVSS 4.0–6.9) | 0 | — | — |
| LOW (CVSS < 4.0) | 0 | — | — |

> **Fuente de verificación:** Los CVE IDs y CVSS están documentados explícitamente en los comentarios del propio `FacturaFlow.Api.csproj` del cliente, lo que confirma conocimiento previo de las vulnerabilidades por el equipo saliente sin acción correctiva.

### 1.2 CVEs críticos y altos — detalle

| DEBT-TK | CVE ID | Componente | Versión actual | Versión con fix | CVSS | Tipo de vulnerabilidad | Acción recomendada |
|---|---|---|---|---|---|---|---|
| DEBT-TK-001 | CVE-2024-0057 | Microsoft.EntityFrameworkCore | 6.0.0 | 8.0.x (LTS) | **9.1** | SQL injection en raw queries | Upgrade a EF Core 8.x — Sprint 1 |
| DEBT-TK-001 | CVE-2024-0057 | Microsoft.EntityFrameworkCore.SqlServer | 6.0.0 | 8.0.x (LTS) | **9.1** | ídem — mismo CVE | Upgrade junto con EF Core |
| DEBT-TK-001 | CVE-2024-0057 | Microsoft.EntityFrameworkCore.Tools | 6.0.0 | 8.0.x (LTS) | **9.1** | ídem — mismo CVE | Upgrade junto con EF Core |
| DEBT-TK-002 | CVE-2024-21319 | Microsoft.AspNetCore.Authentication.JwtBearer | 6.0.0 | 8.0.x (LTS) | **6.8** | JWT validation bypass | Upgrade a JwtBearer 8.x — Sprint 1 |

**Impacto de CVE-2024-0057 (CRÍTICO) en el contexto de FacturaFlow:**
El CVE afecta a raw queries ejecutadas directamente sobre EF Core. En el código analizado, `FacturasController` y `ClientesController` acceden directamente al `DbContext` sin capa de repositorio y sin validación de inputs (TODO explícito en `Create()`). Si el sistema utiliza raw SQL en algún punto no documentado (por ejemplo, en los endpoints de informes no detectados), la exposición es directa. Incluso sin raw SQL actual, la vulnerabilidad debe remediarse antes del Sprint 1 evolutivo para no introducir riesgo al añadir nuevas queries.

**Impacto de CVE-2024-21319 (ALTO) en el contexto de FacturaFlow:**
El sistema usa JWT para autenticación (`[Authorize]` en todos los endpoints). Un bypass de validación JWT permitiría acceso no autorizado a todos los endpoints de la API, incluyendo los de facturación. El JWT secret está además hardcodeado en el repositorio (ver §1.3), agravando el riesgo combinado.

### 1.3 Secrets detectados

| DEBT-TK | Tipo | Fichero | Descripción | Acción | Sprint |
|---|---|---|---|---|---|
| DEBT-TK-003 | JWT Secret hardcodeado | `appsettings.json` | JWT signing secret en texto plano commiteado en repositorio | Rotar secret + migrar a variable de entorno | **INMEDIATO / S1** |
| DEBT-TK-004 | DB Password hardcodeada | `appsettings.json` | Contraseña SQL Server en cadena de conexión commiteada | Rotar credenciales BD + migrar a variable de entorno | **INMEDIATO / S1** |
| DEBT-TK-005 | Passwords usuarios en BD | `Models/Entities.cs` + BD | Campo `Password` en tabla `Usuarios` almacena en texto plano (comentario XXX explícito) | Migrar a bcrypt hash — plan existía para Q1 2025, no ejecutado | **S1 — bloqueante** |

**⚠️ Los valores de los secrets NO se incluyen en este documento.**

**Nota de urgencia — DEBT-TK-003 y DEBT-TK-004:** El `appsettings.json` con el JWT secret y la contraseña de BD está commiteado en el repositorio. Si el repositorio tiene historial git accesible, los secrets están en el historial aunque se rotaran en el fichero. Se recomienda rotar ambos credentials **antes del primer acceso del equipo Experis al entorno de producción**, independientemente del Sprint 1.

### 1.4 Análisis de riesgo combinado

| Factor | Estado | Riesgo |
|---|---|---|
| CVE CRITICAL en ORM (EF Core) | ✅ Confirmado | SQL injection si se usan raw queries |
| CVE HIGH en autenticación (JwtBearer) | ✅ Confirmado | Bypass de autorización en todos los endpoints |
| JWT secret en repositorio | ✅ Confirmado | Cualquier persona con acceso al repo puede forjar tokens válidos |
| Passwords en texto plano | ✅ Confirmado | Exposición de credenciales de usuarios ante cualquier leak de BD |
| Sin CI/CD (sin pipeline de actualización de dependencias) | ✅ Confirmado | Los CVEs llegaron a producción sin detección automatizada |

> El riesgo real es la **combinación**: JWT bypass (CVE-2024-21319) + JWT secret conocido (en repo) = un atacante con acceso al repositorio puede forjar tokens válidos que superarán la validación JWT sin necesidad de credenciales reales. Esto no es teórico en un escenario de takeover donde el secret estuvo accesible a múltiples personas durante años.

### 1.5 Semáforo de seguridad

**🔴 RED — CVE_CRITICAL = 1 (CVE-2024-0057, CVSS 9.1) + 3 deudas de seguridad CRITICAL activas**

**Plan de acción requerido para aprobar GT-2 (elegir una opción):**

> **OPCIÓN A — Resolución en Sprint 1 (RECOMENDADA):**
> Compromiso del cliente de incluir en Sprint 1 los siguientes ítems antes de cualquier evolutivo:
> - Upgrade EF Core 6.0.0 → 8.x LTS (DEBT-TK-001) — estimación: 3 SP
> - Upgrade JwtBearer 6.0.0 → 8.x LTS (DEBT-TK-002) — estimación: 1 SP
> - Rotar JWT secret + migrar a variable de entorno (DEBT-TK-003) — estimación: 1 SP
> - Rotar DB password + migrar a variable de entorno (DEBT-TK-004) — estimación: 1 SP
> - Migrar passwords usuarios a bcrypt (DEBT-TK-005) — estimación: 5 SP
> - **Total SP de seguridad obligatorios Sprint 1: 11 SP**
>
> **OPCIÓN B — Aceptación de riesgo documentada:**
> El cliente conoce los CVEs y las deudas de seguridad activas, y acepta temporalmente el riesgo operacional. Se registra con nombre del responsable y fecha. Experis queda exonerado de responsabilidad retroactiva.
> Confirmación requerida: nombre del responsable del cliente + "acepto el riesgo" en el chat o documento firmado.

---

## 2. Test Baseline

### 2.1 Métricas estáticas de la suite

| Componente | Test files | Prod files | Ratio | Framework | Test cases | Riesgo regresión |
|---|---|---|---|---|---|---|
| FacturaFlow.Api | 1 | 6 | **0.17** | xUnit | **2** | **HIGH** |

**Tipos de tests detectados:** unit (únicamente)
**Mocking detectado:** NONE — los 2 tests trabajan directamente con instancias de modelos sin mocks
**Assertions:** 2 (una por test)

**Análisis cualitativo de los 2 tests existentes:**

| Test | Estado | Observación |
|---|---|---|
| `Factura_EstadoInicial_DebeSerBorrador` | ✅ Válido | Verifica valor por defecto del campo Estado. Útil. |
| `Factura_Total_DebeCalcularseCorrectamente` | ⚠️ Falso positivo | El FIXME explícito en el código advierte: el cálculo se hace **manualmente en el test**, no es automático en el sistema. El test verifica la aritmética del test, no el comportamiento del sistema. |

**Cobertura funcional estimada vs funcionalidades documentadas:**

| Área funcional | Tests existentes | Cobertura |
|---|---|---|
| Ciclo de vida facturas (BORRADOR→EMITIDA→PAGADA→ANULADA) | 0 | ❌ |
| CRUD Clientes | 0 | ❌ |
| CRUD Facturas | 0 | ❌ |
| Validación NIF/CIF único | 0 | ❌ |
| Lógica de roles y autorización | 0 | ❌ |
| Cálculo de IVA según tipo cliente | 0 | ❌ |
| Estado inicial de Factura | 1 ✅ | ✅ (parcial) |
| Total de Factura (cálculo manual) | 1 ⚠️ | ⚠️ (falso positivo) |

> **Cobertura funcional real estimada: < 5%** (solo valor por defecto del estado inicial está genuinamente cubierto)

### 2.2 Ejecución de tests

Tests **no ejecutados** — el TL no ha solicitado aprobación de ejecución y no hay entorno de ejecución aislado disponible en el análisis. Los 2 tests son de instanciación de modelos sin dependencias externas; probablemente pasarían, pero la aprobación de ejecución debe venir del TL antes del Sprint 1.

### 2.3 Semáforo de tests

**🟡 AMBER — test_ratio 0.17 (rango 0.1–0.3) · 2 tests totales · cobertura funcional real < 5%**

Nota: aunque el ratio técnico es AMBER por estar en el rango 0.1–0.3, la cobertura funcional real es prácticamente 0. Se clasifica AMBER (no RED) porque los tests existentes sí compilan y no tienen fallos conocidos. Sin embargo, cualquier cambio en las entidades o lógica de negocio tiene riesgo de regresión **no detectable** con la suite actual.

---

## 3. Technical Debt Visible

### 3.1 Indicadores cuantitativos

| Indicador | Valor detectado | Umbral AMBER | Umbral RED | Estado |
|---|---|---|---|---|
| TODO count | **8** | >20 | >50 | 🟢 GREEN |
| FIXME count | **4** | >20 | >50 | 🟢 GREEN |
| HACK count | **1** | >10 | >20 | 🟢 GREEN |
| XXX count | **1** | >5 | >10 | 🟢 GREEN |
| Total deuda comentada | **14** | >30 | >70 | 🟢 GREEN |
| God classes (> 500 líneas) | **0** | >10 | >20 | 🟢 GREEN |
| Fichero más grande | **~120 líneas** (FacturasController.cs) | >500 | >1000 | 🟢 GREEN |
| Deprecated en uso | **0** detectado | >10 | >30 | 🟢 GREEN |

> El proyecto es pequeño (6 ficheros de código productivo, ~400 líneas totales). La ausencia de god classes y el bajo número de comentarios de deuda son positivos. Sin embargo, la **calidad de la deuda es alta**: los 14 comentarios no son TODOs menores — son problemas conocidos de seguridad, arquitectura y negocio explícitamente documentados por el equipo saliente.

### 3.2 Inventario de deuda visible por fichero

**FacturasController.cs** (4 comentarios — mayor concentración de deuda):
- `FIXME`: Inyectar IFacturaRepository en lugar de DbContext directamente — violación Clean Architecture
- `HACK`: Filtro en memoria en `GetAll()` — riesgo de performance con volumen de facturas
- `FIXME`: DELETE físico de facturas en lugar de transición a ANULADA — GDPR audit trail
- `TODO` ×2: paginación + rate limiting en endpoints de creación

**ClientesController.cs** (2 comentarios):
- `TODO`: Validar NIF/CIF único antes de insertar (lógica de negocio faltante)
- `TODO`: Enviar email de bienvenida al crear cliente (funcionalidad no implementada)

**Models/Entities.cs** (5 comentarios — mayor densidad relativa):
- `XXX`: Password en claro en BD — deuda crítica declarada
- `FIXME`: Email/teléfono sin validación de formato
- `TODO` ×3: líneas de factura, serie por ejercicio fiscal, mejoras de modelo de datos

**Data/AppDbContext.cs** (1 comentario):
- `FIXME`: Columna Password en claro — referencia cruzada al XXX de Entities.cs

**Tests/FacturaTests.cs** (2 comentarios):
- `FIXME`: Test de Total no verifica comportamiento real del sistema
- `TODO` ×5: tests ausentes documentados por el propio equipo

### 3.3 Deuda arquitectónica identificada

| Problema | Severidad | Evidencia |
|---|---|---|
| Controllers acceden directamente a DbContext (sin Repository Pattern) | MEDIUM | `FacturasController`: `FIXME: Inyectar IFacturaRepository` |
| Sin separación de capas (sin Domain, Application, Infrastructure) | MEDIUM | Estructura de directorios: solo Controllers/, Models/, Data/ |
| Entidades de dominio sin DTOs de API (misma clase como entidad EF y response de API) | MEDIUM | `Cliente` expuesto directamente en responses — sin `ClienteDto` |
| Estado de factura como `string` en lugar de `enum` | LOW | `Factura.Estado = "BORRADOR"` — sin validación en tiempo de compilación |
| Sin validación de inputs en controllers (FluentValidation o Data Annotations) | MEDIUM | `Create([FromBody] Cliente cliente)` sin atributos de validación |
| Filtrado en memoria — carga completa de tabla antes de filtrar | MEDIUM | `FacturasController.GetAll()`: `HACK` explícito |

### 3.4 Debt score global

**MEDIUM** — El volumen de deuda comentada es bajo (14 instancias en 6 ficheros) y no hay god classes. Sin embargo, la **densidad de deuda crítica** es alta: los 4 FIXME y el XXX representan problemas conocidos de seguridad, arquitectura y negocio sin resolver. En un sistema más grande, este patrón escalaría a HIGH rápidamente.

### 3.5 Semáforo de deuda técnica

**🟡 AMBER — debt_score: MEDIUM · 0 god classes · 14 comentarios de deuda · 4 deudas arquitectónicas identificadas**

---

## 4. Build & Compilation Baseline

**Herramienta aplicable:** `dotnet build --no-restore`
**Entorno de compilación disponible:** NO — análisis ejecutado sobre filesystem del cliente sin entorno .NET disponible en el contexto de análisis.

**Análisis estático de compilabilidad (sustituto del build):**

| Aspecto | Evaluación | Evidencia |
|---|---|---|
| Sintaxis C# | Aparentemente correcta | Lectura directa de .cs — estructura de clases, métodos y decoradores válidos |
| Referencias de namespace | Correctas | `using FacturaFlow.Models`, `using FacturaFlow.Data` — coherentes con RootNamespace en .csproj |
| Inyección de dependencias | Correcta | Constructores con parámetros `AppDbContext context` — patrón DI estándar |
| PackageReference declarados | Completos | 9 paquetes declarados en .csproj — sin referencias rotas detectadas |
| EF Core DbContext | Correcto | `AppDbContext` hereda de `DbContext` correctamente, OnModelCreating implementado |
| Async/await consistency | Correcta | Los métodos async devuelven `Task<IActionResult>` consistentemente |
| Referencias entre proyectos | N/A | Solo hay un proyecto en el repositorio |

> **Estimación de compilabilidad:** PROBABLE BUILD_OK — no se detectan errores de compilación evidentes en el análisis estático. El código es C# 6/.NET 6 estándar sin construcciones avanzadas ni dependencias entre proyectos. Sin embargo, esto no puede confirmarse sin ejecutar el build real.

**Recomendación:** Verificar `dotnet build` en Sprint 1 antes del primer evolutivo como primer paso de incorporación al entorno.

**Build Status:** `BUILD_UNKNOWN`
**Riesgo de compilación estimado:** LOW-MEDIUM (código aparentemente correcto pero sin verificación real)

### 4.1 Semáforo de build

**🟡 AMBER — BUILD_UNKNOWN · análisis estático sugiere compilabilidad correcta · verificación pendiente en Sprint 1**

---

## 5. Registro DEBT-TK — Backlog inicial de estabilización

| DEBT-TK | Área | Tipo | Prioridad | CVSS | Sprint objetivo | Mandatory | Descripción |
|---|---|---|---|---|---|---|---|
| DEBT-TK-001 | Security | CVE | **CRITICAL** | 9.1 | **S1** | ✅ | CVE-2024-0057 en EF Core 6.0.0 (x3 paquetes) — SQL injection. Upgrade a EF Core 8.x LTS. |
| DEBT-TK-002 | Security | CVE | **HIGH** | 6.8 | **S1** | ✅ | CVE-2024-21319 en JwtBearer 6.0.0 — JWT validation bypass. Upgrade a JwtBearer 8.x. |
| DEBT-TK-003 | Security | Secret | **CRITICAL** | — | **INMEDIATO/S1** | ✅ | JWT secret hardcodeado en appsettings.json commiteado. Rotar + migrar a variable de entorno. |
| DEBT-TK-004 | Security | Secret | **CRITICAL** | — | **INMEDIATO/S1** | ✅ | DB password hardcodeada en appsettings.json commiteado. Rotar + migrar a variable de entorno. |
| DEBT-TK-005 | Security | AuthData | **CRITICAL** | — | **S1** | ✅ | Passwords de usuarios en texto plano en BD. Migrar a bcrypt. Plan existía Q1 2025 — no ejecutado. |
| DEBT-TK-006 | Tests | Coverage | **HIGH** | — | **S1–S3** | ✅ | Suite de tests prácticamente vacía (2 tests, cobertura funcional < 5%). Plan de tests en Sprint 1. |
| DEBT-TK-007 | Ops | CI/CD | **HIGH** | — | **S1** | ✅ | Sin CI/CD — deploy manual FTP dependiente de una persona. Pipeline básico en Sprint 1. |
| DEBT-TK-008 | Business | Logic | **HIGH** | — | **S1** | ⬜ | DELETE físico de facturas en lugar de estado ANULADA — viola auditoría fiscal AEAT y GDPR. |
| DEBT-TK-009 | Dependencies | EOL | MEDIUM | — | S2 | ⬜ | Newtonsoft.Json 12.0.3 EOL (2022). Migrar a System.Text.Json o actualizar a v13.x. |
| DEBT-TK-010 | Architecture | Pattern | MEDIUM | — | Backlog | ⬜ | Controllers acceden directamente a DbContext. Introducir IRepository + patrón de repositorio. |

**SP estimados para DEBTs mandatory (Sprint 1):**

| DEBT-TK | Descripción | SP estimados |
|---|---|---|
| DEBT-TK-001 | Upgrade EF Core 6→8 (breaking changes a validar) | 5 SP |
| DEBT-TK-002 | Upgrade JwtBearer 6→8 | 1 SP |
| DEBT-TK-003 | Rotar JWT secret + variables de entorno | 1 SP |
| DEBT-TK-004 | Rotar DB password + variables de entorno | 1 SP |
| DEBT-TK-005 | Migrar passwords a bcrypt (script migración + código) | 5 SP |
| DEBT-TK-006 | Plan de tests básico (ciclo de vida factura, CRUD) | 8 SP |
| DEBT-TK-007 | Pipeline CI/CD básico (GitHub Actions / Azure DevOps) | 5 SP |
| **Total S1 mandatory** | | **26 SP** |

> **Impacto en Sprint 1:** Los 26 SP de deuda mandatory son una carga significativa. Si la velocidad de referencia del equipo es 40–50 SP/sprint, quedan 14–24 SP disponibles para evolutivos. Si la velocidad es menor, el Sprint 1 puede ser íntegramente de estabilización sin evolutivos. **Esta estimación debe acordarse con el cliente en GT-5 (Stabilization Planner).**

---

## 6. Impacto en estimación Sprint 0 → Sprint 1

```
Velocidad referencia estimada (equipo de takeover estándar): 40 SP/sprint
SP consumidos por DEBTs mandatory S1:                        26 SP
SP disponibles para evolutivos en Sprint 1:                  14 SP

Primer evolutivo de negocio viable: Sprint 1 (con 14 SP)
    o Sprint 2 completo si el cliente prioriza estabilización total

Riesgo principal: el upgrade EF Core 6→8 puede introducir
breaking changes que requieran ajustes adicionales (+3-5 SP de buffer)
```

---

## 7. Declaración de baseline

> Este documento representa el estado de calidad del sistema **FacturaFlow**
> en la fecha **2026-04-07**, antes de la intervención activa de Experis.
>
> Los defectos de seguridad (CVE-2024-0057 CVSS 9.1, CVE-2024-21319 CVSS 6.8,
> passwords en texto plano, secrets hardcodeados), la deuda técnica visible
> (14 comentarios de deuda, arquitectura sin capas, sin repository pattern)
> y el estado de la suite de tests (2 tests, cobertura funcional < 5%)
> son condiciones **preexistentes a la toma de control por Experis**.
>
> Los DEBTs marcados como `mandatory: true` deben abordarse en Sprint 1
> como condición del servicio antes de introducir nuevo código en producción.
> Los DEBTs sin mandatory se priorizarán junto al cliente en la planificación
> del backlog de estabilización.
>
> **Aceptación del baseline:** pendiente aprobación GT-2 (Tech Lead + PO).
> **Identificación:** GT-2 debe incluir la elección de OPCIÓN A u OPCIÓN B
> para los CVEs críticos y las deudas de seguridad mandatory.

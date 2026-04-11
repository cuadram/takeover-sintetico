# Inventario Técnico — Takeover Sprint 0
**Proyecto:** FacturaFlow · **Cliente:** RetailCorp S.L. (Laboratorio Sintético SOFIA)
**Fecha:** 2026-04-06 · **Agente:** Inventory Agent SOFIA v1.0
**Repositorio analizado:** `/repo-cliente/` · **Commit/Tag:** UNKNOWN (sin git metadata)

> DTS de referencia (T0-DOC-MATRIX.json): FUNC=0.645 GOOD | API=0.820 TRUSTED | ARCH=0.210 POOR/ZOMBIE

---

## 1. Stack Detectado

| Componente | Tipo | Stack | Runtime | Framework | Build Tool | Confianza |
|---|---|---|---|---|---|---|
| FacturaFlow.Api | backend/monolito | dotnet | .NET 6.0 | ASP.NET Core 6.0 | dotnet CLI | HIGH |

**Arquitectura general:** Monolito — un único proyecto .csproj, un único punto de despliegue, una única base de datos SQL Server.

**Evidencia:** `FacturaFlow.Api.csproj` con `<TargetFramework>net6.0</TargetFramework>` + `Microsoft.AspNetCore.Authentication.JwtBearer`. Un único namespace `FacturaFlow`. Sin subdirectorios de módulos independientes. Sin `docker-compose.yml`. Sin múltiples `.csproj`.

**Frontend:** NONE detectado. La API expone Swagger UI en `/swagger` (Swashbuckle). No hay proyecto Angular/React/Vue en el repositorio.

---

## 2. Dependencias

### 2.1 Resumen por componente

| Componente | Total deps | Outdated | EOL | CVE riesgo alto | Licencias problemáticas |
|---|---|---|---|---|---|
| FacturaFlow.Api | 9 | 4 | 1 | 4 paquetes | 0 |

### 2.2 Dependencias — inventario completo

| Paquete | Versión declarada | Estado | Riesgo CVE | Licencia | Nota |
|---|---|---|---|---|---|
| Microsoft.AspNetCore.Authentication.JwtBearer | 6.0.0 | OUTDATED | **KNOWN_HIGH** | MIT | CVE-2024-21319 (CVSS 6.8) — JWT validation bypass. Anotado en .csproj. |
| Microsoft.EntityFrameworkCore | 6.0.0 | OUTDATED | **KNOWN_HIGH** | MIT | CVE-2024-0057 (CVSS 9.1) — SQL injection en raw queries. Anotado en .csproj. |
| Microsoft.EntityFrameworkCore.SqlServer | 6.0.0 | OUTDATED | **KNOWN_HIGH** | MIT | Mismo CVE que EF Core. |
| Microsoft.EntityFrameworkCore.Tools | 6.0.0 | OUTDATED | **KNOWN_HIGH** | MIT | Mismo CVE que EF Core. |
| AutoMapper | 10.1.1 | OUTDATED | SUSPECTED | MIT | Current: 13.x. >2 majors atrás. |
| AutoMapper.Extensions.Microsoft.DependencyInjection | 8.1.1 | OUTDATED | SUSPECTED | MIT | Ligado a AutoMapper — actualizar en conjunto. |
| Swashbuckle.AspNetCore | 6.2.3 | OUTDATED | CLEAN | MIT | Current: 6.9.x. Minor outdated. |
| Serilog.AspNetCore | 4.1.0 | OUTDATED | SUSPECTED | Apache 2.0 | Current: 8.x. >3 majors atrás. |
| Newtonsoft.Json | 12.0.3 | **EOL** | SUSPECTED | MIT | EOL desde 2022. Current: 13.x. Migrar a System.Text.Json. |

### 2.3 Métricas de dependencias

```
total_dependencies:      9
outdated:                8  (todos los paquetes están desactualizados respecto al major actual)
eol:                     1  (Newtonsoft.Json 12.0.3)
known_high_cve:          4  (JwtBearer 6.0.0 + EF Core x3)
suspected_cve:           3  (AutoMapper 10, Serilog 4, Newtonsoft 12)
commercial_ok_licenses:  9
copyleft_licenses:       0
unknown_licenses:        0
```

> ⚠️ El análisis de CVEs es preliminar (lectura estática de versiones declaradas). El Quality Baseline Agent (T-2) realizará validación completa con herramientas de análisis de seguridad.

---

## 3. Mapa de Arquitectura

### 3.1 Patrón arquitectónico
**Detectado:** Monolito sin capas (Flat Monolith)
**Evidencia:** Un único proyecto .csproj. Estructura de directorios plana: `Controllers/`, `Models/`, `Data/`, `Tests/`. Sin `Domain/`, `Application/`, `Infrastructure/`. Sin interfaces de repositorio. Sin casos de uso explícitos.

### 3.2 Separación de responsabilidades

**Indicadores positivos encontrados:**
- DTOs diferenciados en `Models/Entities.cs` (aunque no están separados formalmente como DTOs)
- `AppDbContext` en directorio `Data/` separado de `Models/`
- Uso de `[Authorize(Roles = "...")]` — autorización declarativa correcta
- Inyección de dependencias de `AppDbContext` por constructor (DI correcto)

**Indicadores de deuda arquitectónica:**
- `FacturasController` inyecta `AppDbContext` directamente — viola Clean Architecture (comentario `FIXME` explícito en el código: *"Inyectar IFacturaRepository en lugar de DbContext directamente"*)
- `ClientesController` ídem — acceso directo a la BD desde la capa de presentación
- Lógica de filtrado en memoria en `FacturasController.GetAll()` — `HACK` comentado explícitamente: *"migrar a IQueryable con filtros en BD"*
- No existe capa `Application/` ni `Domain/` — sin puertos, sin casos de uso
- Entidades de dominio sin separación de entidades de infraestructura (misma clase `Cliente` usada como entidad EF y como modelo de API)
- Estado de factura como `string` en lugar de `enum` — sin validación en tiempo de compilación
- `DELETE` físico de facturas (`FacturasController.Delete`) en lugar de transición a `ANULADA` — comentado como `FIXME` con referencia a GDPR audit trail
- Sin validación de NIF/CIF único antes de insertar (`TODO` explícito en `Create`)
- Sin cálculo automático del total de factura (`TODO` en `Create`)

### 3.3 Persistencia

| Aspecto | Valor detectado | Fuente |
|---|---|---|
| BD principal | SQL Server | `appsettings.json` ConnectionStrings + `Microsoft.EntityFrameworkCore.SqlServer` en .csproj |
| ORM | EF Core 6.0.0 | `FacturaFlow.Api.csproj` + `AppDbContext.cs` |
| Migraciones | SQL manual (1 fichero) | `Migrations/20220315_InitialCreate.sql` — SQL puro, NO son EF Migrations (.cs). Sin historial de versiones de migración. |
| Cache | NONE | No detectado |
| Mensajería | NONE | No detectado |

**Modelo de datos detectado (desde `AppDbContext.cs` + `Entities.cs` + SQL migration):**
- **Tabla Clientes:** Id (PK), RazonSocial, NifCif (UNIQUE), Email, Telefono, Direccion, Activo, FechaAlta, TipoCliente
- **Tabla Facturas:** Id (PK), Numero, ClienteId (FK→Clientes), FechaCreacion, FechaEmision, FechaVencimiento, Estado, BaseImponible, PorcentajeIVA, Total
- **Tabla Usuarios:** Id (PK), Email (UNIQUE), Password (texto plano — deuda crítica), Rol, Activo
- **Relación:** Facturas.ClienteId → Clientes.Id (1:N)

> ⚠️ **DISCREPANCY-MODEL:** La tabla `Usuarios` almacena `Password` en texto plano (`nvarchar(max)`). Confirmado en `Entities.cs` (comentario `XXX`), `AppDbContext.cs` (comentario `FIXME`), `manual-funcional.md` §5.2 y `CLAUDE.md`. Deuda crítica registrada desde enero 2024, sin resolver.

### 3.4 Tests existentes

| Componente | Framework | Ficheros test | Ficheros prod | Ratio | Riesgo regresión |
|---|---|---|---|---|---|
| FacturaFlow.Api | xUnit | 1 | 6 | **0.17** | **HIGH** |

**Tests presentes (2 en total):**
1. `Factura_EstadoInicial_DebeSerBorrador` — verifica estado por defecto de la entidad
2. `Factura_Total_DebeCalcularseCorrectamente` — verifica cálculo de total (con `FIXME` explícito: el cálculo es manual en el test, no automático en el sistema)

**TODOs explícitos en el código de tests** (sin implementar):
- Ciclo de vida completo BORRADOR → EMITIDA → PAGADA
- Validación NIF/CIF único
- Validación de roles en endpoints
- Cálculo de IVA según tipo de cliente
- Anulación de facturas

> El ratio 0.17 está **por debajo del umbral de riesgo HIGH** (< 0.20). El propio fichero de tests lo documenta: *"Solo hay 2 tests en todo el sistema."*

### 3.5 Infraestructura y CI/CD

| Elemento | Presente | Estado | Observación |
|---|---|---|---|
| Dockerfile | ❌ | ABSENT | Sin containerización |
| docker-compose | ❌ | ABSENT | Sin orquestación local |
| CI/CD pipeline | ❌ | ABSENT | Deploy manual FTP según README |
| IaC (Terraform/k8s) | ❌ | ABSENT | No detectado |
| .github/workflows | ❌ | ABSENT | No detectado |
| Scripts de deploy | ❌ | ABSENT | Solo instrucción verbal en README |

> ⚠️ El README documenta explícitamente: *"El despliegue se hace manualmente subiendo los binarios al servidor de producción via FTP."* Incluye IP interna (192.168.1.100) y contacto del responsable (Miguel Fernández).

---

## 4. Operabilidad

| Aspecto | Estado | Observación |
|---|---|---|
| README | PARTIAL | Tiene instrucciones básicas (dotnet restore/run/test) pero incompleto: falta documentación de variables de entorno, exposición de IP de producción, contacto personal |
| Variables de entorno documentadas | NO | JWT secret y DB password hardcodeados en `appsettings.json`. Sin `.env.example`. README indica que están pendientes de migrar a variables de entorno. |
| Secrets hardcodeados detectados | **SÍ — 2 secrets** | (1) JWT secret en `JwtSettings.Secret`; (2) contraseña de BD en `ConnectionStrings.DefaultConnection`. **Valores NO registrados en este documento.** Fichero: `appsettings.json`. |
| Runbook de despliegue | PARTIAL | README menciona FTP a IP interna + "preguntar a Miguel Fernández". Sin procedimiento formal documentado. Conocimiento tácito — riesgo de pérdida con la salida del equipo. |
| API documentada | SÍ | Swagger UI integrado via Swashbuckle (`/swagger`). Confirmado por openapi.yaml del cliente (DTS_API=TRUSTED). |
| Seed data de desarrollo | NO | No hay scripts de seed, no hay datos de prueba en migrations. |

**Operability Score: PARTIAL**
> Suficiente información para arrancar con esfuerzo (instrucciones básicas en README + Swagger), pero con dependencia del equipo saliente para el despliegue real (Miguel Fernández) y con secrets en ficheros commiteados que deben rotarse antes de cualquier operación.

---

## 5. Hallazgos destacados

### Riesgos identificados

| Severidad | Hallazgo | Área | Acción recomendada en T-2/T-3 |
|---|---|---|---|
| **CRITICAL** | Passwords de usuario almacenados en texto plano en BD (`Usuarios.Password`) | Seguridad / Datos | T-2: CVE scan + deuda crítica. T-3: FA documenta como requisito funcional de seguridad. Sprint de estabilización inmediato. |
| **CRITICAL** | JWT secret hardcodeado en `appsettings.json` commiteado en repositorio | Seguridad | Rotar secret inmediatamente. Migrar a variables de entorno antes de cualquier operación. T-2: escalar como bloqueante. |
| **CRITICAL** | Contraseña de BD hardcodeada en `appsettings.json` commiteado en repositorio | Seguridad | Rotar credenciales de BD inmediatamente. Ídem. |
| **HIGH** | CVE-2024-0057 (CVSS 9.1) en EF Core 6.0.0 — SQL injection en raw queries | Dependencias | T-2: confirmar con scanner. Plan de actualización a EF Core 8.x LTS en Sprint de estabilización. |
| **HIGH** | CVE-2024-21319 (CVSS 6.8) en JwtBearer 6.0.0 — JWT validation bypass | Dependencias | T-2: confirmar con scanner. Actualizar junto con EF Core a versiones .NET 8.x. |
| **HIGH** | Sin CI/CD — deploy manual FTP con conocimiento tácito del equipo saliente | Operabilidad | T-5: Sprint de estabilización debe incluir pipeline básico (GitHub Actions o similar). |
| **HIGH** | Ratio test/prod = 0.17 — cobertura crítica | Testing | T-2: análisis de cobertura. T-5: plan de tests en Sprint de estabilización. |
| **HIGH** | DELETE físico de facturas en lugar de ANULADA — viola integridad para auditoría fiscal AEAT | Negocio / GDPR | T-3: documentar como requisito funcional pendiente. T-5: incluir en backlog de estabilización. |
| **MEDIUM** | Controllers acceden directamente a DbContext — sin capa de repositorio | Arquitectura | T-3: impacto en testabilidad. T-5: refactor estructural en Sprint 1+. |
| **MEDIUM** | Filtrado en memoria en `GetAll()` (carga toda la tabla) — riesgo de performance en producción | Performance | T-5: backlog de estabilización. Migrar a IQueryable con filtros server-side. |
| **MEDIUM** | Newtonsoft.Json 12.0.3 EOL + AutoMapper 10.x outdated (>2 majors) | Dependencias | Plan de actualización incremental. No bloqueante para Sprint 0. |
| **MEDIUM** | Sin validación de NIF/CIF único antes de INSERT (TODO explícito en código) | Negocio | T-3: identificar como FA con implementación pendiente. |
| **MEDIUM** | Cálculo de total de factura NO automático — manual en código de test (FIXME explícito) | Negocio | T-3: FA documenta comportamiento esperado vs implementado. |
| **LOW** | Sin paginación en endpoints de listado (TODO explícito) | Performance | Backlog Sprint 1+. |
| **LOW** | IP de servidor de producción expuesta en README (192.168.1.100) | Seguridad operacional | Limpiar del README. Documentar en canal seguro. |

### [DISCREPANCY] Documentación vs código

| ID | Tipo | Descripción | Fuente doc (DTS) | Evidencia código |
|---|---|---|---|---|
| DISC-01 | DISCREPANCY-API | `openapi.yaml` documenta transición EMITIDA→PAGADA pero no hay endpoint `/facturas/{id}/pagar` en ningún controller | API spec (DTS=0.820 TRUSTED) | `FacturasController.cs`: solo `/emitir`. No existe método `Pagar()`. |
| DISC-02 | DISCREPANCY-API | `openapi.yaml` documenta transición EMITIDA→ANULADA pero no hay endpoint `/facturas/{id}/anular` en ningún controller | API spec (DTS=0.820 TRUSTED) | `FacturasController.cs`: solo `DELETE` físico (que debería ser ANULADA). No existe método `Anular()`. |
| DISC-03 | DISCREPANCY-FUNC | `manual-funcional.md` §4 documenta transición PAGADA como acción "Registrar pago" restringida a Contabilidad y Admin | FUNC (DTS=0.645 GOOD) | No implementado en código. |
| DISC-04 | CONFIRMED-ZOMBIE | `arquitectura-2020.md` describía microservicios Java 11 + PostgreSQL. Sistema real: monolito .NET 6 + SQL Server. | ARCH (DTS=0.210 ZOMBIE) | Confirmado por .csproj + appsettings.json. Decisión GT-0 correcta. |

> Las DISC-01, DISC-02 y DISC-03 no son errores de la spec — son funcionalidades documentadas que **no están implementadas en el código**. Constituyen deuda funcional que T-3 (FA Reverse) debe catalogar como FAs pendientes de implementación.

### Items UNKNOWN que requieren aclaración

| Item | Por qué es UNKNOWN | Fuente de aclaración sugerida |
|---|---|---|
| Hash de commit / versión en producción | Sin metadata git en el directorio analizado | Equipo saliente (Miguel Fernández) |
| Estado real de la BD en producción | Solo se analiza el código — sin acceso a SQL Server | Miguel Fernández / acceso BD con permisos lectura |
| Entorno de staging | README no menciona staging (aunque openapi.yaml documenta URL de staging) | Miguel Fernández |
| Variables de entorno reales en producción | `appsettings.json` tiene secrets hardcodeados — ¿hay override en producción? | Miguel Fernández — URGENTE antes de Sprint 1 |
| Existencia de endpoint exportación PDF | Manual funcional §3.3 confirma que existe; no detectado en controllers | Miguel Fernández / acceso BD / logs de producción |
| Existencia de endpoints de Informes | Manual funcional §6.1 confirma que existen; no detectados en controllers | Ídem |

---

## 6. Resumen ejecutivo

**Estado general del repositorio:** FacturaFlow es un monolito .NET 6 funcional pero en estado crítico de seguridad. El sistema cubre las operaciones de negocio core (CRUD de clientes, ciclo de vida de facturas hasta EMITIDA), pero presenta tres vulnerabilidades de seguridad de primer nivel (passwords en texto plano, JWT secret y DB password hardcodeados en el repositorio). La deuda técnica es alta y bien documentada por el propio equipo saliente mediante comentarios `TODO/FIXME/XXX/HACK` en el código.

**Puntos positivos:**
- Stack .NET 6 moderno y bien conocido — sin exotismos tecnológicos
- Documentación funcional y API spec de calidad aceptable (DTS GOOD/TRUSTED)
- Los comentarios de deuda técnica en el código son honestos y específicos — el equipo saliente dejó señales claras de los problemas conocidos
- Swagger/OpenAPI integrado — operabilidad API básica asegurada
- Modelo de datos bien definido en EF Core con constraints correctos (UNIQUE en NIF/CIF y Email)
- Autorización por roles correctamente declarada con `[Authorize(Roles = "...")]`

**Riesgos principales:**
1. **Tres vulnerabilidades de seguridad CRÍTICAS** que deben resolverse antes de cualquier operación en producción: passwords en texto plano, JWT secret y DB password en repositorio
2. **Dos CVEs conocidos de severidad HIGH/CRITICAL** en EF Core 6.0.0 (CVSS 9.1) y JwtBearer 6.0.0 (CVSS 6.8)
3. **Sin CI/CD** — el conocimiento de despliegue reside en una sola persona (Miguel Fernández) que potencialmente sale del proyecto
4. **Cobertura de tests crítica** (ratio 0.17) — cualquier cambio tiene riesgo alto de regresión
5. **Dos transiciones de ciclo de vida de factura no implementadas** (PAGADA, ANULADA via endpoint) — funcionalidad documentada como existente pero ausente del código

**Recomendaciones para T-2 (Quality Baseline):**
- Confirmar CVEs de EF Core 6.0.0 y JwtBearer 6.0.0 con scanner (prioridad máxima)
- Analizar cobertura de tests real (2 tests → cobertura efectiva prácticamente 0%)
- Verificar si `appsettings.json` está en `.gitignore` o commiteado con secrets reales
- Análisis de deuda técnica cuantificada (métricas de complejidad ciclomática, duplicación)

**Estimación de complejidad Sprint 0:**
- Calidad de documentación recibida (DTS): FUNC=GOOD / API=TRUSTED / ARCH=ZOMBIE
- Complejidad del stack: **SIMPLE** — monolito .NET 6, sin microservicios, sin frontend
- Items UNKNOWN a resolver: 6
- Estimación Sprint 0: **3-4 días** (el sistema es pequeño; la complejidad viene de la deuda de seguridad, no del volumen de código)

# SRS — Sprint 1 Estabilización · FacturaFlow
**ID Feature:** STAB-S1 · **Tipo:** technical-debt-sprint
**Proyecto:** FacturaFlow · **Cliente:** RetailCorp S.L.
**Stack:** .NET 6 → 8 / SQL Server · **Sprint objetivo:** 1
**Prioridad:** CRÍTICA — bloqueante para operación segura
**Solicitado por:** PO/PM — Angel de la Cuadra (Experis)
**Versión:** 1.0 · **Estado:** DRAFT

---

## 1. Contexto

Sprint 1 es un sprint de estabilización técnica obligatoria derivado del análisis
de takeover (Sprint 0). El sistema heredado FacturaFlow presenta vulnerabilidades
de seguridad críticas que deben resolverse antes de cualquier desarrollo evolutivo.
No se entregan nuevas funcionalidades de negocio. El objetivo es llevar el semáforo
de seguridad de RED a AMBER y establecer la infraestructura de gobernanza SOFIA.

**Actores del sistema afectados:** todos (Administrador, Comercial, Contabilidad, Solo Lectura).
**Impacto de no actuar:** exposición de credenciales de producción, tokens JWT falsificables,
incumplimiento GDPR, imposibilidad de garantizar integridad del ciclo de entrega.

---

## 2. Alcance

**Incluido:**
- Eliminación de secretos hardcodeados (JWT secret, DB password)
- Actualización de paquetes NuGet con CVEs activos (EF Core, JwtBearer)
- Migración de almacenamiento de passwords a BCrypt
- Implantación de pipeline CI/CD básico (GitHub Actions)
- Implantación de infraestructura de gobernanza SOFIA (CMMI L2 operativo)

**Excluido:**
- Nuevas funcionalidades de negocio
- Corrección del DELETE físico de facturas (DEBT-TK-008 — Sprint 2)
- Implementación de endpoints /pagar y /anular (Sprint 2)
- Informes REST (Sprint 3)

---

## 3. RNF Baseline del Proyecto FacturaFlow

> Primera vez que se establece el baseline. Aplica a todos los sprints futuros.
> Los RNF delta de cada feature se documentarán como deltas sobre este baseline.

| ID | Categoría | Descripción | Criterio medible |
|---|---|---|---|
| RNF-B01 | Seguridad | Secrets y credenciales | 0 credenciales hardcodeadas en repositorio. Verificable con `git log -S "password"` y análisis estático. |
| RNF-B02 | Seguridad | Almacenamiento passwords | BCrypt con cost factor ≥ 10 (implementado con 12). Ninguna contraseña en texto plano en BD. |
| RNF-B03 | Seguridad | Autenticación JWT | Secret generado aleatoriamente ≥ 256 bits. Leído desde variable de entorno. Rotación documentada. |
| RNF-B04 | Seguridad | Vulnerabilidades conocidas | 0 CVEs con CVSS ≥ 7.0 en dependencias de producción. Validable con `dotnet list package --vulnerable`. |
| RNF-B05 | Rendimiento | Latencia API REST | p95 < 500 ms para endpoints con carga nominal (< 100 req/s). |
| RNF-B06 | Disponibilidad | Uptime | ≥ 99.0% mensual en entorno de producción. |
| RNF-B07 | Integridad CI | Build continuo | Todo push a `main` o `develop` dispara build + tests automáticos. Estado visible en README. |
| RNF-B08 | Trazabilidad | Audit trail | Ningún registro se elimina físicamente de la BD. Las facturas se anulan (estado ANULADA). *(En vigor a partir de Sprint 2.)* |
| RNF-B09 | Compatibilidad | Runtime | .NET 8 LTS (migrado en Sprint 1). Soporte hasta noviembre 2026. |

---

## 4. Fichas de Requisito Técnico

---

### RT-001 — Eliminación de JWT secret hardcodeado
**Jira:** FF-5 · **DEBT-ID:** DEBT-TK-003 · **SP:** 1 · **Semana:** 1 · **Prioridad:** CRÍTICA/INMEDIATO

**Descripción:** El campo `JwtSettings.Secret` está hardcodeado en `appsettings.json` commiteado en el repositorio. Cualquier persona con acceso al repo puede forjar tokens JWT válidos.

**Requisito:** La aplicación debe leer el JWT secret exclusivamente desde una variable de entorno (`JWTAUTH__SECRET`). El valor no debe aparecer en ningún fichero del repositorio ni en su historial.

**RNF vinculados:** RNF-B01, RNF-B03

```gherkin
Scenario: arranque con variable de entorno configurada
  Given que JWTAUTH__SECRET está definida en el entorno con valor válido (≥ 256 bits)
  When  la aplicación arranca
  Then  el servicio JWT se inicializa correctamente
  And   los endpoints protegidos responden con HTTP 401 a peticiones sin token

Scenario: arranque sin variable de entorno
  Given que JWTAUTH__SECRET no está definida en el entorno
  When  la aplicación intenta arrancar
  Then  la aplicación falla al iniciar con error explícito que indica la variable faltante
  And   no se expone ningún endpoint

Scenario: secret eliminado del historial git
  Given que se ha ejecutado el proceso de limpieza del repositorio
  When  se ejecuta git log -S "JwtSettings" en el repositorio
  Then  no aparece ningún commit que contenga el valor hardcodeado del secret
```

**DoD:**
- [ ] `appsettings.json` y `appsettings.*.json` sin valor de secret
- [ ] Variable de entorno documentada en README
- [ ] Historial git limpio (git-filter-repo si necesario)
- [ ] Secret rotado en producción antes del despliegue
- [ ] Tests de arranque pasan con variable de entorno configurada

---

### RT-002 — Eliminación de DB password hardcodeada
**Jira:** FF-6 · **DEBT-ID:** DEBT-TK-004 · **SP:** 1 · **Semana:** 1 · **Prioridad:** CRÍTICA/INMEDIATO

**Descripción:** La cadena de conexión a SQL Server contiene la contraseña hardcodeada en `appsettings.json`.

**Requisito:** La contraseña de base de datos debe leerse exclusivamente desde una variable de entorno. ASP.NET Core mapea `ConnectionStrings:DefaultConnection` del appsettings a la variable `CONNECTIONSTRINGS__DEFAULTCONNECTION`.

**RNF vinculados:** RNF-B01

```gherkin
Scenario: conexión con credenciales en variable de entorno
  Given que CONNECTIONSTRINGS__DEFAULTCONNECTION está definida con credenciales válidas
  When  la aplicación arranca y ejecuta una query
  Then  la conexión a SQL Server se establece correctamente
  And   los endpoints que acceden a BD responden correctamente

Scenario: ausencia de variable de entorno
  Given que CONNECTIONSTRINGS__DEFAULTCONNECTION no está definida
  When  la aplicación intenta conectar a la BD
  Then  la aplicación falla con error de configuración explícito
  And   no expone datos sensibles en el mensaje de error

Scenario: password ausente del repositorio
  Given que se ha auditado el repositorio
  When  se busca el patrón de la contraseña anterior en todos los ficheros
  Then  no se encuentra en ningún fichero del repositorio ni en el historial git
```

**DoD:**
- [ ] `appsettings.json` sin password de BD en texto plano
- [ ] Contraseña de BD rotada en SQL Server de producción
- [ ] Variable de entorno documentada en README
- [ ] Historial git limpio
- [ ] La aplicación conecta correctamente en todos los entornos

---

### RT-003 — Actualización EF Core — CVE-2024-0057
**Jira:** FF-7 · **DEBT-ID:** DEBT-TK-001 · **SP:** 5 · **Semana:** 1 · **Prioridad:** CRÍTICA

**Descripción:** EF Core 6.0.0 presenta CVE-2024-0057 (CVSS 9.1 — SQL injection en raw queries). Debe actualizarse a EF Core 8.x LTS junto con la migración del runtime a .NET 8.

**Requisito:** Todos los paquetes `Microsoft.EntityFrameworkCore.*` en versión 8.x. `TargetFramework` = `net8.0`. Los 2 tests existentes deben pasar. La conexión a BD debe funcionar correctamente.

**RNF vinculados:** RNF-B04, RNF-B09

```gherkin
Scenario: build exitoso tras actualización
  Given que se han actualizado los paquetes EF Core a versión 8.x
  And   que el TargetFramework es net8.0
  When  se ejecuta dotnet build
  Then  el build termina con BUILD SUCCESS

Scenario: tests pasan tras actualización
  Given que el build es exitoso
  When  se ejecuta dotnet test
  Then  los 2 tests unitarios existentes pasan
  And   no hay tests en estado FAILED

Scenario: CVE eliminado
  Given que EF Core está en versión 8.x
  When  se ejecuta dotnet list package --vulnerable
  Then  CVE-2024-0057 no aparece en el output
  And   no hay CVEs con CVSS ≥ 7.0 en los paquetes de EF Core

Scenario: funcionalidad de BD preservada
  Given que la aplicación está en .NET 8 con EF Core 8.x
  When  se ejecutan las operaciones CRUD en los endpoints de Clientes y Facturas
  Then  todas las operaciones responden correctamente
```

**DoD:**
- [ ] `Microsoft.EntityFrameworkCore.*` en versión 8.x en el `.csproj`
- [ ] `TargetFramework` = `net8.0`
- [ ] `dotnet build` sin errores
- [ ] `dotnet test` — 2/2 tests verdes
- [ ] `dotnet list package --vulnerable` sin CVEs ≥ 7.0 en EF Core
- [ ] Breaking changes de EF Core 8 documentados si aplican
- [ ] Migraciones verificadas en entorno local

---

### RT-004 — Actualización JwtBearer — CVE-2024-21319
**Jira:** FF-8 · **DEBT-ID:** DEBT-TK-002 · **SP:** 1 · **Semana:** 1 · **Prioridad:** HIGH

**Descripción:** `Microsoft.AspNetCore.Authentication.JwtBearer` 6.0.0 presenta CVE-2024-21319 (CVSS 6.8 — JWT validation bypass). Se actualiza coordinado con RT-003.

**Requisito:** El paquete JwtBearer en versión 8.x. La autenticación JWT debe rechazar tokens inválidos y aceptar tokens válidos.

**RNF vinculados:** RNF-B04, RNF-B03, RNF-B09

```gherkin
Scenario: endpoint protegido rechaza petición sin token
  Given que JwtBearer está en versión 8.x
  When  se hace una petición GET /api/v1/facturas sin header Authorization
  Then  el endpoint responde HTTP 401 Unauthorized

Scenario: endpoint protegido acepta token válido
  Given que existe un token JWT firmado con el secret correcto y no expirado
  When  se hace una petición GET /api/v1/facturas con el token en Authorization Bearer
  Then  el endpoint responde HTTP 200

Scenario: CVE eliminado
  Given que JwtBearer está en versión 8.x
  When  se ejecuta dotnet list package --vulnerable
  Then  CVE-2024-21319 no aparece en el output
```

**DoD:**
- [ ] `Microsoft.AspNetCore.Authentication.JwtBearer` en versión 8.x
- [ ] Tests de autenticación pasando (happy path + error path)
- [ ] CVE-2024-21319 no detectable
- [ ] Coordinado con RT-003 (mismo PR recomendado)

---

### RT-005 — Migración passwords a BCrypt
**Jira:** FF-9 · **DEBT-ID:** DEBT-TK-005 · **SP:** 5 · **Semana:** 1–2 · **Prioridad:** CRÍTICA

**Descripción:** Las contraseñas de usuarios están almacenadas en texto plano. Violación crítica de seguridad y GDPR.

**Requisito:** Todos los registros de `Usuarios` con contraseña almacenada como hash BCrypt (cost ≥ 10) en columna `PasswordHash`. La lógica de autenticación usa `BCrypt.Verify`. La columna `Password` queda vacía o eliminada.

**RNF vinculados:** RNF-B02, RNF-B01

> ⚠️ La migración de datos es irreversible. Backup completo de BD obligatorio antes de ejecutar.
> BCrypt cost factor aplicado: **12** (satisface RNF-B02 que establece ≥ 10).

```gherkin
Scenario: autenticación exitosa con password migrado
  Given que un usuario tiene su contraseña migrada a BCrypt en PasswordHash
  When  intenta autenticarse con su contraseña correcta
  Then  la autenticación es exitosa y se emite un token JWT válido

Scenario: autenticación fallida con password incorrecto
  Given que un usuario tiene su contraseña migrada a BCrypt
  When  intenta autenticarse con una contraseña incorrecta
  Then  la autenticación falla con HTTP 401
  And   no se revela información sobre el hash almacenado

Scenario: no existen contraseñas en texto plano tras la migración
  Given que se ha ejecutado el script de migración
  When  se consulta la columna Password en la tabla Usuarios
  Then  todos los registros tienen Password NULL o vacío
  And   todos los registros tienen PasswordHash con valor BCrypt válido (empieza con $2a$ o $2b$)

Scenario: coste BCrypt mínimo cumplido
  Given un hash BCrypt almacenado en la BD
  When  se verifica el cost factor del hash
  Then  el cost factor es ≥ 10
```

**DoD:**
- [ ] Paquete `BCrypt.Net-Next` añadido al `.csproj`
- [ ] Migración EF Core que añade columna `PasswordHash`
- [ ] Script de migración de datos ejecutado y verificado
- [ ] Lógica de autenticación actualizada para usar `BCrypt.Verify`
- [ ] Columna `Password` vaciada (NULL) o eliminada
- [ ] Backup de BD documentado antes de la migración
- [ ] Tests de autenticación (happy path + error path) pasando
- [ ] Plan de rollback documentado

---

### RT-006 — CI/CD básico con GitHub Actions
**Jira:** FF-10 · **DEBT-ID:** DEBT-TK-007 · **SP:** 5 · **Semana:** 2 · **Prioridad:** HIGH

**Descripción:** El sistema carece de CI/CD. Despliegues manuales vía FTP.

**Requisito:** Workflow de GitHub Actions activo en push a `main` y `develop` que ejecute `dotnet build` y `dotnet test` y reporte el estado.

**RNF vinculados:** RNF-B07

```gherkin
Scenario: push a develop dispara el pipeline
  Given que el workflow ci.yml está configurado en .github/workflows/
  When  se hace un push a la rama develop
  Then  el workflow se activa automáticamente en GitHub Actions
  And   el job build ejecuta dotnet build sin errores
  And   el job test ejecuta dotnet test con todos los tests pasando

Scenario: push con código roto falla el pipeline
  Given que el workflow ci.yml está activo
  When  se hace un push con código que no compila
  Then  el job build falla con estado FAILURE
  And   GitHub notifica el fallo

Scenario: badge de estado visible en README
  Given que el pipeline está configurado
  When  se accede al README del repositorio
  Then  aparece un badge que muestra el estado actual del workflow

Scenario: branch protection en main activo
  Given que branch protection está configurado en main
  When  se intenta hacer merge de un PR con pipeline fallido
  Then  el merge es bloqueado hasta que el pipeline esté verde
```

**DoD:**
- [ ] `.github/workflows/ci.yml` creado y commiteado
- [ ] Workflow activo en push a `main` y `develop`
- [ ] Jobs: `build` (dotnet build) + `test` (dotnet test) en .NET 8
- [ ] Badge de estado en README.md
- [ ] Branch protection en `main`: require CI verde antes de merge
- [ ] Al menos un run verde documentado en GitHub Actions

---

### RT-007 — Infraestructura de gobernanza SOFIA
**Jira:** FF-22 · **DEBT-ID:** GOV-S1 · **SP:** 6 · **Semana:** 1–2 · **Prioridad:** HIGH

**Descripción:** Proceso AD-HOC (CMMI L1–L2). Debe implantarse la infraestructura SOFIA para alcanzar CMMI L2 operativo al cierre del Sprint 1.

**Requisito:** Workflow Jira SOFIA con 7 columnas y WIP limits, estructura Confluence activa, Git Flow implantado, Project Plan y Risk Register publicados.

**RNF vinculados:** RNF-B07

```gherkin
Scenario: workflow Jira SOFIA activo
  Given que se ha configurado el board de FacturaFlow en Jira
  When  se accede al board
  Then  existen las columnas: BACKLOG | READY | IN PROGRESS | CODE REVIEW | QA | WAITING APPROVAL | DONE
  And   los WIP limits están configurados según el estándar SOFIA

Scenario: estructura Confluence activa
  Given que se ha creado la estructura documental en Confluence
  When  se accede al espacio FacturaFlow
  Then  existen las secciones: Baseline, Sprints, Documentation Technical, Risk Register

Scenario: Git Flow operativo
  Given que se ha configurado Git Flow en el repositorio
  When  se intenta hacer push directo a main
  Then  el push es rechazado (branch protection activo)
  And   existe al menos la rama develop

Scenario: PP y Risk Register publicados
  Given que el sprint está en curso
  When  se accede a Confluence > FacturaFlow > Baseline
  Then  el Project Plan está publicado con calendario de sprints S1–S3
  And   el Risk Register está publicado con los 3 riesgos activos del Sprint 1
```

**DoD:**
- [ ] Workflow Jira con 7 columnas SOFIA y WIP limits configurados
- [ ] Estructura Confluence publicada
- [ ] Git Flow: ramas `main` y `develop` activas, branch protection en `main`
- [ ] Project Plan (PP) publicado en Confluence
- [ ] Risk Register publicado con R-S1-001, R-S1-002, R-S1-003
- [ ] CMMI L2 PAs básicos activos: PP, PMC, CM

---

## 5. RTM Parcial — Sprint 1

| ID RT | Jira | DEBT-ID | RNF vinculados | Componente Arq. | Caso de prueba QA | Estado |
|---|---|---|---|---|---|---|
| RT-001 | FF-5 | DEBT-TK-003 | RNF-B01, RNF-B03 | appsettings / startup | — QA Step 6 | DRAFT |
| RT-002 | FF-6 | DEBT-TK-004 | RNF-B01 | appsettings / startup | — QA Step 6 | DRAFT |
| RT-003 | FF-7 | DEBT-TK-001 | RNF-B04, RNF-B09 | FacturaFlow.Api.csproj | — QA Step 6 | DRAFT |
| RT-004 | FF-8 | DEBT-TK-002 | RNF-B04, RNF-B03, RNF-B09 | Program.cs / JwtSettings | — QA Step 6 | DRAFT |
| RT-005 | FF-9 | DEBT-TK-005 | RNF-B02, RNF-B01 | Usuarios / Auth | — QA Step 6 | DRAFT |
| RT-006 | FF-10 | DEBT-TK-007 | RNF-B07 | .github/workflows | — QA Step 6 | DRAFT |
| RT-007 | FF-22 | GOV-S1 | RNF-B07 | Jira / Confluence / Git | — QA Step 6 | DRAFT |

---

## 6. Dependencias entre requisitos

| RT | Depende de | Motivo |
|---|---|---|
| RT-004 | RT-003 | JwtBearer 8.x requiere .NET 8 — mismo PR recomendado |
| RT-006 | RT-003 | El CI workflow debe usar .NET 8 |
| RT-005 | RT-001, RT-002 | La migración de passwords se ejecuta en un sistema con secrets ya saneados |

---

## 7. DoD Sprint 1

### DoD base SOFIA — Deuda técnica
- [ ] Código implementado y revisado por Code Reviewer
- [ ] Tests unitarios existentes pasando
- [ ] Pipeline CI/CD verde (aplica desde que RT-006 esté completado)
- [ ] `dotnet list package --vulnerable` sin CVEs ≥ 7.0
- [ ] Aprobado por QA Lead
- [ ] Aprobación del Product Owner

### DoD adicional — Seguridad Sprint 1
- [ ] 0 secrets hardcodeados en repositorio
- [ ] 0 contraseñas en texto plano en BD
- [ ] Semáforo de seguridad: RED → AMBER

---

## 8. Supuestos documentados

| ID | Supuesto | Riesgo si es falso |
|---|---|---|
| S-001 | El repositorio está en GitHub y permite GitHub Actions | RT-006 requiere solución CI alternativa |
| S-002 | El servidor de producción acepta variables de entorno | RT-001 y RT-002 requieren solución alternativa |
| S-003 | El build del proyecto es posible en entorno controlado | R-S1-002 se materializa — bloquear sprint |
| S-004 | Los 2 tests unitarios existentes son válidos post-upgrade | Deben corregirse como parte de RT-003 |
| S-005 | Miguel Fernández (TI RetailCorp) responde en ≤ 48h | R-S1-001 activo — código PDF en riesgo |

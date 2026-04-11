# HLD — Sprint 1 Estabilización · FacturaFlow
**Feature:** STAB-S1 · **Proyecto:** FacturaFlow · **Cliente:** RetailCorp S.L.
**Stack:** .NET 8 / ASP.NET Core / EF Core / SQL Server
**Tipo:** technical-debt · **Sprint:** 1 · **Versión:** 1.0 · **Estado:** DRAFT

---

## 1. Análisis de impacto

Sprint 1 no introduce nuevos servicios ni nuevos endpoints. Todos los cambios
son internos al monolito existente. No hay impacto en contratos de API vigentes.

| Componente | Tipo de impacto | Acción requerida |
|---|---|---|
| `FacturaFlow.Api` (monolito) | Modificación interna | Upgrade runtime + paquetes + configuración |
| Contrato OpenAPI existente | Ninguno | Sin cambios — endpoints no se modifican |
| Base de datos SQL Server | Migración aditiva | Añadir columna `PasswordHash` — compatible hacia adelante |
| Clientes de la API | Ninguno | Transparente para consumidores externos |

**Decisión:** sin impacto en servicios externos. Se continúa con el diseño.

---

## 2. Contexto del sistema — C4 Nivel 1

```mermaid
C4Context
  title FacturaFlow — Contexto del sistema (post Sprint 1)

  Person(admin, "Administrador", "Gestiona clientes, facturas y usuarios")
  Person(comercial, "Comercial", "Crea y modifica clientes y facturas")
  Person(conta, "Contabilidad", "Consulta y registra cobros")

  System(ff, "FacturaFlow API", "Monolito .NET 8. Gestión de facturación para RetailCorp S.L.")
  SystemDb(sql, "SQL Server", "Base de datos de producción")
  System_Ext(github, "GitHub Actions", "CI/CD — build + test automático")
  System_Ext(env, "Variables de entorno", "Secrets: JWT_SECRET, DB_CONNECTIONSTRING")

  Rel(admin, ff, "Usa", "HTTPS / JWT")
  Rel(comercial, ff, "Usa", "HTTPS / JWT")
  Rel(conta, ff, "Usa", "HTTPS / JWT")
  Rel(ff, sql, "Lee / Escribe", "EF Core 8")
  Rel(ff, env, "Lee secrets", "IConfiguration")
  Rel(github, ff, "Build + Test", "dotnet build / dotnet test")
```

---

## 3. Componentes internos del monolito — C4 Nivel 2

```mermaid
C4Container
  title FacturaFlow — Componentes internos (Sprint 1)

  Container(controllers, "Controllers", "ASP.NET Core", "FacturasController, ClientesController")
  Container(auth, "Auth Middleware", "ASP.NET Core JWT", "Validación de tokens JWT")
  Container(config, "Configuration", "IConfiguration + IOptions", "Lee secrets desde variables de entorno")
  Container(ef, "EF Core DbContext", "EF Core 8", "ORM — acceso a SQL Server")
  Container(bcrypt, "BCrypt Service", "BCrypt.Net-Next", "Hash y verificación de passwords")
  ContainerDb(sql, "SQL Server", "SQL Server", "Tablas: Facturas, Clientes, Usuarios")

  Rel(controllers, auth, "Requiere token válido")
  Rel(auth, config, "Lee JwtSettings")
  Rel(controllers, ef, "Consultas y escrituras")
  Rel(controllers, bcrypt, "Verifica password en login")
  Rel(ef, sql, "SQL queries")
  Rel(config, bcrypt, "(indirecto — cost factor)")
```

---

## 4. Servicios nuevos o modificados

| Componente | Acción | Descripción del cambio |
|---|---|---|
| `appsettings.json` | MODIFICADO | Eliminar secrets. Leer desde variables de entorno. |
| `Program.cs` / `Startup.cs` | MODIFICADO | Configurar IOptions con validación obligatoria de env vars. |
| `FacturaFlow.Api.csproj` | MODIFICADO | Upgrade .NET 6 → 8, EF Core 6 → 8, JwtBearer 6 → 8. |
| `Usuarios` (tabla BD) | MIGRACIÓN ADITIVA | Añadir columna `PasswordHash nvarchar(max)`. |
| `AuthController` / lógica login | MODIFICADO | Usar `BCrypt.Verify` en lugar de comparación directa. |
| `.github/workflows/ci.yml` | NUEVO | Pipeline CI: build + test en cada push a main/develop. |

---

## 5. Secuencia de despliegue Sprint 1

```mermaid
sequenceDiagram
  participant Dev as Developer
  participant GH  as GitHub Actions
  participant SQL as SQL Server Prod
  participant APP as FacturaFlow API

  Dev->>SQL: 1. Rotar DB password (RT-002)
  Dev->>APP: 2. Rotar JWT secret en entorno (RT-001)
  Dev->>Dev: 3. Upgrade .NET 8 + EF Core 8 + JwtBearer 8 (RT-003/004)
  Dev->>GH:  4. Crear ci.yml — pipeline CI activo (RT-006)
  Dev->>SQL: 5. Ejecutar migración — añadir PasswordHash (RT-005)
  Dev->>APP: 6. Desplegar versión con BCrypt activo (RT-005)
  GH-->>Dev: Build + Tests verdes en cada push
  Note over Dev,APP: FF-10 (CI/CD) en semana 2, después de secretos saneados
```

---

## 6. Decisiones técnicas — ver ADRs

- **ADR-001:** Estrategia de migración BCrypt — 1 fase vs 2 fases
- **ADR-002:** .NET 8 LTS como target de upgrade
- **ADR-003:** Variables de entorno vs Azure Key Vault para gestión de secrets

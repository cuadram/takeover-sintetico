# FacturaFlow API

[![CI — FacturaFlow](https://github.com/experis/facturaflow/actions/workflows/ci.yml/badge.svg)](https://github.com/experis/facturaflow/actions/workflows/ci.yml)

Sistema de gestión de facturación — RetailCorp S.L.
**Stack:** .NET 8 / ASP.NET Core / EF Core 8 / SQL Server
**Sprint activo:** 1 — Estabilización técnica (SOFIA v2.6.25)

---

## Arranque local

### Prerrequisitos

- .NET 8 SDK: https://dotnet.microsoft.com/download/dotnet/8
- SQL Server (local o Docker)

### Variables de entorno obligatorias

Copiar `.env.example` como `.env` y completar los valores:

```bash
cp .env.example .env
# Editar .env con el editor de texto
```

| Variable | Descripción | Obligatoria |
|---|---|---|
| `JWTAUTH__SECRET` | JWT signing secret ≥ 256 bits (base64) | Sí |
| `CONNECTIONSTRINGS__DEFAULTCONNECTION` | Connection string SQL Server | Sí |

**Generar JWT secret:**
```bash
openssl rand -base64 32
```

### Ejecutar la aplicación

```bash
# Exportar variables de entorno
export JWTAUTH__SECRET="<secret-generado>"
export CONNECTIONSTRINGS__DEFAULTCONNECTION="Server=localhost;Database=FacturaFlowDB;User=sa;Password=TU_PASSWORD;TrustServerCertificate=True"

# Aplicar migraciones
dotnet ef database update

# Ejecutar
dotnet run
```

### Tests

```bash
dotnet test --verbosity normal
```

---

## Seguridad

- Secrets gestionados exclusivamente mediante variables de entorno (RT-001, RT-002)
- Passwords de usuarios almacenadas con BCrypt cost factor 12 (RT-005)
- CVE-2024-0057 (EF Core) y CVE-2024-21319 (JwtBearer) resueltos con upgrade a .NET 8 (RT-003, RT-004)

Para verificar ausencia de CVEs:
```bash
dotnet list package --vulnerable
```

---

## Migración de passwords a BCrypt (one-shot, Sprint 1)

> ⚠️ Ejecutar **solo una vez** tras aplicar la migración `AddPasswordHash`.
> Realizar backup de BD antes de ejecutar.

```bash
dotnet ef database update 20260410000000_AddPasswordHash
dotnet script scripts/MigratePasswordsToBcrypt.cs
```

---

## CI/CD

Pipeline GitHub Actions activo en push a `main` y `develop`.
Branch protection en `main`: merge bloqueado si CI falla.

Secrets requeridos en GitHub → Settings → Secrets:
- `JWTAUTH_SECRET_TEST`
- `DB_CONNECTIONSTRING_TEST`

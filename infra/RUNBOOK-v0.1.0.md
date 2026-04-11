# Runbook Operativo — FacturaFlow v0.1.0-sprint1
**SOFIA Sprint 1 · Fecha:** 2026-04-10 · **Versión:** v0.1.0-sprint1

---

## Información del servicio

| Parámetro | Valor |
|---|---|
| Servicio | FacturaFlow API |
| Puerto | 8080 |
| Health (liveness) | `GET /health/live` |
| Imagen Docker | `ghcr.io/[org]/facturaflow-api:v0.1.0-sprint1` |
| Stack | .NET 8 / ASP.NET Core / EF Core 8 / SQL Server |
| Secrets requeridos | `JWTAUTH__SECRET`, `CONNECTIONSTRINGS__DEFAULTCONNECTION` |

---

## Arranque y parada

```bash
# Docker Compose (local / staging)
docker compose -f infra/compose/docker-compose.yml up -d
docker compose -f infra/compose/docker-compose.yml down

# Verificar health
curl -f http://localhost:8080/health/live
# Respuesta esperada: HTTP 200

# Ver logs en tiempo real
docker logs -f facturaflow-api

# Ver últimas 2 horas de logs
docker logs --since 2h facturaflow-api
```

---

## Variables de entorno requeridas

| Variable | Descripción | Obligatoria |
|---|---|---|
| `JWTAUTH__SECRET` | JWT signing secret ≥ 256 bits (base64) | ✅ Sí |
| `CONNECTIONSTRINGS__DEFAULTCONNECTION` | Connection string SQL Server completa | ✅ Sí |

**Arranque fallará con `InvalidOperationException`** si alguna de estas variables no está configurada — diseñado intencionalmente (fail-fast seguro).

**Generar JWT secret:**
```bash
openssl rand -base64 32
```

---

## Procedimiento de migración de passwords (one-shot, Sprint 1)

> ⚠️ **Ejecutar solo una vez.** Requiere backup previo de BD.

```bash
# Paso 1: Backup de BD
# (ejecutar con herramienta de backup del cliente antes de continuar)

# Paso 2: Aplicar migración estructural
dotnet ef database update 20260410000000_AddPasswordHash

# Paso 3: Migrar datos (passwords → BCrypt)
CONNECTIONSTRINGS__DEFAULTCONNECTION="..." dotnet script scripts/MigratePasswordsToBcrypt.cs

# Paso 4: Verificar
sqlcmd -S [servidor] -Q "SELECT COUNT(*) FROM Usuarios WHERE PasswordHash='PENDING_MIGRATION'"
# Debe devolver 0

sqlcmd -S [servidor] -Q "SELECT COUNT(*) FROM Usuarios WHERE Password IS NOT NULL"
# Debe devolver 0
```

---

## Procedimiento de rollback

```bash
# Rollback de imagen Docker a versión anterior
docker pull ghcr.io/[org]/facturaflow-api:v[VERSION_ANTERIOR]
docker compose -f infra/compose/docker-compose.yml down
# Actualizar IMAGE_TAG en docker-compose.yml → v[VERSION_ANTERIOR]
docker compose -f infra/compose/docker-compose.yml up -d

# Rollback de migración EF Core (si la migración de passwords falló)
dotnet ef database update [migration-anterior-a-AddPasswordHash]
# ⚠️ Solo válido si los passwords originales en texto plano no se han vaciado aún
# La columna Password se restaura como NOT NULL
```

---

## Alertas y respuesta

| Alerta | Causa probable | Acción |
|---|---|---|
| `JWTAUTH__SECRET no está configurado` al arrancar | Env var no configurada | Configurar secret y reiniciar |
| `CONNECTIONSTRINGS__DEFAULTCONNECTION no está configurado` | Env var BD no configurada | Configurar connection string y reiniciar |
| HTTP 401 en todos los endpoints | JWT secret rotado sin reiniciar servicio | Reiniciar con nuevo secret |
| `BadSqlGrammarException` en logs | Schema drift — migración no aplicada | `dotnet ef database update` |
| Build Docker FAILED — CVE Critical | Nueva vulnerabilidad en dependencia | Hotfix de dependencia afectada |

---

## Versionado semántico — protocolo SOFIA

```
v0.1.0-sprint1  → Sprint 1 (estabilización seguridad)
v0.2.0          → Sprint 2 (primer evolutivo)
v1.0.0          → Release estable post-evolutivos base

Crear tag de release:
  git tag -a v0.1.0-sprint1 -m "Sprint 1 — Estabilización seguridad"
  git push origin v0.1.0-sprint1
  # → Dispara automáticamente cd-release.yml en GitHub Actions
```

---

## Secrets — documentación

| Variable | Tipo | Cómo configurar |
|---|---|---|
| `JWTAUTH__SECRET` | Secret | Docker: `.env` · GitHub Actions: Repository Secret `JWTAUTH__SECRET` |
| `CONNECTIONSTRINGS__DEFAULTCONNECTION` | Secret | Docker: `.env` · GitHub Actions: `DB_CONNECTIONSTRING_TEST` |
| `JWTAUTH_SECRET_TEST` | GitHub Secret (CI) | Solo para tests CI — valor distinto a producción |

**Rotación de JWT secret:** reiniciar el servicio tras actualizar `JWTAUTH__SECRET`. Los tokens existentes quedarán invalidados inmediatamente (`ClockSkew = Zero`).

# Release Notes — v0.1.0-sprint1 — FacturaFlow

## Metadata
- **Fecha release:** 2026-04-10
- **Sprint:** 1 — Estabilización de Seguridad
- **Cliente:** RetailCorp S.L.
- **Aprobado por:** Angel de la Cuadra (PO/PM Experis) — Gate G-6

---

## Resumen ejecutivo

Sprint 1 es un sprint de deuda técnica obligatoria. No se entregan nuevas funcionalidades de negocio. El objetivo es llevar el sistema heredado FacturaFlow de semáforo de seguridad 🔴 RED a 🟡 AMBER, resolviendo todos los riesgos de seguridad críticos identificados en el Sprint 0 (Takeover).

**Semáforo de seguridad:** 🔴 RED → 🟡 AMBER ✅

---

## Cambios incluidos

### Seguridad — Críticos resueltos

| DEBT-ID | Descripción | RT | Estado |
|---|---|---|---|
| DEBT-TK-003 | JWT secret hardcodeado en repositorio | RT-001 | ✅ QA_VERIFIED |
| DEBT-TK-004 | DB password hardcodeada en repositorio | RT-002 | ✅ QA_VERIFIED |
| DEBT-TK-001 | CVE-2024-0057 CVSS 9.1 (EF Core 6.0.0) | RT-003 | ✅ QA_VERIFIED |
| DEBT-TK-002 | CVE-2024-21319 CVSS 6.8 (JwtBearer 6.0.0) | RT-004 | ✅ QA_VERIFIED |
| DEBT-TK-005 | Passwords usuarios en texto plano en BD | RT-005 | ✅ QA_VERIFIED |

### Operaciones

| DEBT-ID | Descripción | RT | Estado |
|---|---|---|---|
| DEBT-TK-007 | Sin CI/CD (despliegue FTP manual) | RT-006 | ✅ QA_VERIFIED |
| DEBT-TK-009 | Newtonsoft.Json 12.0.3 EOL | RT-003 (side) | ✅ CLOSED |

### Gobernanza SOFIA (RT-007)

- Estructura Confluence implantada (HLD publicado — page/11665409)
- Workflow Jira SOFIA configurado (pendiente WIP limits — Angel SM)
- Git Flow: rama `develop` + branch protection en `main` (pendiente — Angel TL)
- Project Plan y Risk Register: pendiente publicación (Angel PM)

---

## Breaking changes

Ninguno en la API pública. Los cambios son transparentes para los consumidores:
- El contrato OpenAPI no se modifica
- Los endpoints no cambian
- La autenticación JWT sigue siendo compatible

**Acción requerida por operaciones antes de desplegar:**
1. Configurar variable de entorno `JWTAUTH__SECRET` (eliminar del appsettings.json)
2. Configurar variable de entorno `CONNECTIONSTRINGS__DEFAULTCONNECTION`
3. Ejecutar migración `AddPasswordHash`: `dotnet ef database update`
4. Ejecutar script de migración de passwords: `scripts/MigratePasswordsToBcrypt.cs`

---

## Servicios afectados

| Servicio | Versión anterior | Versión nueva | Cambio |
|---|---|---|---|
| FacturaFlow API | .NET 6 (sin versión) | v0.1.0-sprint1 (.NET 8) | Upgrade runtime + seguridad |
| SQL Server BD | — | — | Migración aditiva `AddPasswordHash` |

---

## Instrucciones de despliegue

```bash
# 1. Configurar secrets (NO commitear)
export JWTAUTH__SECRET="$(openssl rand -base64 32)"
export CONNECTIONSTRINGS__DEFAULTCONNECTION="Server=...;Password=NUEVA_PASSWORD_ROTADA;"

# 2. Aplicar migraciones
dotnet ef database update

# 3. Ejecutar migración de passwords (one-shot, con backup previo)
dotnet script scripts/MigratePasswordsToBcrypt.cs

# 4. Desplegar
docker pull ghcr.io/[org]/facturaflow-api:v0.1.0-sprint1
docker compose up -d

# 5. Verificar health
curl -f http://[host]:8080/health/live
```

Ver runbook completo en `infra/RUNBOOK-v0.1.0.md`.

---

## Deuda técnica pendiente (backlog)

| DEBT-ID | Descripción | Sprint target |
|---|---|---|
| DEBT-TK-006 | Cobertura tests < 80% en controllers | S2-S3 |
| DEBT-TK-008 | DELETE físico facturas — AEAT/GDPR | S2 |
| DEBT-TK-010 | Sin Repository Pattern | S3-S4 |
| DEBT-TK-011 | Endpoint /pagar EMITIDA→PAGADA | S2 |
| DEBT-TK-012 | Endpoint /anular EMITIDA→ANULADA | S2 |
| DEBT-TK-013 | Informes REST (×3) | S3 |
| DEBT-TK-014 | Código PDF — recuperar de Miguel Fernández | S2 |
| DEBT-TK-015 | Integration Tests con Testcontainers | S2 |

---

## Procedimiento de rollback

Ver `infra/RUNBOOK-v0.1.0.md` — sección "Procedimiento de rollback".

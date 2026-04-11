# ADR-002 — Target de upgrade: .NET 8 LTS

**Feature:** STAB-S1 · **RT:** RT-003, RT-004 · **Jira:** FF-7, FF-8
**Fecha:** 2026-04-10 · **Estado:** Aceptado
**Decidido por:** Angel (Tech Lead)

---

## Contexto

El sistema heredado corre sobre .NET 6, que alcanzó End of Life en noviembre 2024.
EF Core 6.0.0 tiene CVE-2024-0057 (CVSS 9.1). Hay que actualizar el runtime.
Las opciones son .NET 8 LTS (soporte hasta noviembre 2026) o .NET 9 (soporte corto, no LTS).

---

## Decisión

**Target: .NET 8 LTS.** No se salta a .NET 9.

---

## Opciones consideradas

| Opción | Pros | Contras |
|---|---|---|
| **.NET 8 LTS (elegida)** | Soporte hasta nov 2026. Breaking changes bien documentados. EF Core 8 resuelve CVE-2024-0057. Estable en producción desde nov 2023. | No es la versión más reciente. |
| .NET 9 | Versión más reciente. Mejoras de rendimiento adicionales. | No es LTS — soporte solo hasta mayo 2026. Mayor riesgo de breaking changes no documentados. Innecesario para los objetivos del Sprint 1. |
| Permanecer en .NET 6 + patch | Sin riesgo de breaking changes. | .NET 6 EOL — sin parches de seguridad futuros. CVE-2024-0057 no resoluble sin upgrade. Incompatible con RNF-B09. |

---

## Consecuencias

**Positivas:**
- CVE-2024-0057 resuelto en EF Core 8.x.
- CVE-2024-21319 resuelto en JwtBearer 8.x.
- Runtime con soporte activo hasta noviembre 2026, cubriendo el horizonte del proyecto (S1–S4).
- Base estable para el CI/CD de Sprint 1 (GitHub Actions con `dotnet 8.0.x`).

**Trade-offs:**
- Breaking changes de EF Core 8 deben verificarse (mapa documentado en LLD-SPRINT-001, sección 3.2).
- Requiere actualizar el workflow de CI con `dotnet-version: '8.0.x'`.

**Riesgos:**
- BUILD_UNKNOWN (R-S1-002): el sistema nunca ha sido compilado en entorno controlado. El primer `dotnet build` en .NET 8 puede revelar errores adicionales. Mitigación: verificar build en día 1 del sprint antes de cualquier otro cambio.

**Impacto en servicios existentes:** ninguno — el contrato de API no cambia.

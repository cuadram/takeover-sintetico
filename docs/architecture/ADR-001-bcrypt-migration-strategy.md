# ADR-001 — Estrategia de migración BCrypt: 1 fase vs 2 fases

**Feature:** STAB-S1 · **RT:** RT-005 · **Jira:** FF-9
**Fecha:** 2026-04-10 · **Estado:** Aceptado
**Decidido por:** Angel (Tech Lead)

---

## Contexto

La tabla `Usuarios` almacena contraseñas en texto plano (columna `Password nvarchar(max)`).
Hay que migrar a BCrypt. Existen dos estrategias posibles:

- **1 fase:** hashear todos los passwords existentes Y eliminar la columna `Password` en una única operación.
- **2 fases:** en Sprint 1, añadir `PasswordHash` y hashear los passwords manteniendo `Password` como nullable; en Sprint 2, eliminar la columna `Password`.

La migración de datos es irreversible una vez que se vacía `Password`. El sistema está en producción activa con usuarios reales.

---

## Decisión

**Se adopta la estrategia de 2 fases:**
- **Fase 1 (Sprint 1):** añadir columna `PasswordHash`, ejecutar script de migración de datos (BCrypt cost 12), vaciar columna `Password` (NULL). La columna `Password` permanece en el esquema como nullable.
- **Fase 2 (Sprint 2):** eliminar la columna `Password` del esquema una vez confirmado que el sistema funciona correctamente en producción.

---

## Opciones consideradas

| Opción | Pros | Contras |
|---|---|---|
| **2 fases (elegida)** | Rollback posible en Sprint 1 sin pérdida de datos. Menor riesgo operativo. | La columna `Password` permanece en el esquema una iteración más. |
| 1 fase | Esquema limpio inmediatamente. Menos trabajo total. | Si el sistema falla en producción tras el despliegue, el rollback requiere restaurar backup completo de BD. Riesgo alto para un sistema sin CI/CD previo. |

---

## Consecuencias

**Positivas:**
- El rollback en caso de fallo en producción es posible sin pérdida de datos: basta con revertir el código y la migración EF Core (`dotnet ef database update [migration-anterior]`).
- El equipo puede verificar el comportamiento del sistema con BCrypt en producción antes de eliminar el fallback.

**Trade-offs:**
- La columna `Password` (vaciada, nullable) permanece en el esquema durante Sprint 1. No supone riesgo de seguridad adicional porque está en NULL.
- Requiere una migración EF Core adicional en Sprint 2 para eliminar la columna.

**Riesgos:**
- Riesgo residual: si alguien escribe código que lee `Password` en lugar de `PasswordHash`, obtendría NULL. Mitigación: eliminar cualquier referencia a `Password` en el código de autenticación en Sprint 1.

**Impacto en servicios existentes:** ninguno — el contrato de API no cambia.

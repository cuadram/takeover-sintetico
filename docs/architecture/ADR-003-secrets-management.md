# ADR-003 — Gestión de secrets: variables de entorno vs Azure Key Vault

**Feature:** STAB-S1 · **RT:** RT-001, RT-002 · **Jira:** FF-5, FF-6
**Fecha:** 2026-04-10 · **Estado:** Aceptado
**Decidido por:** Angel (Tech Lead)

---

## Contexto

Los secrets (JWT secret, DB password) están hardcodeados en `appsettings.json`.
Deben externalizarse de forma inmediata (tag INMEDIATO en ambos issues).
Las opciones son variables de entorno del sistema operativo/servidor, o un gestor
de secrets dedicado (Azure Key Vault, HashiCorp Vault, AWS Secrets Manager).

El entorno actual es un servidor Windows con despliegue manual FTP. No existe
Azure ni infraestructura cloud. El CI/CD aún no está implantado (se hace en este sprint).

---

## Decisión

**Variables de entorno del servidor** para Sprint 1.
La migración a Azure Key Vault o equivalente queda aplazada para Sprint 3–4
cuando exista infraestructura cloud y el equipo tenga mayor madurez operativa.

---

## Opciones consideradas

| Opción | Pros | Contras |
|---|---|---|
| **Variables de entorno (elegida)** | Implementación inmediata (horas). Sin dependencias externas. Soporte nativo en ASP.NET Core con IConfiguration. Reversible fácilmente. | Secrets visibles para usuarios con acceso al servidor. Sin auditoría de acceso ni rotación automática. |
| Azure Key Vault | Auditoría completa. Rotación automática. RBAC granular. | Requiere subscripción Azure activa. Tiempo de setup: días. Dependencia de infraestructura cloud inexistente. Incompatible con el plazo INMEDIATO. |
| HashiCorp Vault | Open source. Sin dependencia de cloud. Auditoría. | Requiere infraestructura adicional (servidor Vault). Complejidad de operación elevada para el equipo actual. |
| Fichero `.env` (no versionado) | Sencillo. Sin dependencias. | No es el patrón estándar en .NET. Requiere librería adicional. Riesgo de que el fichero acabe en el repo por error. |

---

## Consecuencias

**Positivas:**
- RT-001 y RT-002 se resuelven en horas, no días: elimina la exposición inmediata de credenciales.
- ASP.NET Core soporta natively variables de entorno con notación `__` para secciones anidadas — sin código adicional.
- Preparado para migrar a Key Vault en el futuro: el código que lee `IConfiguration` no cambia, solo la fuente de los valores.

**Trade-offs:**
- Un administrador del servidor puede leer las variables de entorno. Aceptable dado el contexto actual (servidor on-premise de RetailCorp con acceso controlado).
- No hay rotación automática ni auditoría de accesos. Aceptable para Sprint 1 como solución intermedia.

**Riesgos:**
- Si el servidor no soporta variables de entorno persistentes (improbable en Windows Server), puede requerirse una solución alternativa como un fichero de configuración fuera del repositorio. Mitigación: verificar soporte en día 1 (Supuesto S-002 del SRS).

**Hoja de ruta:**
- Sprint 3–4: evaluar migración a Azure Key Vault cuando exista infraestructura cloud. El código de lectura de configuración no requerirá cambios — solo la configuración del proveedor en `Program.cs`.

**Impacto en servicios existentes:** ninguno.

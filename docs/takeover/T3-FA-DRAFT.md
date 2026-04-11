# Análisis Funcional Inicial — Takeover Sprint 0
**Proyecto:** FacturaFlow · **Cliente:** RetailCorp S.L. (Laboratorio Sintético SOFIA)
**Fecha:** 2026-04-07 · **Agente:** FA Reverse Agent SOFIA v1.0
**Estrategia DTS:** DOCUMENT-LED + CODE-VALIDATED (DTS_FUNC=0.645 GOOD · DTS_API=0.820 TRUSTED)
**Versión:** 0.1 (draft takeover)

> Fuentes utilizadas: tests existentes · endpoints/controllers · esquema de BD · manual-funcional.md (DTS=0.645) · openapi.yaml (DTS=0.820)
> arquitectura-2020.md: EXCLUIDA (ZOMBIE — decisión GT-0)

---

## 1. Contexto de Negocio

**Dominio:** Gestión de Facturación — Retail

**Descripción:** FacturaFlow es el sistema de gestión de facturación de RetailCorp S.L. Permite crear, emitir y controlar el ciclo de vida de facturas a clientes nacionales y europeos, gestionando automáticamente el régimen de IVA según el tipo de cliente. El sistema está en producción desde 2022 y gestiona más de 8.000 facturas anuales.

### Actores del sistema

| Rol | Capacidades principales | Fuente |
|---|---|---|
| **Administrador** | Acceso completo: gestión de clientes, facturas, usuarios e informes. Único que puede eliminar borradores y anular emitidas. | Código `[Authorize(Roles)]` + manual §5.1 |
| **Comercial** | Crear y modificar clientes. Crear facturas. Sin acceso a usuarios. | Código `[Authorize(Roles)]` + manual §5.1 |
| **Contabilidad** | Consulta de clientes y facturas. Registrar cobro de facturas emitidas (no implementado aún). | manual-funcional.md §5.1 |
| **Solo Lectura** | Consulta únicamente. Sin capacidad de modificación. | Rol por defecto en entidad Usuario |

### Regulaciones detectadas en el código

| Regulación | Evidencia | Impacto detectado |
|---|---|---|
| AEAT (auditoría fiscal) | Comentario FIXME en FacturasController: DELETE físico incumple auditoría AEAT | El borrado de facturas debe ser lógico (→ ANULADA), no físico |
| GDPR | Comentario FIXME en FacturasController: DELETE físico viola audit trail GDPR | Ídem — DEBT-TK-008 |

---

## 2. Módulos Funcionales

| Módulo | Descripción | FAs identificadas | Confianza |
|---|---|---|---|
| **MOD-TK-001** — Gestión de Clientes | Catálogo de clientes con clasificación fiscal | 5 | HIGH |
| **MOD-TK-002** — Gestión de Facturas | Ciclo de vida de facturas: creación, emisión, cobro, anulación | 7 (+2 DISCREPANCY) | HIGH |
| **MOD-TK-003** — Usuarios y Control de Acceso | Autenticación JWT y gestión de usuarios | 2 | MEDIUM |
| **MOD-TK-004** — Informes y Exportación | Informes de facturación y exportación PDF | 0 (**DISCREPANCY**) | NONE |

---

## 3. Catálogo de Funcionalidades

---

### MOD-TK-001 — Gestión de Clientes

---

#### FA-TK-003 — Consulta del catálogo de clientes
**Estado:** EXISTING · **Confianza:** HIGH
**Fuentes:** GET /api/v1/clientes · openapi.yaml (DTS=0.820) · manual §2.2

**Descripción:** Cualquier usuario autenticado puede consultar el listado completo de clientes del sistema. El listado devuelve para cada cliente: razón social, NIF/CIF, email, teléfono, dirección, estado activo/inactivo, tipo de cliente y fecha de alta.

**Reglas de negocio:**
- RN-TK-012: Todos los endpoints requieren autenticación. Los no autenticados reciben error 401.

---

#### FA-TK-004 — Alta de nuevo cliente
**Estado:** EXISTING · **Confianza:** HIGH
**Fuentes:** POST /api/v1/clientes · openapi.yaml (DTS=0.820) · manual §2.1 · índice único NIF/CIF en BD

**Descripción:** Los usuarios con rol Administrador o Comercial pueden registrar nuevos clientes. Los campos obligatorios son: razón social, NIF/CIF, email y tipo de cliente. El NIF/CIF debe ser único en el sistema.

**Reglas de negocio:**
- RN-TK-003: Solo Administrador y Comercial pueden crear clientes.
- RN-TK-004: El NIF/CIF de un cliente debe ser único en el sistema.
- RN-TK-007: El tipo de cliente (NACIONAL/EUROPEO/EXTRACOMUNITARIO) determina el régimen de IVA aplicable en las facturas. ⚠️ *Regla documentada — la lógica de aplicación automática NO está implementada actualmente.*

> ⚠️ **Pendiente validación GT-3:** La validación de NIF/CIF único en el endpoint está marcada como TODO en el código — actualmente se delega en la BD sin mensaje de error amigable.

---

#### FA-TK-005 — Consulta de detalle de cliente
**Estado:** EXISTING · **Confianza:** HIGH
**Fuentes:** GET /api/v1/clientes/{id} · openapi.yaml (DTS=0.820)

**Descripción:** Cualquier usuario autenticado puede consultar el detalle completo de un cliente por su identificador. Si el cliente no existe, el sistema devuelve un error de no encontrado.

---

#### FA-TK-006 — Actualización de datos de cliente
**Estado:** EXISTING · **Confianza:** HIGH
**Fuentes:** PUT /api/v1/clientes/{id} · openapi.yaml (DTS=0.820) · manual §2.3

**Descripción:** Los usuarios con rol Administrador o Comercial pueden actualizar los datos de un cliente existente. La operación reemplaza los datos del cliente con los nuevos valores proporcionados.

**Reglas de negocio:**
- RN-TK-003: Solo Administrador y Comercial pueden modificar clientes.

---

#### FA-TK-007 — Consulta de facturas de un cliente
**Estado:** EXISTING · **Confianza:** HIGH
**Fuentes:** GET /api/v1/clientes/{id}/facturas · openapi.yaml (DTS=0.820)

**Descripción:** Cualquier usuario autenticado puede consultar todas las facturas asociadas a un cliente concreto, identificado por su código de cliente.

---

### MOD-TK-002 — Gestión de Facturas

---

#### FA-TK-001 — Estado inicial de borrador al crear una factura
**Estado:** EXISTING · **Confianza:** HIGH
**Fuentes:** Test `Factura_EstadoInicial_DebeSerBorrador` · POST /api/v1/facturas · BD schema

**Descripción:** Toda factura recién creada en el sistema adopta automáticamente el estado BORRADOR. Este estado indica que la factura es editable y aún no ha sido emitida al cliente.

**Reglas de negocio:**
- RN-TK-001: Toda factura se crea siempre en estado BORRADOR.
- RN-TK-002: El porcentaje de IVA por defecto al crear una factura es el 21%.

---

#### FA-TK-002 — Cálculo del importe total de una factura
**Estado:** EXISTING · **Confianza:** MEDIUM ⚠️
**Fuentes:** Test `Factura_Total_DebeCalcularseCorrectamente` · BD schema (columnas separadas)

**Descripción:** El importe total de una factura se calcula sumando la base imponible más el IVA correspondiente: Total = Base Imponible + (Base Imponible × Porcentaje IVA / 100). El porcentaje de IVA por defecto es el 21%.

**Reglas de negocio:**
- RN-TK-013: Total = Base Imponible + (Base Imponible × PorcentajeIVA / 100). ⚠️ *El cálculo no es automático en el sistema actual — el cliente de la API debe calcular y enviar el Total.*

> ⚠️ **Pendiente validación GT-3:** El test que verifica esta funcionalidad contiene un FIXME explícito: realiza el cálculo manualmente en el test, no verifica que el sistema lo calcule de forma automática. Confirmar con el PO si el cálculo debe ser responsabilidad del backend.

---

#### FA-TK-008 — Consulta de listado de facturas con filtro por estado
**Estado:** EXISTING · **Confianza:** HIGH
**Fuentes:** GET /api/v1/facturas?estado= · openapi.yaml (DTS=0.820) · manual §3.2

**Descripción:** Cualquier usuario autenticado puede consultar el listado de facturas del sistema. El listado puede filtrarse opcionalmente por estado: BORRADOR, EMITIDA, PAGADA o ANULADA. Sin filtro se devuelven todas las facturas.

**Reglas de negocio:**
- RN-TK-011: Los estados válidos para filtrar son BORRADOR, EMITIDA, PAGADA y ANULADA.

> ⚠️ **Nota técnica:** El filtrado se realiza actualmente en memoria (HACK documentado en código). Con el volumen de 8.000 facturas anuales puede impactar en el rendimiento. Registrado como DEBT-TK-010.

---

#### FA-TK-009 — Creación de factura en estado borrador
**Estado:** EXISTING · **Confianza:** HIGH
**Fuentes:** POST /api/v1/facturas · openapi.yaml (DTS=0.820) · manual §3.1

**Descripción:** Los usuarios autenticados pueden crear nuevas facturas. Toda factura nueva se crea en estado BORRADOR. Los datos obligatorios son: cliente y base imponible. El porcentaje de IVA se sugiere por defecto al 21%.

**Reglas de negocio:**
- RN-TK-001: Estado inicial siempre BORRADOR.
- RN-TK-002: IVA por defecto 21%.
- RN-TK-013: Fórmula de cálculo del total.

> ⚠️ **Pendiente validación GT-3:** El endpoint no valida que el cliente exista antes de crear la factura (TODO explícito). El número de factura autoincremental por ejercicio fiscal no está implementado.

---

#### FA-TK-010 — Consulta de detalle de factura
**Estado:** EXISTING · **Confianza:** HIGH
**Fuentes:** GET /api/v1/facturas/{id} · openapi.yaml (DTS=0.820)

**Descripción:** Cualquier usuario autenticado puede consultar el detalle completo de una factura por su identificador. Si la factura no existe, el sistema devuelve un error de no encontrado.

---

#### FA-TK-011 — Emisión de factura al cliente
**Estado:** EXISTING · **Confianza:** HIGH
**Fuentes:** PUT /api/v1/facturas/{id}/emitir · openapi.yaml (DTS=0.820) · manual §4

**Descripción:** Los usuarios autenticados pueden emitir una factura en estado BORRADOR, cambiándola a estado EMITIDA. Solo se pueden emitir facturas en estado BORRADOR. Al emitirse, se registra automáticamente la fecha de emisión.

**Reglas de negocio:**
- RN-TK-006: Solo se pueden emitir facturas en estado BORRADOR.

> ⚠️ **Pendiente validación GT-3:** El manual indica que la emisión requiere que el cliente esté activo — esta validación no está implementada en el código. Confirmar si es requisito pendiente.

---

#### FA-TK-012 — Eliminación de factura en borrador
**Estado:** EXISTING · **Confianza:** HIGH ⚠️ (comportamiento técnicamente incorrecto)
**Fuentes:** DELETE /api/v1/facturas/{id} · openapi.yaml (DTS=0.820) · manual §4

**Descripción:** Solo el Administrador puede eliminar facturas en estado BORRADOR. La funcionalidad existe y está operativa, pero el comportamiento actual (eliminación física del registro) no cumple los requisitos de auditoría fiscal AEAT ni GDPR. Está pendiente de cambio a transición de estado → ANULADA.

**Reglas de negocio:**
- RN-TK-005: Solo el Administrador puede eliminar facturas en borrador.

> ⚠️ **Deuda técnica DEBT-TK-008:** Esta funcionalidad debe evolucionar a "Anulación de borrador" (cambio a estado ANULADA sin borrado físico) para cumplir AEAT y GDPR. Confirmar con PO si el cambio entra en Sprint 1.

---

### MOD-TK-003 — Gestión de Usuarios y Control de Acceso

---

#### FA-TK-013 — Autenticación y control de acceso por rol
**Estado:** EXISTING · **Confianza:** MEDIUM
**Fuentes:** Configuración JWT en appsettings.json · `[Authorize]` en todos los controllers · BD tabla Usuarios

**Descripción:** El sistema protege todos sus endpoints mediante autenticación JWT. Los tokens JWT tienen validez de 24 horas. El acceso a cada operación está controlado por el rol del usuario: Administrador, Comercial, Contabilidad y Solo Lectura.

**Reglas de negocio:**
- RN-TK-012: Todos los endpoints requieren autenticación. Los no autenticados reciben error 401.

> ⚠️ **Pendiente validación GT-3:** No se ha detectado endpoint de inicio de sesión (login) en el repositorio analizado. Confirmar con el equipo saliente cómo se generan los tokens JWT en el sistema actual.

---

#### FA-TK-014 — Gestión de usuarios del sistema
**Estado:** UNKNOWN · **Confianza:** LOW
**Fuentes:** BD tabla Usuarios · manual-funcional.md §5 (DTS=0.645)

**Descripción:** El sistema dispone de una tabla de usuarios con credenciales y roles. La documentación indica que el Administrador puede gestionar usuarios (crear, modificar, activar/desactivar). No se ha detectado ningún controller de usuarios en el repositorio entregado.

> ⚠️ **Pendiente validación GT-3 — BLOQUEANTE para este FA:** Verificar con el equipo saliente si (a) existe un controller de usuarios no incluido en el repositorio, (b) la gestión es manual vía BD, o (c) nunca fue implementada.

---

## 4. Ciclo de vida de una factura (estado actual del sistema)

```
                    [FA-TK-009]
                    CREAR factura
                         │
                         ▼
                     BORRADOR ─────────────── [FA-TK-012] ──► ELIMINACIÓN FÍSICA
                         │                   (Solo Admin)      ⚠️ Incorrecto — DEBT-TK-008
                         │ [FA-TK-011]
                         │ Emitir
                         ▼
                     EMITIDA ──────────────── [DISC-T3-002] ──► ANULADA
                         │                   (No implementado)
                         │ [DISC-T3-001]
                         │ Registrar pago
                         ▼                   (No implementado)
                     PAGADA

Estados implementados: BORRADOR ✅ · EMITIDA ✅ · PAGADA ⚠️ (campo existe, transición no) · ANULADA ⚠️ (ídem)
```

---

## 5. Funcionalidades pendientes de validación en GT-3

| ID | Nombre | Tipo de validación | Fuente de aclaración |
|---|---|---|---|
| FA-TK-002 | Cálculo del total de factura | ¿El backend debe calcular automáticamente? | PO |
| FA-TK-004 | Alta de cliente | Comportamiento ante NIF/CIF duplicado | PO + equipo saliente |
| FA-TK-008 | Listado de facturas | Rendimiento con filtrado en memoria — plan de mejora | TL + PO |
| FA-TK-009 | Creación de factura | Validación de cliente existente + numeración por ejercicio | PO |
| FA-TK-011 | Emisión de factura | ¿Requiere validar que el cliente esté activo? | PO |
| FA-TK-012 | Eliminación de borrador | ¿Cambia a "Anulación de borrador" en Sprint 1? | PO |
| FA-TK-013 | Autenticación | ¿Dónde se genera el token JWT? ¿Endpoint de login? | Equipo saliente |
| FA-TK-014 | Gestión de usuarios | ¿Existe controller no entregado o gestión manual? | Equipo saliente |

---

## 6. Resumen de cobertura funcional

| Módulo | EXISTING | UNKNOWN | DOCUMENTED-NOT-FOUND | Total identificadas |
|---|---|---|---|---|
| MOD-TK-001 — Clientes | 5 | 0 | 0 | 5 |
| MOD-TK-002 — Facturas | 7 | 0 | 2 | 9 |
| MOD-TK-003 — Usuarios/Acceso | 1 | 1 | 0 | 2 |
| MOD-TK-004 — Informes/Export | 0 | 0 | 2 | 2 |
| **Total** | **13** | **1** | **4** | **18** |

> Las 4 funcionalidades DOCUMENTED-NOT-FOUND están en `discrepancies[]` del fa-index.json y en T3-FA-GAPS.md. No se incluyen en el catálogo principal hasta resolución en GT-3.

**Funcionalidades EXISTING con alta confianza (HIGH):** 10
**Funcionalidades EXISTING con confianza MEDIUM:** 3
**Funcionalidades UNKNOWN:** 1
**Funcionalidades que requieren validación en GT-3:** 8
**DISCREPANCYs abiertas (bloquean GT-3):** 4 — detalle en T3-FA-GAPS.md

**Reglas de negocio identificadas:** 13 (10 HIGH confianza · 3 MEDIUM/inferred)

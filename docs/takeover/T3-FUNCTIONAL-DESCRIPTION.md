# Descripción Funcional del Sistema Heredado — FacturaFlow
**Proyecto:** FacturaFlow · **Cliente:** RetailCorp S.L.
**Sprint:** 0 — Takeover · **Producido por:** SOFIA FA Reverse Agent
**Versión:** 1.0 · **Fecha:** 2026-04-10
**Audiencia:** Equipo Experis (Tech Lead, PO, desarrolladores, QA), RetailCorp S.L.

> **Propósito de este documento:** Explicar en lenguaje de negocio qué hace el sistema que Experis ha recibido, qué funciona, qué no funciona y cuáles son sus reglas de negocio. Es el punto de partida funcional del proyecto antes del primer sprint evolutivo.

---

## 1. ¿Qué es FacturaFlow?

FacturaFlow es el sistema de gestión de facturación de RetailCorp S.L. Lleva en producción desde 2022 y gestiona el ciclo de vida de las facturas emitidas por RetailCorp a sus clientes: desde su creación en borrador hasta su cobro o anulación.

El sistema permite a los equipos de ventas (Comercial), administración (Admin) y contabilidad (Contabilidad) trabajar sobre un catálogo centralizado de clientes y facturas, con control de acceso por rol.

**Tecnología:** Aplicación web backend .NET 6, base de datos SQL Server, API REST. Sin interfaz web propia — los accesos son vía API o herramientas externas.

**Volumen estimado en producción:** más de 8.000 facturas anuales.

---

## 2. ¿Quién usa el sistema?

El sistema tiene cuatro tipos de usuario. Cada uno tiene un conjunto distinto de permisos.

| Rol | Qué puede hacer |
|-----|-----------------|
| **Administrador** | Acceso completo. Gestiona clientes, facturas, usuarios e informes. Es el único que puede eliminar borradores y anular facturas emitidas. |
| **Comercial** | Puede crear y modificar clientes, y crear facturas. No gestiona usuarios. |
| **Contabilidad** | Puede consultar clientes y facturas. Está previsto que registre cobros de facturas emitidas (esta funcionalidad **aún no está implementada**). |
| **Solo Lectura** | Únicamente consulta. Sin capacidad de modificar nada. |

**Autenticación:** El sistema utiliza tokens JWT con validez de 24 horas. Todos los accesos requieren autenticación — cualquier petición sin token válido es rechazada con error 401.

> ⚠️ **Nota de takeover:** No se ha localizado el endpoint de inicio de sesión (login) en el repositorio entregado. Está pendiente de confirmar con el equipo saliente cómo se generan los tokens en la instalación actual.

---

## 3. Módulos del sistema

FacturaFlow se organiza en cuatro módulos funcionales:

| Módulo | Estado | Descripción breve |
|--------|--------|-------------------|
| **Gestión de Clientes** | ✅ Operativo | Catálogo de clientes con clasificación fiscal |
| **Gestión de Facturas** | ⚠️ Parcialmente operativo | Ciclo de vida de facturas; cobro y anulación no implementados |
| **Usuarios y Acceso** | ⚠️ Parcialmente operativo | Autenticación JWT funcionando; CRUD de usuarios no localizado |
| **Informes y Exportación** | ❌ No operativo | Informes REST no implementados; código PDF no entregado |

---

## 4. Módulo: Gestión de Clientes

Este módulo permite mantener el catálogo de clientes de RetailCorp. **Estado: completamente operativo.**

### 4.1 Consulta del catálogo de clientes
Cualquier usuario autenticado puede obtener el listado completo de clientes. El listado incluye: razón social, NIF/CIF, email, teléfono, dirección, estado activo/inactivo, tipo de cliente y fecha de alta.

### 4.2 Alta de nuevo cliente
Los usuarios con rol **Administrador o Comercial** pueden registrar nuevos clientes. Los datos obligatorios son razón social, NIF/CIF, email y tipo de cliente.

**Reglas de negocio:**
- El NIF/CIF debe ser único en el sistema. Si se intenta registrar un NIF/CIF duplicado, la base de datos rechaza la operación (actualmente sin mensaje de error amigable — mejora pendiente).
- El tipo de cliente puede ser NACIONAL, EUROPEO o EXTRACOMUNITARIO. Este tipo determina el régimen de IVA aplicable, aunque la aplicación automática del IVA por tipo **no está implementada** actualmente.

### 4.3 Consulta del detalle de un cliente
Cualquier usuario autenticado puede consultar los datos completos de un cliente concreto. Si el cliente no existe, el sistema devuelve un error de no encontrado.

### 4.4 Actualización de datos de cliente
Los usuarios con rol **Administrador o Comercial** pueden modificar los datos de un cliente existente.

### 4.5 Consulta de facturas de un cliente
Cualquier usuario autenticado puede obtener todas las facturas asociadas a un cliente concreto.

---

## 5. Módulo: Gestión de Facturas

Este módulo gestiona el ciclo de vida de las facturas. **Estado: parcialmente operativo** — la creación y emisión funcionan; el registro de cobro y la anulación formal no están implementados.

### 5.1 Ciclo de vida de una factura

```
                  CREAR factura
                       │
                       ▼
                   BORRADOR ──── (Solo Admin) ──── ELIMINACIÓN FÍSICA ⚠️
                       │                            (incorrecto — ver §5.5)
                       │ Emitir
                       ▼
                   EMITIDA ────── Registrar pago ──► PAGADA
                       │          (NO implementado)
                       │ Anular
                       └─────────────────────────►  ANULADA
                                (NO implementado)
```

**Estados existentes en base de datos:** BORRADOR ✅ · EMITIDA ✅ · PAGADA ⚠️ · ANULADA ⚠️
*(PAGADA y ANULADA existen como estados en la base de datos pero sus transiciones aún no están implementadas como endpoints.)*

### 5.2 Creación de factura en borrador
Cualquier usuario autenticado puede crear una factura nueva. La factura se crea siempre en estado **BORRADOR**. Los campos obligatorios son el cliente y la base imponible. El porcentaje de IVA por defecto es el **21%**.

**Reglas de negocio:**
- Toda factura nueva es siempre BORRADOR — nunca se crea directamente en otro estado.
- IVA por defecto: 21%.
- El importe total se calcula como: `Total = Base Imponible + (Base Imponible × % IVA / 100)`.

> ⚠️ **Nota de takeover:** Actualmente el cálculo del total no es automático en el backend — el cliente de la API debe calcular y enviar el campo Total ya calculado. Pendiente de confirmar con el PO si el backend debe calcularle automáticamente.

### 5.3 Consulta del listado de facturas
Cualquier usuario autenticado puede consultar el listado de facturas, con filtro opcional por estado (BORRADOR, EMITIDA, PAGADA, ANULADA). Sin filtro se devuelven todas.

> ⚠️ **Nota técnica:** El filtrado se realiza actualmente en memoria (no en base de datos). Con el volumen actual de 8.000 facturas anuales puede generar problemas de rendimiento. Está registrado como deuda técnica.

### 5.4 Consulta del detalle de una factura
Cualquier usuario autenticado puede consultar el detalle completo de una factura por su identificador.

### 5.5 Emisión de factura al cliente
Cualquier usuario autenticado puede emitir una factura en estado BORRADOR, cambiándola a **EMITIDA**. Solo se pueden emitir facturas en estado BORRADOR. Al emitirse, se registra automáticamente la fecha de emisión.

**Regla de negocio:** No es posible emitir una factura que no esté en estado BORRADOR — el sistema lo rechaza.

### 5.6 Eliminación de borrador ⚠️ (comportamiento incorrecto)
Solo el **Administrador** puede eliminar facturas en estado BORRADOR. El sistema borra físicamente el registro de la base de datos. **Este comportamiento es técnicamente incorrecto** desde el punto de vista de auditoría fiscal (AEAT) y protección de datos (GDPR): un borrado físico elimina el rastro de la operación. La funcionalidad debe evolucionar a una transición de estado → ANULADA, conservando el registro. Está registrado como deuda de cumplimiento normativo prioritaria.

### 5.7 Registro de pago (EMITIDA → PAGADA) — NO IMPLEMENTADO
El sistema tiene previsto el registro del cobro de una factura emitida, transicionando su estado a PAGADA. Esta funcionalidad **no está implementada**: el estado PAGADA existe en la base de datos pero no existe el endpoint correspondiente. Está pendiente de implementar en Sprint 1.

**Regla de negocio prevista:** Solo Contabilidad y Administrador podrán registrar el pago de una factura emitida.

### 5.8 Anulación de factura emitida (EMITIDA → ANULADA) — NO IMPLEMENTADO
La anulación formal de una factura emitida **no está implementada**. El estado ANULADA existe en la base de datos pero no existe el endpoint de anulación. Está pendiente de implementar en Sprint 1, coordinado con la corrección del comportamiento de eliminación (§5.6).

**Regla de negocio prevista:** Solo el Administrador podrá anular una factura emitida.

---

## 6. Módulo: Usuarios y Control de Acceso

**Estado: parcialmente operativo.** La autenticación funciona en producción; la gestión de usuarios no está localizada en el repositorio.

El sistema dispone de una tabla de usuarios con email único, contraseña y rol. La autenticación se realiza mediante tokens JWT válidos durante 24 horas. Todos los endpoints del sistema exigen autenticación.

> ⚠️ **Pendiente de confirmar con el equipo saliente:**
> - Cómo se generan los tokens JWT (no hay endpoint de login en el repositorio entregado).
> - Si existe un módulo de gestión de usuarios (alta, modificación, activar/desactivar) no incluido en el repositorio, o si la gestión se realiza manualmente en base de datos.

**Nota de seguridad crítica:** Las contraseñas de los usuarios están almacenadas en texto plano en la base de datos. Esta vulnerabilidad es crítica y está programada para resolverse en Sprint 1 como prioridad máxima.

---

## 7. Módulo: Informes y Exportación

**Estado: no operativo.** Este módulo no tiene implementación funcional en el repositorio recibido.

### 7.1 Informes de facturación — NO IMPLEMENTADOS
El manual funcional describe tres informes pendientes de implementar:
- Facturas por período.
- Facturas pendientes de cobro.
- Volumen de facturación por cliente.

No existe ningún endpoint REST ni librería de reporting en el código entregado.

### 7.2 Exportación de factura a PDF — CÓDIGO NO ENTREGADO
La exportación de facturas a PDF **existe en el sistema en producción** pero el código fuente **no fue incluido en el repositorio entregado**. Es necesario recuperarlo urgentemente del equipo saliente (Miguel Fernández, TI RetailCorp) antes de cualquier intervención en los servidores de producción. Si el código solo existe en el servidor de producción sin respaldo en repositorio, existe riesgo real de pérdida permanente.

---

## 8. Resumen de funcionalidades

| # | Funcionalidad | Módulo | Estado | Confianza |
|---|---------------|--------|--------|-----------|
| FA-TK-001 | Estado inicial BORRADOR al crear factura | Facturas | ✅ Implementado | Alta |
| FA-TK-002 | Cálculo del importe total | Facturas | ✅ Implementado (manual) | Media |
| FA-TK-003 | Consulta del catálogo de clientes | Clientes | ✅ Implementado | Alta |
| FA-TK-004 | Alta de nuevo cliente | Clientes | ✅ Implementado | Alta |
| FA-TK-005 | Consulta de detalle de cliente | Clientes | ✅ Implementado | Alta |
| FA-TK-006 | Actualización de datos de cliente | Clientes | ✅ Implementado | Alta |
| FA-TK-007 | Consulta de facturas de un cliente | Clientes | ✅ Implementado | Alta |
| FA-TK-008 | Listado de facturas con filtro | Facturas | ✅ Implementado | Alta |
| FA-TK-009 | Creación de factura en borrador | Facturas | ✅ Implementado | Alta |
| FA-TK-010 | Consulta de detalle de factura | Facturas | ✅ Implementado | Alta |
| FA-TK-011 | Emisión de factura al cliente | Facturas | ✅ Implementado | Alta |
| FA-TK-012 | Eliminación de borrador (Admin) | Facturas | ⚠️ Implementado con error normativo | Alta |
| FA-TK-013 | Autenticación y control de acceso | Acceso | ⚠️ Implementado (login no localizado) | Media |
| FA-TK-014 | Gestión de usuarios del sistema | Acceso | ❓ No confirmado | Baja |
| — | Registro de pago (→PAGADA) | Facturas | ❌ No implementado | — |
| — | Anulación de factura emitida (→ANULADA) | Facturas | ❌ No implementado | — |
| — | Informes de facturación (×3) | Informes | ❌ No implementado | — |
| — | Exportación PDF | Informes | ❌ Código no entregado | — |

**Total funcionalidades confirmadas en código:** 12 implementadas + 1 con error normativo + 1 desconocida.
**Total funcionalidades pendientes de implementar:** 4 (backlog Sprint 1 y siguientes).

---

## 9. Reglas de negocio del sistema

| Código | Descripción | Confianza | Fuente |
|--------|-------------|-----------|--------|
| RN-TK-001 | Toda factura nueva se crea siempre en estado BORRADOR. | Alta | Código + tests |
| RN-TK-002 | El porcentaje de IVA por defecto es el 21%. | Alta | Código + BD |
| RN-TK-003 | Solo Administrador y Comercial pueden crear y modificar clientes. | Alta | Código |
| RN-TK-004 | El NIF/CIF de un cliente debe ser único en el sistema. | Alta | BD (índice único) |
| RN-TK-005 | Solo el Administrador puede eliminar facturas en estado BORRADOR. | Alta | Código |
| RN-TK-006 | Solo se pueden emitir facturas en estado BORRADOR. | Alta | Código |
| RN-TK-007 | El tipo de cliente determina el régimen de IVA: NACIONAL (21%), EUROPEO (exento), EXTRACOMUNITARIO (no aplicable). | Media | Documentación |
| RN-TK-008 | Solo Contabilidad y Admin pueden registrar el cobro de una factura emitida. *(Prevista — no implementada)* | Media | Documentación |
| RN-TK-009 | Solo el Administrador puede anular una factura emitida. *(Prevista — no implementada)* | Media | Documentación |
| RN-TK-010 | El email de cada usuario debe ser único en el sistema. | Alta | BD (índice único) |
| RN-TK-011 | El listado de facturas puede filtrarse por: BORRADOR, EMITIDA, PAGADA, ANULADA. | Alta | Código + API |
| RN-TK-012 | Todos los endpoints requieren autenticación. Sin token válido → error 401. | Alta | Código |
| RN-TK-013 | Total de factura = Base Imponible + (Base Imponible × % IVA / 100). | Media | Test + BD |

---

## 10. Preguntas abiertas que requieren respuesta

Las siguientes cuestiones no han podido resolverse con el repositorio y documentación entregados. Deben resolverse con el equipo saliente (Miguel Fernández, TI RetailCorp) en las primeras semanas de Sprint 1.

| Prioridad | Pregunta | Para quién |
|-----------|----------|------------|
| 🔴 URGENTE | ¿Dónde está el código del endpoint de exportación PDF? ¿En qué servidor? | Miguel Fernández |
| 🔴 URGENTE | ¿Cómo se generan los tokens JWT actualmente? ¿Hay un endpoint de login no entregado? | Miguel Fernández |
| 🟡 ALTA | ¿Existe un módulo de gestión de usuarios (CRUD) no incluido en el repositorio? | Miguel Fernández |
| 🟡 ALTA | ¿La emisión de una factura requiere que el cliente esté activo? (documentado, no implementado) | PO RetailCorp |
| 🟡 ALTA | ¿El backend debe calcular el Total automáticamente o es responsabilidad del consumidor de la API? | PO RetailCorp |
| 🟡 ALTA | La "eliminación de borrador" ¿debe cambiar a "anulación → ANULADA" en Sprint 1? (AEAT/GDPR) | PO RetailCorp |
| 🟢 MEDIA | ¿Cuál debe ser el comportamiento ante NIF/CIF duplicado? (actualmente: error genérico de BD) | PO RetailCorp |
| 🟢 MEDIA | Con 8.000+ facturas, ¿es aceptable el filtrado en memoria hasta que se corrija en BD? | PO + TL |
| 🟢 MEDIA | La numeración de facturas por ejercicio fiscal, ¿debe implementarse? ¿Cuál es el formato? | PO RetailCorp |

---

## 11. Riesgos funcionales activos

| Riesgo | Impacto | Acción |
|--------|---------|--------|
| Código PDF solo en servidor de producción sin repositorio | **Pérdida permanente** si el servidor falla antes de recuperarlo | Recuperar en los primeros días de Sprint 1 — URGENTE |
| DELETE físico de facturas viola AEAT y GDPR | **Incumplimiento normativo** — multas potenciales | Corregir en Sprint 1 como deuda prioritaria |
| Passwords en texto plano | **Brecha de seguridad crítica** — exposición de credenciales de todos los usuarios | Sprint 1 — máxima prioridad |
| Transiciones PAGADA y ANULADA no implementadas | Ciclo de vida funcional incompleto — impacto en contabilidad | Sprint 1 |
| Endpoint de login no localizado | Operaciones del sistema no reproducibles fuera de producción | Confirmar con equipo saliente urgentemente |

---

*Documento producido como parte del Pipeline Takeover SOFIA Sprint 0. Fuentes: código fuente .NET 6, esquema de base de datos, openapi.yaml (DTS=0.82 TRUSTED), manual-funcional.md (DTS=0.645 GOOD). arquitectura-2020.md excluida (ZOMBIE, DTS=0.21). Para el catálogo técnico detallado ver T3-FA-DRAFT.md y fa-index.json.*

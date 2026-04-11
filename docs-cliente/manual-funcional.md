# Manual Funcional — FacturaFlow
**Versión:** 2.1
**Fecha:** Octubre 2024
**Cliente:** RetailCorp S.L.
**Estado:** Revisado por Dpto. TI

---

## Índice
1. Introducción y alcance
2. Gestión de Clientes
3. Gestión de Facturas
4. Ciclo de vida de una factura
5. Gestión de Usuarios y Roles
6. Informes y exportación
7. Integraciones

---

## 1. Introducción y alcance

FacturaFlow es el sistema de gestión de facturación de RetailCorp S.L.
Permite crear, emitir y controlar facturas a clientes nacionales y europeos.
El sistema está en producción desde 2022 y gestiona actualmente más de
8.000 facturas anuales.

**Módulos activos:**
- Gestión de Clientes
- Gestión de Facturas
- Usuarios y Roles
- Informes básicos

**Módulos pendientes (en roadmap):**
- Integración con ERP SAP (pendiente desde 2023)
- Portal de cliente para descarga de facturas
- Firma digital de facturas

---

## 2. Gestión de Clientes

### 2.1 Alta de cliente
El usuario con rol **Comercial** o **Admin** puede crear nuevos clientes.
Datos obligatorios: Razón Social, NIF/CIF, Email, Tipo de Cliente.

**Tipos de cliente:**
- NACIONAL: IVA 21% aplicado automáticamente
- EUROPEO: Exento de IVA (intracomunitario)
- EXTRACOMUNITARIO: IVA no aplicable

**Validaciones:**
- NIF/CIF único en el sistema
- Email con formato válido
- Tipo de cliente determina el régimen de IVA en las facturas

### 2.2 Consulta de clientes
Todos los usuarios autenticados pueden consultar el listado de clientes.
El listado muestra: Razón Social, NIF/CIF, Email, Estado (Activo/Inactivo).

### 2.3 Modificación de cliente
Solo **Comercial** y **Admin** pueden modificar datos de un cliente.

---

## 3. Gestión de Facturas

### 3.1 Creación de factura
Cualquier usuario con rol **Comercial**, **Contabilidad** o **Admin** puede
crear facturas. Una factura nueva se crea siempre en estado **BORRADOR**.

**Datos de la factura:**
- Cliente (obligatorio)
- Número de factura (autoincremental por ejercicio fiscal)
- Fecha de vencimiento
- Base imponible
- Porcentaje de IVA (se sugiere automáticamente según tipo de cliente)
- Total = Base imponible + (Base × IVA%)

### 3.2 Consulta de facturas
El endpoint de listado permite filtrar por estado:
- Sin filtro: devuelve todas las facturas
- `?estado=BORRADOR`: solo borradores
- `?estado=EMITIDA`: solo emitidas
- `?estado=PAGADA`: solo pagadas

### 3.3 Exportación
Se sabe que existe un endpoint de exportación a PDF pero no está documentado
en este manual. El equipo de TI confirma que funciona pero no hay spec.

---

## 4. Ciclo de vida de una factura

```
BORRADOR → EMITIDA → PAGADA
              ↓
           ANULADA
```

**Transiciones permitidas:**
- BORRADOR → EMITIDA: acción "Emitir". Requiere cliente activo.
- EMITIDA → PAGADA: acción "Registrar pago". Solo Contabilidad y Admin.
- EMITIDA → ANULADA: acción "Anular". Solo Admin.
- BORRADOR → eliminación: Solo Admin puede eliminar borradores.

**Nota:** El sistema actual permite DELETE físico de facturas en BORRADOR.
Pendiente cambiar a ANULADA para cumplir auditoría fiscal (AEAT).

---

## 5. Gestión de Usuarios y Roles

### 5.1 Roles del sistema
| Rol | Clientes | Facturas | Usuarios | Informes |
|---|---|---|---|---|
| Admin | CRUD | CRUD + Anular | CRUD | Todos |
| Comercial | CRUD | Crear/Ver | No | Limitado |
| Contabilidad | Ver | Ver/Pagar | No | Todos |
| Solo_Lectura | Ver | Ver | No | No |

### 5.2 Gestión de passwords
**PENDIENTE URGENTE:** Las contraseñas se almacenan actualmente en texto
plano en la BD. Registrado como crítico desde enero 2024. Sin resolver.
Migración a bcrypt planificada para Q1 2025.

---

## 6. Informes y exportación

### 6.1 Informes disponibles
- Listado de facturas por período
- Facturas pendientes de cobro
- Volumen de facturación por cliente

**Estado:** Los informes funcionan pero no tienen endpoint REST documentado.

---

## 7. Integraciones

- SAP: Pendiente desde 2023. No implementada.
- Email notificaciones: No implementado.
- Portal cliente: En roadmap 2025.

---

*Documento elaborado por el Dpto. TI de RetailCorp S.L.*
*Última revisión: Octubre 2024 — Miguel Fernández (TI)*

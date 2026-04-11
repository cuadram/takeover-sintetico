# Arquitectura del Sistema — FacturaFlow
**Versión:** 1.0
**Fecha:** Marzo 2020
**Autor:** Carlos Ruiz (Arquitecto, ya no en la empresa)

---

## Visión General

FacturaFlow está diseñado como una arquitectura de microservicios
desplegada en contenedores Docker sobre Kubernetes.

**NOTA DEL AUTOR 2020:** Esta es la arquitectura objetivo. La implementación
actual puede diferir. Se dejó este documento como referencia del diseño inicial.

---

## Microservicios (diseño original 2020)

El sistema se diseñó originalmente con los siguientes microservicios:

### 1. factura-service
Responsable de la gestión completa del ciclo de vida de facturas.
- Stack: Java 11 + Spring Boot 2.4 + PostgreSQL
- Puerto: 8081

### 2. cliente-service
Responsable de la gestión del catálogo de clientes.
- Stack: Java 11 + Spring Boot 2.4 + PostgreSQL
- Puerto: 8082

### 3. auth-service
Gestión de autenticación y autorización.
- Stack: Java 11 + Spring Security + Keycloak
- Puerto: 8083

### 4. notification-service
Envío de notificaciones por email y SMS.
- Stack: Node.js 14 + SendGrid
- Puerto: 8084

### 5. report-service
Generación de informes y exportaciones PDF.
- Stack: Python 3.8 + ReportLab
- Puerto: 8085

---

## Base de datos

Cada microservicio tiene su propia base de datos (Database per Service pattern):
- factura-service → facturaflow_facturas (PostgreSQL)
- cliente-service → facturaflow_clientes (PostgreSQL)
- auth-service → facturaflow_auth (MySQL)
- report-service → Solo lectura sobre las anteriores

---

## API Gateway

Nginx como API Gateway enruta las peticiones a los microservicios.
URL base: https://api.facturaflow.retailcorp.es

---

## Infraestructura

- Kubernetes (GKE) — Google Cloud
- Docker imágenes en Google Container Registry
- CI/CD con Jenkins
- Monitoring con Prometheus + Grafana

---

## Decisiones de diseño

- Event sourcing para auditoría de facturas
- CQRS en factura-service
- OAuth 2.0 con Keycloak para SSO

---

*Este documento refleja el DISEÑO ORIGINAL de 2020.*
*La implementación real puede diferir significativamente.*
*Carlos Ruiz abandonó la empresa en junio 2020.*
*Actualización de arquitectura pendiente desde 2021.*

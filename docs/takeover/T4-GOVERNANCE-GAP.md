# Governance Gap Assessment — Takeover Sprint 0
**Proyecto:** FacturaFlow · **Cliente:** RetailCorp S.L. (Laboratorio Sintético SOFIA)
**Fecha:** 2026-04-07 · **Agente:** Governance Gap Agent SOFIA v1.0
**Inputs:** T1-STACK-MAP.json · T2-QUALITY-BASELINE.md · T3-FA-DRAFT.md · T0-DOC-MATRIX.json

---

## Resumen ejecutivo

| Dimensión | Score | Nivel | Esfuerzo estimado |
|---|---|---|---|
| Documentation Coverage | 47% volumen · 0.22 calidad | MEDIO (volumen) / ZOMBIE (calidad) | 18 SP distribuidos en S1–S4 |
| Process Maturity | 0.08 / 3.0 | **AD-HOC** (≈ CMMI L1) | +5 SP overhead extra en S1 |
| CMMI Gap | 0.56 / 3.0 | **L1–L2** (procesos informales) | S6–S8 estimado para L3 completo |

**Estado de gobernanza:** El proyecto presenta madurez de gobernanza mínima. No hay procesos formales de desarrollo, ni CI/CD, ni documentación técnica completa. El equipo saliente operaba de forma completamente ad-hoc. La gobernanza es el gap más grande del proyecto junto con la seguridad.

**Sprints estimados para alcanzar SOFIA estándar completo:** 6–8 sprints
**Primer sprint con evolutivos netos viables:** Sprint 1 (muy limitado) / **Sprint 2** (recomendado)

> ⚠️ **Alerta de capacidad Sprint 1:** La combinación de 26 SP mandatory (T-2) + 8 SP funcionales HIGH (TK-011/012/014) + overhead de gobernanza AD-HOC (~6 SP) = **40 SP comprometidos** sobre una velocidad de referencia de 40 SP. Sprint 1 es de estabilización pura sin margen para evolutivos de negocio. Comunicar al cliente antes de GT-5.

---

## 1. Documentation Coverage

### 1.1 Estado de los 17 artefactos SOFIA — post Sprint 0

> Evaluación del estado tras completar el Pipeline Takeover Sprint 0. Los artefactos producidos por SOFIA en este Sprint se contabilizan como EXISTE_PARCIAL (son puntos de partida, no documentos completos evolutivos).

| # | Artefacto SOFIA | Estado | Fuente / Observación | SP para completar |
|---|---|---|---|---|
| 1 | **SRS / Especificación de Requisitos** | EXISTE_PARCIAL | manual-funcional.md (DTS=0.645) + openapi.yaml (DTS=0.820) + fa-index.json v0.1. Sin formato SRS formal. | 3 SP — S1 |
| 2 | **HLD / High Level Design** | EXISTE_PARCIAL | T1-STACK-MAP.json (stack técnico). Sin diagrama de arquitectura formal. arquitectura-2020.md ZOMBIE — excluida. | 3 SP — S1 |
| 3 | **LLD / Low Level Design** | NO_EXISTE | Sin diseño detallado de componentes, interfaces ni contratos internos. | 4 SP — S2 |
| 4 | **ADRs / Architecture Decision Records** | NO_EXISTE | Sin registro de ninguna decisión técnica. Las deudas identificadas en FIXME son la única evidencia de decisiones previas. | 2 SP — S2 (retroactivo) |
| 5 | **QA Report** | EXISTE_PARCIAL | T2-QUALITY-BASELINE.md cubre el baseline de Sprint 0. Sin QA reports de sprints evolutivos (no aplicable aún). | — (se genera por sprint desde S1) |
| 6 | **Code Review Report** | NO_EXISTE | Sin PRs, sin revisiones de código formales. Sin herramienta de análisis estático configurada. | — (se genera por sprint desde S1, Step 5) |
| 7 | **Security Report** | EXISTE_PARCIAL | T2-QUALITY-BASELINE.md §1 contiene análisis de seguridad con CVEs. Sin security report por sprint. | — (se genera por sprint desde S1, Step 5b) |
| 8 | **Release Notes** | NO_EXISTE | Sin historial de releases documentado. Deploy manual FTP sin versiones formales. | — (se genera por sprint desde S1) |
| 9 | **Runbook de operaciones** | EXISTE_PARCIAL | README.md con instrucciones básicas (dotnet run, deploy FTP). Sin procedimiento formal. Sin rollback documentado. | 2 SP — S1 |
| 10 | **Análisis Funcional (FA)** | EXISTE_PARCIAL | T3-FA-DRAFT.md + fa-index.json v0.1. Primera versión takeover. Evoluciona en cada sprint. | — (evoluciona con fa-agent desde S1) |
| 11 | **Plan de Proyecto (PP)** | NO_EXISTE | Sin plan de proyecto. Sin estimaciones formales. Sin cronograma. | 2 SP — S1 |
| 12 | **Informe Monitorización (PMC)** | NO_EXISTE | Sin seguimiento de progreso. Sin métricas. Sin KPIs. | — (se genera por sprint con dashboard SOFIA) |
| 13 | **Registro de Riesgos (RSKM)** | NO_EXISTE | Los DEBT-TK en session.json son un risk register técnico informal. Sin registro formal de riesgos de proyecto. | 1 SP — S1 (retroactivo desde DEBT-TK) |
| 14 | **Evidencias Verificación (VER)** | NO_EXISTE | 2 tests unitarios existen pero sin proceso de code review ni verificación formal. | — (se genera por sprint con CR Step 5) |
| 15 | **Evidencias Validación (VAL)** | NO_EXISTE | Sin demos formales al cliente documentadas. Sin UATs. | — (se genera por sprint con QA Step 6) |
| 16 | **Plan de Configuración / CM** | EXISTE_PARCIAL | Git probable (sin metadata entregada). Sin convención de branching, sin proceso de merge, sin baseline identificable. | 1 SP — S1 (setup de branching strategy) |
| 17 | **Trazabilidad Requisitos (REQM)** | NO_EXISTE | Sin trazabilidad de requisitos a código. fa-index.json v0.1 inicia la trazabilidad (FA → RN → código inferido). | 2 SP — S2 |

### 1.2 Métricas de cobertura documental

```
Documentos evaluados:        17
EXISTE_COMPLETO:              0   (0%)
EXISTE_PARCIAL:               8   (47%)
EXISTE_DESACTUALIZADO:        1   (6%)  [arquitectura-2020.md ZOMBIE]
NO_EXISTE:                    8   (47%)

doc_volume_score  = 9/17 = 0.53  → MEDIO (0.4–0.8)
doc_quality_score = (0×1.0 + 8×0.5 + 1×0.25 + 8×0) / 17
                  = (4.0 + 0.25) / 17 = 4.25 / 17 = 0.25 → ZOMBIE (< 0.3)
```

> **Interpretación:** El volumen llega a MEDIO gracias a los artefactos producidos en Sprint 0 por SOFIA. Sin Sprint 0, el score sería 3/17 = 0.18 (BAJO). La calidad es ZOMBIE porque no hay ningún documento completo — todos los existentes son parciales o desactualizados.

### 1.3 Priorización de documentación retroactiva

| Prioridad | Artefacto | Sprint | SP | Fuente disponible |
|---|---|---|---|---|
| 1 | HLD sistema actual | S1 | 3 SP | T1-STACK-MAP.json como base + diagrama C4 nivel 1 |
| 2 | SRS baseline formal | S1 | 3 SP | fa-index.json v0.1 + manual-funcional.md |
| 3 | Plan de Proyecto S0→S2 | S1 | 2 SP | Esta planificación + DEBT-TK backlog |
| 4 | Runbook de operaciones | S1 | 2 SP | README + sesión con Miguel Fernández |
| 5 | Risk Register formal | S1 | 1 SP | DEBT-TK como base + riesgos de proyecto |
| 6 | CM Plan (branching strategy) | S1 | 1 SP | Definir Git Flow + proteger main |
| 7 | ADRs retroactivos (3 decisiones clave) | S2 | 2 SP | EF Core, JWT, SQL Server como tech stack |
| 8 | LLD módulo Facturas | S2 | 4 SP | Código existente + fa-index.json |
| 9 | Trazabilidad FA ↔ código | S2 | 2 SP | fa-index.json v0.1 + controladores |

**Total SP documentación retroactiva:** 20 SP distribuidos en S1–S2

---

## 2. Process Maturity

### 2.1 Estado por área de proceso — evaluación desde evidencias reales

| Área | Madurez actual | Score | Evidencia concreta | Gap hasta SOFIA estándar |
|---|---|---|---|---|
| **Control de versiones** | BASIC | 1/3 | Git probable pero sin historial entregado (commit_hash: UNKNOWN), sin convención de branching, sin tags de release visibles. Deploy via FTP sugiere git no es el canal de deploy. | DEFINED: Git Flow + commits convencionales + PRs obligatorios + tags semver |
| **CI/CD** | NONE | 0/3 | Sin Dockerfile, sin .github/workflows, sin Jenkinsfile, sin docker-compose. Deploy manual FTP a IP de servidor. Conocimiento tácito de una sola persona (Miguel Fernández). | DEFINED: Pipeline GitHub Actions con build + test + deploy a staging |
| **Gestión de incidencias** | NONE | 0/3 | Sin sistema de tracking detectado. Sin proceso de change request. Sin runbook de incidencias. Comunicación ad-hoc ("preguntar a Miguel"). | DEFINED: Jira configurado + workflow SOFIA + proceso de CR documentado |
| **Calidad / Code Review** | NONE | 0/3 | Sin PRs evidentes, sin herramienta de análisis estático en .csproj, sin convención de código documentada, sin tests obligatorios para deploy. 2 tests, ratio 0.17. | DEFINED: PRs obligatorios + un revisor mínimo + CI checks + test gate |

**Process Maturity Score:**
```
git=1, cicd=0, incidents=0, quality=0
process_maturity_score = avg(1,0,0,0) / 3 = 0.25 / 3 = 0.08

Nivel: AD-HOC (0.0–0.5) ≈ CMMI L1
```

> El sistema funciona en producción a pesar de la madurez AD-HOC, lo cual es común en proyectos legacy con una persona clave. El riesgo real es la **dependencia de persona** (Miguel Fernández): si sale, el conocimiento operacional se pierde. Esto es un riesgo de continuidad, no solo de gobernanza.

### 2.2 Plan de implantación de procesos

| Proceso | Sprint | SP setup | Responsable | Herramienta |
|---|---|---|---|---|
| Jira workflow SOFIA + board S1 | S0 (ahora) | 1 SP | PM | Jira (Atlassian MCP conectado) |
| Confluence space + estructura | S0 (ahora) | 1 SP | PM | Confluence (Atlassian MCP conectado) |
| Branching strategy + PRs obligatorios | S1 | 0.5 SP | TL | Git + branch protection rules |
| Git Flow documentado | S1 | 0.5 SP | TL | README + CM Plan |
| CI pipeline básico (build + test) | S2 | 4 SP | TL/DevOps | GitHub Actions |
| CD a staging | S3 | 3 SP | TL/DevOps | GitHub Actions + servidor staging |
| Docker para reproducibilidad local | S2-S3 | 3 SP | TL | Dockerfile + docker-compose |
| Análisis estático (.NET Analyzer) | S2 | 1 SP | TL | .editorconfig + Roslyn Analyzers |
| Risk Register mensual | S1+ | 0.5 SP/sprint | PM | Confluence |

---

## 3. CMMI Gap Assessment

> Evaluación sintética — detalle completo en T4-CMMI-ASSESSMENT.md

| PA | Estado | Score | Evidencia | Sprint CONFORME |
|---|---|---|---|---|
| **PP** — Project Planning | INFORMAL | 1/3 | Sin plan formal. La planificación era implícita ("preguntar a Miguel"). | S1 (dashboard SOFIA Step 1) |
| **PMC** — Monitorización | NO_EXISTE | 0/3 | Sin métricas, sin KPIs, sin seguimiento de progreso. | S1 (dashboard SOFIA Step 9) |
| **RSKM** — Gestión Riesgos | INFORMAL | 1/3 | Riesgos conocidos pero sin registrar formalmente (TODO/FIXME/XXX en código). | S1 (Risk Register desde DEBT-TK) |
| **VER** — Verificación | INFORMAL | 1/3 | 2 tests unitarios existen (verificación mínima). Sin code review formal. | S1 (PRs + CR Step 5) |
| **VAL** — Validación | NO_EXISTE | 0/3 | Sin demos documentadas, sin UATs, sin aceptación formal por el cliente. | S1 (QA Step 6 + aceptación PO) |
| **CM** — Config. Management | INFORMAL | 1/3 | Git probable sin disciplina de baseline ni convención de versiones. | S1 (CM Plan + Git Flow + semver) |
| **PPQA** — Calidad Proceso | NO_EXISTE | 0/3 | Sin auditorías internas, sin NCs registradas, sin proceso QA de procesos. | S3 (primera auditoría PPQA) |
| **REQM** — Gestión Requisitos | INFORMAL | 1/3 | Requisitos en manual-funcional.md pero sin trazabilidad ni proceso de cambios. | S2 (fa-agent + trazabilidad FA↔código) |
| **DAR** — Decisiones | NO_EXISTE | 0/3 | Sin ADRs. Las decisiones técnicas son implícitas (EF Core, JWT, SQL Server). | S2 (primeros ADRs retroactivos) |

```
cmmi_gap_score = (1+0+1+1+0+1+0+1+0) / 9 = 5/9 = 0.56

Nivel CMMI estimado actual: L1–L2 (procesos informales, sin sistematización)
Objetivo SOFIA:             L3
Sprints estimados a L3:     6–8 sprints
Sprint estimado CMMI L3:    Sprint 7–9 (dependiendo de velocidad de adopción)
```

---

## 4. Impacto en velocidad por implantación de gobernanza

> Ajuste AD-HOC: +5 SP overhead extra en S1 (cambio cultural significativo — equipo nuevo en sistema heredado con cero procesos formales).

| Sprint | Overhead gobernanza | Mandatory DEBT-TK | Funcionales HIGH S1 | SP libres evolutivos | Observación |
|---|---|---|---|---|---|
| **S1** | **6 SP** (15% + adj AD-HOC) | 26 SP | 8 SP (TK-011/012/014) | **0 SP** | ⚠️ Sprint de estabilización pura |
| **S2** | 5 SP (12%) | 0 SP (mandatory resueltos) | 2 SP (TK-009) | **~17 SP** | Primer sprint con evolutivos reales |
| **S3** | 4 SP (10%) | 0 SP | 0 SP | **~20 SP** | Gobernanza consolidándose |
| **S4+** | 2 SP (5%) | 0 SP | 0 SP | **~22 SP** | Hábito adquirido |

> **Recomendación para GT-5:** Comunicar al cliente que Sprint 1 es de estabilización completa. El primer evolutivo de negocio con valor tangible ocurrirá en Sprint 2. Esta es la realidad del takeover, no una decisión de Experis.

---

## 5. Dependencias de herramientas

| Herramienta | Estado | Acción requerida | Sprint |
|---|---|---|---|
| **Jira** | ✅ Conectado (Atlassian MCP) | Crear proyecto + workflow SOFIA + board S1 | S0 (ahora) |
| **Confluence** | ✅ Conectado (Atlassian MCP) | Crear space FacturaFlow + estructura de pages | S0 (ahora) |
| **Git** | ✅ Probable en cliente | Confirmar acceso write + configurar branch protection + Git Flow | S1 |
| **GitHub Actions / Azure DevOps** | ❌ No configurado | Seleccionar plataforma CI/CD + implementar pipeline básico | S2 |
| **Docker** | ❌ No configurado | Crear Dockerfile + docker-compose local | S2–S3 |
| **SonarQube / Analyzers** | ❌ No configurado | .editorconfig + Roslyn Analyzers para .NET | S2 |
| **Servidor staging** | ❓ Desconocido | Confirmar con Miguel Fernández si existe entorno de pruebas | S1 (confirmar) |

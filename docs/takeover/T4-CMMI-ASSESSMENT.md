# CMMI L3 Assessment — Takeover Sprint 0
**Proyecto:** FacturaFlow · **Cliente:** RetailCorp S.L. (Laboratorio Sintético SOFIA)
**Fecha:** 2026-04-07 · **Evaluador:** Governance Gap Agent SOFIA v1.0
**Objetivo SOFIA:** CMMI L3 (9 Process Areas activas)

---

## Metodología

Evaluación por evidencias reales encontradas en:
- Repositorio de código (T-1 Inventory Agent — análisis estático)
- Documentación del cliente (T-0 Documentation Intake, DTS aplicado)
- Quality Baseline (T-2 — deuda técnica y seguridad)
- Análisis funcional inicial (T-3 — catálogo funcional)

**Escala de evaluación:**
- `NO_EXISTE (0)` — ninguna evidencia de la PA
- `INFORMAL (1)` — actividades existen pero sin proceso ni registro
- `DOCUMENTADO (2)` — proceso documentado pero no seguido consistentemente
- `CONFORME (3)` — proceso seguido con evidencias CMMI aceptables

**Principio de evaluación:** las evidencias reales prevalecen sobre las declaraciones. Si el cliente afirma tener un proceso pero no hay evidencias en el repositorio, el estado es INFORMAL como máximo.

---

## PP — Project Planning
**Score:** 1/3 — INFORMAL

**Objetivo PA:** Establecer y mantener planes que definan las actividades del proyecto, con estimaciones documentadas, hitos y cronograma.

**Evidencias buscadas:**
- Plan de proyecto formal (Word, Confluence, Project) → **NO encontrado**
- Estimaciones de esfuerzo documentadas → **NO encontrado**
- Cronograma con hitos → **NO encontrado**
- Identificación de recursos y roles → **PARCIAL** (README menciona contacto: Miguel Fernández TI)
- Presupuesto del proyecto → **NO encontrado**
- Planificación de stakeholders → **NO encontrado**

**Evidencias encontradas:**
- README.md: comandos básicos de instalación. Sin planificación formal.
- CLAUDE.md (contexto del takeover): indica que el proyecto está en producción desde 2022 con 8.000 facturas anuales. Sin documentación de cómo se llegó a ese estado.
- Los TODO/FIXME en el código sugieren planificación ad-hoc por email o verbal: "Migración a bcrypt planificada para Q1 2025" (manual-funcional.md §5.2) — plan verbal no ejecutado.

**Justificación del score INFORMAL:** Existe planificación implícita (el sistema funciona, alguien tomó decisiones) pero sin ningún documento que la respalde. La mención de "Q1 2025" para bcrypt indica que hay consciencia de planificación, pero no proceso.

**Gap hasta CONFORME:** Crear Plan de Proyecto SOFIA (Step 1 — Scrum Master) desde Sprint 1. Incluir: velocity de referencia, DEBTs priorizados, hitos S1–S3, roles del equipo.

**Acción en SOFIA:** Step 1 (Scrum Master) genera el planning de cada sprint con goal, backlog, estimaciones y hitos. El CMMI Plan de Proyecto se consolida en el Baseline Document (T-5) y se actualiza en Step 9 (Dashboard) cada sprint. **CONFORME esperado:** Sprint 1.

---

## PMC — Project Monitoring and Control
**Score:** 0/3 — NO_EXISTE

**Objetivo PA:** Monitorizar el progreso del proyecto contra el plan y tomar acciones correctivas cuando la desviación es significativa.

**Evidencias buscadas:**
- Informes de progreso periódicos → **NO encontrado**
- Métricas de seguimiento (velocity, burndown) → **NO encontrado**
- Actas de reuniones de seguimiento → **NO encontrado**
- Registro de desviaciones y acciones correctivas → **NO encontrado**
- Dashboard de estado del proyecto → **NO encontrado**

**Evidencias encontradas:** Ninguna. El proyecto se gestionaba de forma completamente ad-hoc. La única evidencia de monitoring es el conocimiento tácito de Miguel Fernández.

**Justificación del score NO_EXISTE:** No hay absolutamente ningún artefacto de monitorización. Ni siquiera un email de estado o un informe verbal registrado.

**Gap hasta CONFORME:** Dashboard SOFIA generado en cada sprint (Step 9). Métricas de velocity desde Sprint 1. Burndown por sprint.

**Acción en SOFIA:** Step 9 (Dashboard Agent) genera el dashboard global tras cada sprint. El Session.json actúa como registro de estado del pipeline. **CONFORME esperado:** Sprint 2 (primer dashboard completo con métricas de S1).

---

## RSKM — Risk Management
**Score:** 1/3 — INFORMAL

**Objetivo PA:** Identificar, analizar y mitigar los riesgos del proyecto de forma proactiva y continua.

**Evidencias buscadas:**
- Risk Register formal con probabilidad/impacto → **NO encontrado**
- Plan de mitigación por riesgo → **NO encontrado**
- Seguimiento periódico de riesgos → **NO encontrado**
- Escalado de riesgos a stakeholders → **NO encontrado**

**Evidencias encontradas:**
- Comentarios en código que revelan consciencia de riesgo sin gestión formal:
  - `XXX: Password en claro en BD — migrar a hash bcrypt urgente (DEUDA CRÍTICA)` — riesgo conocido, sin mitigar desde enero 2024
  - `FIXME: No debería ser DELETE sino PUT a estado ANULADA — GDPR audit trail` — riesgo de incumplimiento regulatorio conocido
  - `JwtSettings.Secret` en appsettings.json con comentario "cambiar en producción" — riesgo conocido, no ejecutado
  - Manual funcional §5.2: "Registrado como crítico desde enero 2024. Sin resolver."
- DEBT-TK en session.json: los DEBT-TK generados por SOFIA en Sprint 0 son el primer Risk Register formal del proyecto.

**Justificación del score INFORMAL:** Hay consciencia de los riesgos (se documentan en el código como TODO/FIXME) pero sin proceso de gestión, priorización ni seguimiento formal. Los riesgos llevan meses o años sin mitigarse a pesar de ser conocidos.

**Gap hasta CONFORME:** Risk Register en Confluence actualizado mensualmente. Los DEBT-TK de T-2 son el punto de partida. Escalar riesgos en cada retrospectiva.

**Acción en SOFIA:** PM mantiene Risk Register desde Sprint 1 usando DEBT-TK como base. **CONFORME esperado:** Sprint 2.

---

## VER — Verification
**Score:** 1/3 — INFORMAL

**Objetivo PA:** Asegurar que los productos de trabajo cumplen los requisitos especificados mediante revisiones y pruebas formales.

**Evidencias buscadas:**
- Proceso formal de code review → **NO encontrado**
- Pull Requests con revisores → **NO encontrado** (sin historial git entregado)
- Test suite con cobertura mínima → **PARCIAL** (2 tests — ratio 0.17)
- Checklist de verificación por artefacto → **NO encontrado**
- Herramientas de análisis estático configuradas → **NO encontrado**

**Evidencias encontradas:**
- Tests/FacturaTests.cs con 2 tests unitarios — evidencia de intención de verificación, pero insuficiente (ratio 0.17, cobertura funcional < 5%).
- El segundo test tiene FIXME: verifica aritmética del propio test, no comportamiento del sistema.
- No hay evidencia de code review: código con 14 comentarios de deuda pendiente que habrían sido capturados en cualquier revisión.

**Justificación del score INFORMAL:** Existe alguna verificación (2 tests) pero sin proceso formal de review ni cobertura representativa. El FIXME en el segundo test evidencia que incluso las verificaciones existentes son cuestionables.

**Gap hasta CONFORME:** PRs obligatorios desde Sprint 1 con al menos 1 revisor. CI con test gate. Code Review Report (Step 5) por sprint. Cobertura mínima del 20% para S1 escalando al 40% en S3.

**Acción en SOFIA:** Step 5 (Code Reviewer) genera CR Report por sprint. Step 6 (QA) valida calidad. **CONFORME esperado:** Sprint 1.

---

## VAL — Validation
**Score:** 0/3 — NO_EXISTE

**Objetivo PA:** Demostrar que el producto o componente del producto satisface su uso previsto en el entorno previsto.

**Evidencias buscadas:**
- UATs documentados con cliente → **NO encontrado**
- Demos formales con acta de aceptación → **NO encontrado**
- Criterios de aceptación por funcionalidad → **NO encontrado**
- Sign-off del cliente por release → **NO encontrado**
- Ambiente de staging para validación → **DESCONOCIDO** (UNKNOWN en T-1)

**Evidencias encontradas:** Ninguna. No hay evidencia de que el cliente (RetailCorp) haya validado formalmente ninguna funcionalidad. El sistema "funciona" porque está en producción, pero sin proceso de validación documentado.

**Justificación del score NO_EXISTE:** La validación se realizaba de forma completamente implícita ("funciona si no hay quejas"). No hay artefactos de validación de ningún tipo.

**Gap hasta CONFORME:** QA formal (Step 6) con informe por sprint. Criterios de aceptación del PO por US. Sign-off del PO antes de cerrar el sprint.

**Acción en SOFIA:** Step 6 (QA Tester) + aprobación PO en Gate 6. **CONFORME esperado:** Sprint 1.

---

## CM — Configuration Management
**Score:** 1/3 — INFORMAL

**Objetivo PA:** Establecer y mantener la integridad de los productos de trabajo usando identificación de configuración, control, auditoría de estado y de configuración.

**Evidencias buscadas:**
- Control de versiones con baseline identificable → **PARCIAL** (git probable, sin metadata entregada)
- Convención de branching documentada → **NO encontrado**
- Tags de release con semver → **NO encontrado**
- .gitignore adecuado → **DESCONOCIDO**
- Proceso de merge/integración → **NO encontrado**
- Historial de cambios → **NO encontrado** (commit_hash: UNKNOWN)

**Evidencias encontradas:**
- El proyecto tiene código fuente que implica algún control de versiones, pero no se entregó historial git. Commit hash UNKNOWN.
- El deploy es manual FTP — el "control de versiones" de producción es el estado del servidor FTP, no un tag de release.
- El README menciona "dotnet restore" que implica dependencias versionadas en .csproj — al menos las dependencias tienen versiones declaradas.
- appsettings.json tiene el JWT secret — si está en git, es un problema de CM (no debería estar commiteado).

**Justificación del score INFORMAL:** Existe probable control de versiones básico pero sin baseline identificable, sin convención de branching, sin tags y con secretos potencialmente commiteados. El deploy FTP no es un mecanismo de CM válido.

**Gap hasta CONFORME:** Git Flow documentado + branch protection + tags semver por release + .gitignore robusto + secrets fuera del repositorio + CM Plan SOFIA.

**Acción en SOFIA:** TL configura Git Flow + branch protection en Sprint 1. CM Plan en Step 3 (Architect). **CONFORME esperado:** Sprint 1.

---

## PPQA — Process and Product Quality Assurance
**Score:** 0/3 — NO_EXISTE

**Objetivo PA:** Asegurar objetivamente que el personal y la dirección tienen visibilidad apropiada sobre el proceso y los productos de trabajo asociados.

**Evidencias buscadas:**
- Auditorías internas de proceso → **NO encontrado**
- Non-Conformances (NCs) registradas → **NO encontrado**
- Revisiones de adherencia al proceso → **NO encontrado**
- Reporte de PPQA periódico → **NO encontrado**

**Evidencias encontradas:** Ninguna. No existe ningún mecanismo de aseguramiento de calidad de proceso. El proyecto operaba sin ninguna supervisión de proceso.

**Justificación del score NO_EXISTE:** PPQA es el proceso más maduro de CMMI L3 y el más ausente en proyectos legacy. Su ausencia es normal — no es una crítica, sino un gap esperado.

**Gap hasta CONFORME:** Primera auditoría PPQA en Sprint 3 (cuando el pipeline SOFIA esté suficientemente implantado para auditarlo). Mensual desde entonces.

**Acción en SOFIA:** PM realiza PPQA mensual desde Sprint 3. **CONFORME esperado:** Sprint 3–4.

---

## REQM — Requirements Management
**Score:** 1/3 — INFORMAL

**Objetivo PA:** Gestionar los requisitos de los productos y componentes del proyecto para identificar inconsistencias con los planes del proyecto.

**Evidencias buscadas:**
- Sistema de gestión de requisitos → **NO encontrado** (Jira, Confluence, etc.)
- Trazabilidad requisito → diseño → código → test → **NO encontrado**
- Proceso de gestión de cambios de requisitos → **NO encontrado**
- Versiones de especificaciones → **PARCIAL** (manual-funcional.md v2.1)
- Requisitos aprobados por el cliente → **PARCIAL** (doc revisada por Dpto. TI)

**Evidencias encontradas:**
- manual-funcional.md v2.1 revisado por Dpto. TI — evidencia de gestión informal de requisitos.
- openapi.yaml v1.4 — especificación de API versionada.
- fa-index.json v0.1 generado en Sprint 0 — primer catálogo formal de requisitos/funcionalidades.
- Sin trazabilidad FA → código → test en el sistema heredado.

**Justificación del score INFORMAL:** Hay documentación de requisitos (manual funcional) pero sin proceso formal de gestión de cambios, sin trazabilidad y sin Jira/sistema de tracking. El manual funcional es una foto estática, no un sistema de gestión.

**Gap hasta CONFORME:** Jira con US trazables a fa-index.json. Trazabilidad US → PR → test. Proceso de cambio de requisitos documentado en Confluence.

**Acción en SOFIA:** Step 2 (Requirements Analyst) + fa-agent desde Sprint 1. **CONFORME esperado:** Sprint 2.

---

## DAR — Decision Analysis and Resolution
**Score:** 0/3 — NO_EXISTE

**Objetivo PA:** Analizar posibles decisiones usando un proceso de evaluación formal con criterios establecidos para seleccionar entre alternativas.

**Evidencias buscadas:**
- ADRs (Architecture Decision Records) → **NO encontrado**
- Registro de evaluación de alternativas técnicas → **NO encontrado**
- Criterios de decisión documentados → **NO encontrado**
- Decisiones técnicas con justificación → **NO encontrado**

**Evidencias encontradas:** Ninguna. Las decisiones técnicas del sistema (elegir .NET 6, EF Core, SQL Server, JWT, arquitectura monolítica) no tienen justificación documentada. Solo se pueden inferir del código final.

**Nota:** La discrepancia entre la arquitectura documentada en 2020 (Java microservicios) y el sistema real (.NET 6 monolito) sugiere que hubo una decisión de cambio de arquitectura que nunca fue documentada — exactamente el escenario que DAR previene.

**Justificación del score NO_EXISTE:** Sin ningún ADR ni registro de decisión técnica. Esta es la PA más frecuentemente ausente en proyectos legacy.

**Gap hasta CONFORME:** ADRs retroactivos (3 decisiones clave) en Sprint 2. ADR por decisión técnica significativa desde Sprint 1. Plantilla MADR en Confluence.

**Acción en SOFIA:** Step 3 (Architect) mantiene ADRs. **CONFORME esperado:** Sprint 2.

---

## Score global y proyección

```
PA Scores:
  PP   = 1  (INFORMAL)
  PMC  = 0  (NO_EXISTE)
  RSKM = 1  (INFORMAL)
  VER  = 1  (INFORMAL)
  VAL  = 0  (NO_EXISTE)
  CM   = 1  (INFORMAL)
  PPQA = 0  (NO_EXISTE)
  REQM = 1  (INFORMAL)
  DAR  = 0  (NO_EXISTE)

cmmi_gap_score = (1+0+1+1+0+1+0+1+0) / 9 = 5/9 = 0.56

Nivel CMMI estimado actual: L1–L2
  · 5/9 PAs en INFORMAL  (reconocen la PA pero sin proceso)
  · 4/9 PAs en NO_EXISTE (sin ninguna actividad)
  · 0/9 PAs en DOCUMENTADO o CONFORME
```

**Proyección de evolución:**

| Sprint | PAs esperadas en CONFORME | Nivel CMMI estimado |
|---|---|---|
| S0 (actual) | 0/9 | L1–L2 |
| S1 | PP, VER, VAL, CM | L2 |
| S2 | + PMC, RSKM, REQM, DAR | L2–L3 |
| S3 | + PPQA | **L3 completo** |
| S4–S6 | Consolidación + evidencias maduras | L3 consolidado |

> El pipeline SOFIA de 17 pasos, cuando opera a plena capacidad (Sprint 3+), genera de forma natural las evidencias necesarias para L3. La adopción del pipeline **es** la adopción de CMMI L3.

# SOFIA — Pipeline Takeover · Prompts del Dry Run
# Proyecto: FacturaFlow · Cliente: RetailCorp S.L. (laboratorio sintético)
# Ejecutar en: Claude Desktop con proyecto TakeOverSintetico

---

## Cómo funciona

Cada bloque es un prompt que pegas en Claude Desktop.
Claude leerá el CLAUDE.md del proyecto, cargará el skill indicado y
producirá los artefactos en disco.

Espera a que Claude termine y confirme PERSISTENCE CONFIRMED antes de
aprobar el gate. Usa el prompt de aprobación para avanzar al siguiente step.

---

## STEP T-0 — Documentation Intake Agent

```
Actúa como el Documentation Intake Agent de SOFIA.

1. Lee el archivo CLAUDE.md para entender el contexto del proyecto
2. Lee el SKILL en SOFIA_CORE_PATH/skills/documentation-intake-agent/SKILL.md
3. Lee el session.json en .sofia/session.json para verificar el estado actual

Con esa información ejecuta el Step T-0:
- Inventaria los documentos en docs-cliente/
- Evalúa el DTS de cada tipo (FUNC, ARCH, API) con las 4 dimensiones
- Genera docs/takeover/T0-DOC-MATRIX.json
- Actualiza session.json y sofia.log
- Muestra el bloque PERSISTENCE CONFIRMED al finalizar
```

## Aprobación Gate GT-0 (Tech Lead)

Después de revisar el T0-DOC-MATRIX.json:

```
Apruebo GT-0. El DTS calculado refleja correctamente la calidad de la
documentación recibida. Continúa con T-1 Inventory Agent.
```

---

## STEP T-1 — Inventory Agent

```
Actúa como el Inventory Agent de SOFIA.

1. Lee el CLAUDE.md del proyecto
2. Lee el SKILL en SOFIA_CORE_PATH/skills/inventory-agent/SKILL.md
3. Lee session.json — verifica que T-0 está en completed_steps y GT-0 aprobado
4. Lee docs/takeover/T0-DOC-MATRIX.json para calibrar el análisis

Con esa información ejecuta el Step T-1 analizando repo-cliente/:
- Detecta el stack (FacturaFlow.Api.csproj, Controllers, Models, Data, Migrations)
- Inventaria dependencias desde FacturaFlow.Api.csproj
- Mapea la arquitectura (patrón, capas, persistencia, tests)
- Evalúa la operabilidad (README.md)
- Genera docs/takeover/T1-INVENTORY.md y docs/takeover/T1-STACK-MAP.json
- Actualiza session.json y sofia.log
```

## Aprobación Gate GT-1 (Tech Lead)

```
Apruebo GT-1. El inventario refleja correctamente el sistema recibido.
El stack .NET 6 con EF Core y SQL Server es correcto. Continúa con T-2.
```

---

## STEP T-2 — Quality Baseline Agent

```
Actúa como el Quality Baseline Agent de SOFIA.

1. Lee el CLAUDE.md del proyecto
2. Lee el SKILL en SOFIA_CORE_PATH/skills/quality-baseline-agent/SKILL.md
3. Lee session.json — verifica que T-1 está en completed_steps y GT-1 aprobado
4. Lee docs/takeover/T1-STACK-MAP.json para seleccionar herramientas

Con esa información ejecuta el Step T-2 sobre repo-cliente/:
- Analiza dependencias del .csproj buscando CVEs conocidos (estático, sin instalar)
- Evalúa la suite de tests (ratio test/prod)
- Cuantifica la deuda técnica visible (TODOs, FIXMEs, XXX, god classes)
- Evalúa el estado del build (sin ejecutar dotnet build)
- Identifica los secrets hardcodeados (JWT secret en appsettings.json, password en BD)
- Genera los DEBT-TK correspondientes
- Genera docs/takeover/T2-QUALITY-BASELINE.md
- Actualiza session.json (takeover_baseline + open_debts) y sofia.log
```

## Aprobación Gate GT-2 (Tech Lead + PO)

```
Apruebo GT-2. El baseline de calidad es correcto. Los CVEs identificados
son reales y los DEBTs están bien priorizados. Continúa con T-3.
```

---

## STEP T-3 — FA Reverse Agent

```
Actúa como el FA Reverse Agent de SOFIA.

1. Lee el CLAUDE.md del proyecto
2. Lee el SKILL en SOFIA_CORE_PATH/skills/fa-reverse-agent/SKILL.md
3. Lee session.json — verifica T-2 en completed_steps y GT-2 aprobado
4. Lee docs/takeover/T0-DOC-MATRIX.json — obtén la estrategia DTS para T-3
5. Lee docs/takeover/T1-STACK-MAP.json para contexto arquitectónico

Con esa información ejecuta el Step T-3:
- Determina la estrategia FA según DTS_FUNC (DOCUMENT-LED esperado)
- Analiza los controllers para identificar funcionalidades existentes
- Analiza los modelos y la migración SQL para extraer reglas de negocio
- Usa el manual-funcional.md (DTS_FUNC ~0.65) como fuente secundaria
- IGNORA arquitectura-2020.md (DTS_ARCH POOR — CODE-ONLY para arquitectura)
- Identifica módulos funcionales (Clientes, Facturas, Usuarios, ciclo de vida)
- Genera las FAs en lenguaje de negocio — NUNCA jerga técnica
- Detecta DISCREPANCYs si las hay (ej: módulo de informes mencionado en doc sin endpoints)
- Genera fa-index.json v0.1, T3-FA-DRAFT.md y T3-FA-GAPS.md
- total_functionalities = len(functionalities) — nunca hardcodeado
- Actualiza session.json y sofia.log
```

## Resolución de DISCREPANCYs (si las hay)

Si el agente detecta DISCREPANCYs abiertas, usa este prompt:

```
Resuelvo las DISCREPANCYs detectadas:
- DISC-001 (Módulo Informes): CONFIRMED-MISSING — los informes se generan
  directamente desde BD sin endpoint REST. Se registra como DEBT-TK pendiente.
- DISC-002 (Exportación PDF): CONFIRMED-EXISTS — el equipo de TI confirma
  que existe pero no está documentado. Añadir como FA con confidence LOW.
Actualiza T3-FA-GAPS.md con estas resoluciones y el fa-index.json.
```

## Aprobación Gate GT-3 (PO)

```
Apruebo GT-3. El catálogo funcional refleja correctamente las funcionalidades
del sistema. Las DISCREPANCYs están resueltas. Continúa con T-4.
```

---

## STEP T-4 — Governance Gap Agent

```
Actúa como el Governance Gap Agent de SOFIA.

1. Lee el CLAUDE.md del proyecto
2. Lee el SKILL en SOFIA_CORE_PATH/skills/governance-gap-agent/SKILL.md
3. Lee session.json — verifica T-3 en completed_steps y GT-3 aprobado
4. Lee los artefactos previos: T1-INVENTORY.md, T2-QUALITY-BASELINE.md, T3-FA-DRAFT.md

Con esa información ejecuta el Step T-4:
- Evalúa la cobertura de los 17 artefactos SOFIA (cuáles existen, cuáles no)
- Evalúa la madurez de procesos en 4 áreas:
  · Control versiones: ¿hay git? ¿convención de commits?
  · CI/CD: README dice deployment manual FTP — NONE
  · Gestión incidencias: sin evidencia — NONE
  · Calidad/code review: sin evidencia — NONE
- Evalúa el CMMI gap por las 9 PAs
- Genera el plan de adopción SOFIA en 3 niveles
- Genera T4-GOVERNANCE-GAP.md, T4-CMMI-ASSESSMENT.md, T4-ADOPTION-ROADMAP.md
- Actualiza session.json y sofia.log
```

## Aprobación Gate GT-4 (PM + PO)

```
Apruebo GT-4. El gap de gobernanza está bien dimensionado. El overhead
del Sprint 1 es realista dado el estado AD-HOC del proyecto. Continúa con T-5.
```

---

## STEP T-5 — Stabilization Planner

```
Actúa como el Stabilization Planner de SOFIA.

1. Lee el CLAUDE.md del proyecto
2. Lee el SKILL en SOFIA_CORE_PATH/skills/stabilization-planner/SKILL.md
3. Lee session.json — verifica T-4 en completed_steps y GT-4 aprobado
4. Lee TODOS los artefactos previos para sintetizar:
   - T1-STACK-MAP.json, T2-QUALITY-BASELINE.md
   - fa-index.json (funcionalidades y módulos)
   - T4-ADOPTION-ROADMAP.md (overhead de gobernanza)

Con esa información ejecuta el Step T-5:
- Consolida el estado del sistema desde T-1 a T-4
- Calcula vel_s1_evolutivos: 24 - debt_mandatory_sp - governance_overhead - ajuste_operabilidad
- Determina el SEV (Primer Sprint Evolutivo Viable)
- Construye el backlog priorizado del Sprint 1
- Genera el BASELINE-DOCUMENT-v1.0.md en lenguaje ejecutivo
- Genera docs/sprints/SPRINT-000-data.json
- Actualiza session.json y sofia.log
- Solicita aprobación GT-5 al cliente (Angel como representante de RetailCorp S.L.)
```

## Aprobación Gate GT-5 (CLIENTE — Angel como RetailCorp S.L.)

```
En nombre de RetailCorp S.L., apruebo el Baseline Document v1.0.
Entendemos el estado del sistema documentado y aceptamos el backlog
del Sprint 1. Podemos comenzar el servicio de Experis.
```

## Cierre Sprint 0 (post GT-5)

```
GT-5 aprobado por el cliente. Cierra el Sprint 0:
- Marca session.json: sprint_closed=true, current_sprint=1
- Registra GT-5 en gate_history
- Regenera el dashboard si está disponible
- Registra en sofia.log: SPRINT-0 CLOSED
```

---

## Verificación final

Al terminar el dry run, verifica que estos artefactos existen en disco:

```
docs/takeover/T0-DOC-MATRIX.json           ← T-0
docs/takeover/T1-INVENTORY.md              ← T-1
docs/takeover/T1-STACK-MAP.json            ← T-1
docs/takeover/T2-QUALITY-BASELINE.md       ← T-2
docs/functional-analysis/fa-index.json     ← T-3
docs/takeover/T3-FA-DRAFT.md              ← T-3
docs/takeover/T3-FA-GAPS.md              ← T-3
docs/takeover/T4-GOVERNANCE-GAP.md        ← T-4
docs/takeover/T4-CMMI-ASSESSMENT.md       ← T-4
docs/takeover/T4-ADOPTION-ROADMAP.md      ← T-4
docs/takeover/BASELINE-DOCUMENT-v1.0.md   ← T-5
docs/sprints/SPRINT-000-data.json         ← T-5
.sofia/session.json (sprint_closed: true) ← T-5 post GT-5
.sofia/sofia.log (10+ entradas)           ← todos los steps
```

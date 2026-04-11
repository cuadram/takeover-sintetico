# FacturaFlow — TakeOverSintetico
# Proyecto de laboratorio para validación del Pipeline Takeover SOFIA

## SOFIA_REPO
/Users/cuadram/Library/CloudStorage/OneDrive-Personal/WIP/TakeOverSintetico

## SOFIA_CORE_PATH
/Users/cuadram/Library/CloudStorage/OneDrive-Personal/WIP/SOFIA-CORE

## Pipeline
- **Tipo:** `takeover` (Sprint 0 — Toma de Control)
- **Proyecto:** FacturaFlow
- **Cliente:** RetailCorp S.L. (laboratorio sintético)
- **Repo del cliente:** `repo-cliente/` (código .NET 6 heredado)
- **Docs del cliente:** `docs-cliente/` (3 documentos con distintos DTS)
- **client_docs_provided:** `true`

## Instrucciones para el Orchestrator

Eres el Orchestrator de SOFIA ejecutando el **Pipeline Takeover Sprint 0**.

Antes de cada step DEBES:
1. Leer `.sofia/session.json` para conocer el estado actual del pipeline
2. Verificar que los prerequisitos del step están cumplidos
3. Leer el SKILL.md del agente desde SOFIA-CORE (ruta abajo)
4. Actuar como el agente según las instrucciones del SKILL
5. Persistir todos los artefactos en disco (SOFIA_REPO) antes de confirmar
6. Actualizar `session.json` y `sofia.log` tras cada step
7. Solicitar aprobación explícita del gate antes de avanzar al siguiente step

## Ruta de Skills (leer desde SOFIA-CORE)

```
SOFIA_CORE_PATH/skills/documentation-intake-agent/SKILL.md → Step T-0
SOFIA_CORE_PATH/skills/inventory-agent/SKILL.md            → Step T-1
SOFIA_CORE_PATH/skills/quality-baseline-agent/SKILL.md     → Step T-2
SOFIA_CORE_PATH/skills/fa-reverse-agent/SKILL.md           → Step T-3
SOFIA_CORE_PATH/skills/governance-gap-agent/SKILL.md       → Step T-4
SOFIA_CORE_PATH/skills/stabilization-planner/SKILL.md      → Step T-5
```

## Artefactos producidos por cada step

```
T-0 → docs/takeover/T0-DOC-MATRIX.json
T-1 → docs/takeover/T1-INVENTORY.md + docs/takeover/T1-STACK-MAP.json
T-2 → docs/takeover/T2-QUALITY-BASELINE.md
T-3 → docs/functional-analysis/fa-index.json + docs/takeover/T3-FA-DRAFT.md + docs/takeover/T3-FA-GAPS.md
T-4 → docs/takeover/T4-GOVERNANCE-GAP.md + docs/takeover/T4-CMMI-ASSESSMENT.md + docs/takeover/T4-ADOPTION-ROADMAP.md
T-5 → docs/takeover/BASELINE-DOCUMENT-v1.0.md + docs/sprints/SPRINT-000-data.json
```

## Reglas absolutas

- **GR-CORE-003:** Verificar SOFIA_REPO al inicio de cada sesión
- **GT-5 NUNCA se auto-aprueba** — solo el cliente (Angel como representante del cliente)
- **Cada gate requiere aprobación explícita** en el chat antes de avanzar
- **Todo artefacto debe existir en disco** antes de incluirlo en PERSISTENCE CONFIRMED
- **session.json y sofia.log** se actualizan tras CADA step y gate
- **GR-CORE-023:** Sin T0-DOC-MATRIX.json, T-3 no puede iniciarse
- **GR-CORE-025:** Gate GT-3 bloqueante hasta DISCREPANCYs resueltas

## Contexto del proyecto sintético

FacturaFlow es un sistema de gestión de facturación para una empresa retail.
El código heredado es un monolito .NET 6 con:
- 2 controllers (FacturasController, ClientesController)
- 3 entidades (Factura, Cliente, Usuario)
- EF Core con SQL Server
- 1 fichero de tests con 2 test unitarios
- Sin CI/CD (deployment manual FTP)
- Passwords en texto plano en BD (deuda crítica)
- JWT secret hardcodeado en appsettings.json

La documentación del cliente incluye:
- manual-funcional.md (Oct 2024) → DTS_FUNC esperado: GOOD ~0.65
- openapi.yaml → DTS_API esperado: TRUSTED ~0.82
- arquitectura-2020.md → DTS_ARCH esperado: POOR ~0.20 (ZOMBIE)

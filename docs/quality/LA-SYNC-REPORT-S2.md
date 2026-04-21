# LA-SYNC Report — Sprint 2

| Campo | Valor |
|---|---|
| Timestamp | 2026-04-21T05:37:38.865Z |
| Proyecto | facturaflow |
| SOFIA-CORE versión | 2.6.61 |
| LAs CORE disponibles | 69 |
| LAs nuevas importadas | 7 |
| Skills actualizados | 0 |
| Modo | DELTA |

## LAs Importadas

### LA-025-09 · process/tooling
- **Descripción:** desde bank-portal Sprint 25 — .sofia/scripts/gen-global-dashboard.js espera session.completed_steps como Array
- **Compliance check:** UNKNOWN: Sin check automático para este tipo

### LA-025-10 · process/tooling
- **Descripción:** desde bank-portal Sprint 25 — Las herramientas MCP Atlassian disponibles (searchJiraIssuesUsingJql, getJiraIss
- **Compliance check:** UNKNOWN: Sin check automático para este tipo

### LA-025-12 · process/governance/git
- **Descripción:** desde bank-portal Sprint 25 — SOFIA ejecutó una sesión de arranque completa (lectura session.json, skill loade
- **Compliance check:** UNKNOWN: Sin check automático para este tipo

### LA-CORE-058 · infrastructure/governance
- **Descripción:** repo-redundancy-via-github-not-onedrive: sistemas críticos SOFIA no pueden depender de OneDrive como única copia redunda
- **Compliance check:** UNKNOWN: Sin check automático para este tipo

### LA-CORE-059 · process/tooling
- **Descripción:** dashboard-completed-steps-schema: gen-global-dashboard.js asume Array en session.completed_steps pero el schema real es 
- **Compliance check:** UNKNOWN: Sin check automático para este tipo

### LA-CORE-060 · process/tooling
- **Descripción:** mcp-atlassian-sprint-lifecycle-gap: las herramientas MCP Atlassian (searchJiraIssues, transitionJiraIssue) no exponen en
- **Compliance check:** UNKNOWN: Sin check automático para este tipo

### LA-CORE-061 · process/governance/git
- **Descripción:** working-tree-git-divergence-undetected: Orchestrator arrancó sesión completa sin detectar 842 ficheros borrados del work
- **Compliance check:** UNKNOWN: Sin check automático para este tipo

---
_GR-CORE-029: este reporte es evidencia obligatoria de ejecución de la-sync en Step 1._

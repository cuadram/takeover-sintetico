// gen-baseline-docx.js — BASELINE DOCUMENT v1.0 FacturaFlow / RetailCorp S.L.
// SOFIA v2.6.27 — Sigue patrón exacto de gen-docs-sprint22.js (probado y funcional)
// LA-CORE-014: usa SOFIA-CORE/node_modules/docx
'use strict';
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, BorderStyle, WidthType, ShadingType } = require(
  '/Users/cuadram/Library/CloudStorage/OneDrive-Personal/WIP/SOFIA-CORE/node_modules/docx'
);
const fs   = require('fs');
const path = require('path');

const OUT = '/Users/cuadram/Library/CloudStorage/OneDrive-Personal/WIP/TakeOverSintetico/docs/takeover/BASELINE-DOCUMENT-v1.0.docx';

// ── Paleta ──────────────────────────────────────────────────────────────────
const BLUE   = '1B3E7E';
const ACCENT = 'C84A14';
const WHITE  = 'FFFFFF';
const RED    = 'C00000';
const ORANGE = 'E36C09';
const GREEN  = '375623';
const GREY   = '555555';
const FONT   = 'Arial';

// ── Borders ─────────────────────────────────────────────────────────────────
const bdr     = { style: BorderStyle.SINGLE, size: 4, color: 'C9D3E8' };
const bdrB    = { style: BorderStyle.SINGLE, size: 4, color: BLUE };
const allBdr  = { top: bdr,  bottom: bdr,  left: bdr,  right: bdr  };
const allBdrB = { top: bdrB, bottom: bdrB, left: bdrB, right: bdrB };
const cellMar = { top: 80, bottom: 80, left: 120, right: 120 };

// ── Primitivas ───────────────────────────────────────────────────────────────
const br  = () => new Paragraph({ children: [] });

const p   = (t, o = {}) => new Paragraph({ spacing: { before: 60, after: 60 },
  children: [new TextRun(Object.assign({ text: String(t), font: FONT, size: 22, color: '1F1F1F' }, o))] });

const h1  = t => new Paragraph({ spacing: { before: 360, after: 120 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: BLUE } },
  children: [new TextRun({ text: t, bold: true, size: 36, font: FONT, color: BLUE })] });

const h2  = t => new Paragraph({ spacing: { before: 200, after: 80 },
  children: [new TextRun({ text: t, bold: true, size: 28, font: FONT, color: BLUE })] });

const h3  = t => new Paragraph({ spacing: { before: 140, after: 60 },
  children: [new TextRun({ text: t, bold: true, size: 24, font: FONT, color: '1F1F1F' })] });

const sep = () => new Paragraph({ spacing: { before: 80, after: 80 },
  border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: 'C9D3E8' } }, children: [] });

const bullet = t => new Paragraph({ spacing: { before: 40, after: 40 },
  indent: { left: 400, hanging: 200 },
  children: [
    new TextRun({ text: '\u2022  ', font: FONT, size: 22, color: BLUE, bold: true }),
    new TextRun({ text: t, font: FONT, size: 22, color: '1F1F1F' }),
  ] });

const alertBox = (t, color) => new Paragraph({ spacing: { before: 80, after: 80 },
  indent: { left: 280 },
  border: { left: { style: BorderStyle.SINGLE, size: 20, color } },
  children: [new TextRun({ text: t, font: FONT, size: 20, bold: true, color })] });

// ── Celdas de tabla ──────────────────────────────────────────────────────────
const th = (t, w, span) => new TableCell({
  columnSpan: span || undefined,
  width: { size: w, type: WidthType.DXA },
  borders: allBdrB,
  shading: { fill: BLUE, type: ShadingType.CLEAR },
  margins: cellMar,
  children: [new Paragraph({ alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: String(t), bold: true, font: FONT, size: 20, color: WHITE })] })] });

const td = (t, w, o = {}) => new TableCell({
  width: { size: w, type: WidthType.DXA },
  borders: allBdr,
  shading: { fill: o.bg || 'FFFFFF', type: ShadingType.CLEAR },
  margins: cellMar,
  children: [new Paragraph({
    alignment: o.center ? AlignmentType.CENTER : AlignmentType.LEFT,
    children: [new TextRun({ text: String(t), font: FONT, size: 20,
      color: o.color || '1F1F1F', bold: !!o.bold })] })] });

const row = cells => new TableRow({ children: cells });
const CW = 8504; // A4 con márgenes 1701 cada lado: 11906-3402

// ─────────────────────────────────────────────────────────────────────────────
// CONTENIDO
// ─────────────────────────────────────────────────────────────────────────────

// ── PORTADA ──────────────────────────────────────────────────────────────────
const portada = [
  new Paragraph({ spacing: { before: 1600 }, children: [] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 120 },
    children: [new TextRun({ text: 'EXPERIS  |  ManpowerGroup', bold: true, size: 32, font: FONT, color: BLUE })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 0 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 16, color: ACCENT } }, children: [] }),
  new Paragraph({ spacing: { before: 400, after: 120 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'DOCUMENTO DE LÍNEA BASE', bold: true, size: 52, font: FONT, color: BLUE })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 80 },
    children: [new TextRun({ text: 'Toma de Control de Sistema', size: 30, font: FONT, color: GREY, italics: true })] }),
  new Paragraph({ spacing: { before: 400 }, children: [] }),
  new Table({
    alignment: AlignmentType.CENTER,
    width: { size: Math.round(CW * 0.65), type: WidthType.DXA },
    columnWidths: [Math.round(CW * 0.25), Math.round(CW * 0.40)],
    rows: [
      row([td('Proyecto',       Math.round(CW*0.25),{bold:true,bg:'EEF3FA'}), td('FacturaFlow',                 Math.round(CW*0.40))]),
      row([td('Cliente',        Math.round(CW*0.25),{bold:true,bg:'EEF3FA'}), td('RetailCorp S.L.',             Math.round(CW*0.40))]),
      row([td('Proveedor',      Math.round(CW*0.25),{bold:true,bg:'EEF3FA'}), td('Experis / ManpowerGroup',     Math.round(CW*0.40))]),
      row([td('Fecha baseline', Math.round(CW*0.25),{bold:true,bg:'EEF3FA'}), td('7 de abril de 2026',         Math.round(CW*0.40))]),
      row([td('Versión',        Math.round(CW*0.25),{bold:true,bg:'EEF3FA'}), td('v1.0 — BORRADOR PARA FIRMA', Math.round(CW*0.40),{bold:true,color:ACCENT})]),
      row([td('Clasificación',  Math.round(CW*0.25),{bold:true,bg:'EEF3FA'}), td('CONFIDENCIAL',               Math.round(CW*0.40),{bold:true,color:RED})]),
    ],
  }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 600 },
    children: [new TextRun({ text: 'Elaborado con SOFIA v2.6.27', size: 18, font: FONT, color: 'AAAAAA', italics: true })] }),
  sep(),
];

// ── DECLARACIÓN ───────────────────────────────────────────────────────────────
const secDeclaracion = [
  h1('Declaración de Intención'),
  p('Este documento establece el estado técnico, funcional y de gobernanza del sistema FacturaFlow en la fecha 7 de abril de 2026, inmediatamente antes de que Experis asuma su gestión y evolución. Ha sido elaborado mediante análisis técnico objetivo del repositorio de código y la documentación facilitada por RetailCorp S.L.'),
  br(),
  p('La aprobación y firma de este documento por parte del cliente representa:'),
  bullet('Aceptación del estado técnico documentado en este Baseline.'),
  bullet('Conocimiento y acuerdo con los riesgos de seguridad identificados y su plan de resolución.'),
  bullet('Acuerdo con el backlog priorizado del Sprint 1.'),
  bullet('Comprensión de la velocidad de desarrollo inicial y el calendario de inicio de evolutivos.'),
  bullet('Asunción de los compromisos mutuos descritos en la Sección 5.'),
  br(),
  alertBox('Este documento es inmutable tras su firma. Cualquier modificación posterior generará la versión 2.0. La versión 1.0 permanece como referencia histórica del estado en la fecha de toma de control.', 'E3A000'),
  br(),
];

// ── SECCIÓN 1: ESTADO DEL SISTEMA ─────────────────────────────────────────────
const secEstado = [
  h1('1. Estado del Sistema'),
  h2('1.1 Stack Tecnológico Real'),
  p('Fuente: T1-INVENTORY.md + T1-STACK-MAP.json — análisis estático del repositorio.'),
  br(),
  new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [1900, 1600, 2100, 1100, 1804],
    rows: [
      row([th('Componente',1900), th('Tipo',1600), th('Tecnología',2100), th('Versión',1100), th('Estado',1804)]),
      row([td('FacturaFlow.Api',1900), td('Backend / Monolito',1600), td('.NET / ASP.NET Core',2100), td('6.0',1100,{center:true}),              td('⚠ Desactualizado — CVEs activos',1804,{color:ORANGE})]),
      row([td('EF Core',1900,{bg:'EEF3FA'}), td('ORM',1600,{bg:'EEF3FA'}), td('Entity Framework Core',2100,{bg:'EEF3FA'}), td('6.0.0',1100,{center:true,bg:'EEF3FA'}), td('🔴 CVE Crítico CVSS 9.1',1804,{color:RED,bold:true,bg:'EEF3FA'})]),
      row([td('SQL Server',1900), td('Base de datos',1600), td('Microsoft SQL Server',2100), td('Local',1100,{center:true}),              td('⚠ Credenciales en repo',1804,{color:RED})]),
      row([td('JWT Auth',1900,{bg:'EEF3FA'}), td('Autenticación',1600,{bg:'EEF3FA'}), td('JwtBearer',2100,{bg:'EEF3FA'}), td('6.0.0',1100,{center:true,bg:'EEF3FA'}), td('🔴 CVE Alto CVSS 6.8',1804,{color:RED,bold:true,bg:'EEF3FA'})]),
    ],
  }),
  br(),
  p('Arquitectura: Monolito plano (.NET 6), base de datos SQL Server única, sin microservicios, sin contenedores. Despliegue manual vía FTP por una única persona (Miguel Fernández, TI RetailCorp).'),
  br(),
  h2('1.2 Documentación del Cliente Evaluada — Documentation Trust Score (DTS)'),
  new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [2400, 900, 1100, 900, 3204],
    rows: [
      row([th('Documento',2400), th('Tipo',900), th('DTS',1100), th('Nivel',900), th('Uso en el análisis',3204)]),
      row([td('manual-funcional.md v2.1 (Oct 2024)',2400), td('Funcional',900,{center:true}), td('0.645',1100,{center:true}), td('GOOD',900,{center:true,color:GREEN,bold:true}),  td('Base funcional — validado 100% contra código',3204)]),
      row([td('openapi.yaml v1.4',2400,{bg:'EEF3FA'}), td('API',900,{center:true,bg:'EEF3FA'}), td('0.820',1100,{center:true,bg:'EEF3FA'}), td('TRUSTED',900,{center:true,color:GREEN,bold:true,bg:'EEF3FA'}), td('Fuente primaria de contratos API',3204,{bg:'EEF3FA'})]),
      row([td('arquitectura-2020.md (Mar 2020)',2400), td('Arquitectura',900,{center:true}), td('0.210',1100,{center:true}), td('ZOMBIE',900,{center:true,color:RED,bold:true}),   td('EXCLUIDA — Java 2020 vs .NET 6 real',3204,{color:RED})]),
    ],
  }),
  br(),
  h2('1.3 Catálogo Funcional — 14 Funcionalidades'),
  new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [2800, 1200, 1400, 1400, 1704],
    rows: [
      row([th('Módulo',2800), th('Funcionalidades',1200), th('Confianza ALTA',1400), th('Confianza MEDIA',1400), th('UNKNOWN',1704)]),
      row([td('Gestión de Clientes',2800),        td('5',1200,{center:true}), td('5',1400,{center:true,color:GREEN,bold:true}), td('0',1400,{center:true}), td('0',1704,{center:true})]),
      row([td('Gestión de Facturas',2800,{bg:'EEF3FA'}), td('7',1200,{center:true,bg:'EEF3FA'}), td('6',1400,{center:true,color:GREEN,bold:true,bg:'EEF3FA'}), td('1',1400,{center:true,bg:'EEF3FA'}), td('0',1704,{center:true,bg:'EEF3FA'})]),
      row([td('Usuarios y Acceso',2800),          td('2',1200,{center:true}), td('0',1400,{center:true}), td('1',1400,{center:true}), td('1',1704,{center:true,color:ORANGE,bold:true})]),
      row([td('TOTAL',2800,{bold:true,bg:'EEF3FA'}), td('14',1200,{center:true,bold:true,bg:'EEF3FA'}), td('11',1400,{center:true,bold:true,bg:'EEF3FA'}), td('2',1400,{center:true,bg:'EEF3FA'}), td('1',1704,{center:true,bg:'EEF3FA'})]),
    ],
  }),
  br(),
  h3('Funcionalidades documentadas no implementadas en el código'),
  new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [2600, 1900, 4004],
    rows: [
      row([th('Funcionalidad',2600), th('Estado',1900), th('Plan',4004)]),
      row([td('Registro de pago (EMITIDA → PAGADA)',2600), td('No implementada',1900,{color:RED,bold:true}), td('DEBT-TK-011 — Sprint 1',4004)]),
      row([td('Anulación de facturas (EMITIDA → ANULADA)',2600,{bg:'EEF3FA'}), td('No implementada',1900,{color:RED,bold:true,bg:'EEF3FA'}), td('DEBT-TK-012 — Sprint 1',4004,{bg:'EEF3FA'})]),
      row([td('Informes de facturación (3 informes)',2600), td('No implementada',1900,{color:RED,bold:true}), td('DEBT-TK-013 — Backlog',4004)]),
      row([td('Exportación a PDF',2600,{bg:'EEF3FA'}), td('Código no entregado — existe en prod',1900,{color:ORANGE,bold:true,bg:'EEF3FA'}), td('DEBT-TK-014 — URGENTE: Recuperar de Miguel Fernández',4004,{color:RED,bg:'EEF3FA'})]),
    ],
  }),
  br(),
];

// ── SECCIÓN 2: CALIDAD ────────────────────────────────────────────────────────
const secCalidad = [
  h1('2. Estado de Calidad (Baseline)'),
  new Paragraph({ spacing: { before: 60, after: 80 },
    children: [
      new TextRun({ text: 'Semáforo global de calidad: ', font: FONT, size: 24, bold: true }),
      new TextRun({ text: '🔴  ROJO — CRÍTICO', font: FONT, size: 24, bold: true, color: RED }),
    ]}),
  h2('2.1 Riesgos de Seguridad Activos en Producción'),
  new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [1000, 700, 1100, 2300, 3404],
    rows: [
      row([th('DEBT-TK',1000), th('CVSS',700), th('Prioridad',1100), th('Vulnerabilidad',2300), th('Plan de resolución',3404)]),
      row([td('TK-001',1000), td('9.1',700,{center:true,bold:true,color:RED}), td('CRITICAL',1100,{bold:true,color:RED}), td('CVE-2024-0057 EF Core 6.0.0',2300), td('Upgrade a EF Core 8.x LTS — Sprint 1',3404)]),
      row([td('TK-002',1000,{bg:'EEF3FA'}), td('6.8',700,{center:true,bold:true,color:ORANGE,bg:'EEF3FA'}), td('HIGH',1100,{bold:true,color:ORANGE,bg:'EEF3FA'}), td('CVE-2024-21319 JwtBearer 6.0.0',2300,{bg:'EEF3FA'}), td('Upgrade a JwtBearer 8.x — Sprint 1',3404,{bg:'EEF3FA'})]),
      row([td('TK-003',1000), td('—',700,{center:true}), td('CRITICAL',1100,{bold:true,color:RED}), td('JWT secret hardcodeado en repositorio',2300), td('Rotar INMEDIATO + variable de entorno',3404,{color:RED,bold:true})]),
      row([td('TK-004',1000,{bg:'EEF3FA'}), td('—',700,{center:true,bg:'EEF3FA'}), td('CRITICAL',1100,{bold:true,color:RED,bg:'EEF3FA'}), td('DB password hardcodeada en repositorio',2300,{bg:'EEF3FA'}), td('Rotar INMEDIATO + variable de entorno',3404,{color:RED,bold:true,bg:'EEF3FA'})]),
      row([td('TK-005',1000), td('—',700,{center:true}), td('CRITICAL',1100,{bold:true,color:RED}), td('Passwords usuarios en texto plano en BD',2300), td('Migrar a bcrypt — Sprint 1',3404)]),
    ],
  }),
  br(),
  alertBox('TK-003 y TK-004 deben rotarse ANTES del inicio de Sprint 1. El repositorio puede haber sido accedido por múltiples personas durante el desarrollo previo.', RED),
  br(),
  h2('2.2 Cobertura de Tests y Operabilidad'),
  new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [3000, 2000, 3504],
    rows: [
      row([th('Indicador',3000), th('Valor',2000), th('Evaluación',3504)]),
      row([td('Tests existentes',3000), td('2',2000,{center:true}), td('🔴 Insuficiente',3504,{color:RED})]),
      row([td('Ratio test / producción',3000,{bg:'EEF3FA'}), td('0.17',2000,{center:true,bg:'EEF3FA'}), td('🔴 Riesgo regresión ALTO',3504,{color:RED,bg:'EEF3FA'})]),
      row([td('Cobertura funcional estimada',3000), td('< 5%',2000,{center:true,bold:true}), td('🔴 Cualquier cambio tiene riesgo de regresión',3504,{color:RED})]),
      row([td('CI/CD Pipeline',3000,{bg:'EEF3FA'}), td('Ninguno',2000,{center:true,bg:'EEF3FA'}), td('🔴 Deploy manual FTP por una persona',3504,{color:RED,bg:'EEF3FA'})]),
      row([td('Compilación (BUILD)',3000), td('NO VERIFICADA',2000,{center:true,bold:true}), td('⚠ Verificar día 1 Sprint 1',3504,{color:ORANGE})]),
    ],
  }),
  br(),
];

// ── SECCIÓN 3: GOBERNANZA ─────────────────────────────────────────────────────
const secGobernanza = [
  h1('3. Estado de Gobernanza'),
  new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [2400, 1700, 1200, 1400, 1804],
    rows: [
      row([th('Dimensión',2400), th('Estado actual',1700), th('Nivel',1200), th('Objetivo SOFIA',1400), th('Plazo estimado',1804)]),
      row([td('Cobertura documental',2400), td('47% vol / 0.22 calidad',1700), td('MEDIO/ZOMBIE',1200,{color:ORANGE,bold:true}), td('100% / Fiable',1400), td('Sprint 5',1804)]),
      row([td('Madurez de procesos',2400,{bg:'EEF3FA'}), td('0.08 / 3.0',1700,{bg:'EEF3FA'}), td('AD-HOC',1200,{color:RED,bold:true,bg:'EEF3FA'}), td('MANAGED',1400,{bg:'EEF3FA'}), td('Sprint 6',1804,{bg:'EEF3FA'})]),
      row([td('Nivel CMMI estimado',2400), td('L1–L2',1700), td('L1–L2',1200,{color:RED,bold:true}), td('L3',1400,{color:GREEN,bold:true}), td('Sprint 3',1804)]),
    ],
  }),
  br(),
  p('El proyecto operaba completamente ad-hoc, sin Jira, sin CI/CD, sin code reviews formales y sin documentación técnica completa. Dependencia crítica de una única persona (Miguel Fernández) para despliegue y operación — principal riesgo de continuidad.'),
  br(),
  h3('Camino a CMMI L3'),
  new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [1000, 4500, 3004],
    rows: [
      row([th('Sprint',1000), th('Process Areas CONFORMES',4500), th('Nivel alcanzado',3004)]),
      row([td('S1',1000), td('PP, VER, VAL, CM',4500), td('L2',3004)]),
      row([td('S2',1000,{bg:'EEF3FA'}), td('+ PMC, RSKM, REQM, DAR',4500,{bg:'EEF3FA'}), td('L2–L3',3004,{bg:'EEF3FA'})]),
      row([td('S3',1000,{bold:true}), td('+ PPQA → 9/9 PAs CONFORMES',4500,{bold:true}), td('L3 ✅',3004,{bold:true,color:GREEN})]),
    ],
  }),
  br(),
];

// ── SECCIÓN 4: PLAN DE TRABAJO ────────────────────────────────────────────────
const secPlan = [
  h1('4. Plan de Trabajo'),
  h2('4.1 Sprint 1 — Estabilización Completa (24 SP — 0 SP evolutivos de negocio)'),
  alertBox('Sprint 1 es de estabilización pura. Esta situación es consecuencia directa del estado del sistema en la fecha de toma de control, no de una decisión de Experis. El primer evolutivo de negocio ocurrirá en Sprint 2.', 'E3A000'),
  br(),
  new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [900, 5000, 800, 1804],
    rows: [
      row([th('Issue',900), th('Descripción',5000), th('SP',800), th('Épica',1804)]),
      row([td('TK-003',900), td('Rotar JWT secret → variable de entorno',5000,{color:RED,bold:true}), td('1',800,{center:true}), td('SEG. INMEDIATA',1804)]),
      row([td('TK-004',900,{bg:'EEF3FA'}), td('Rotar DB password → variable de entorno',5000,{color:RED,bold:true,bg:'EEF3FA'}), td('1',800,{center:true,bg:'EEF3FA'}), td('SEG. INMEDIATA',1804,{bg:'EEF3FA'})]),
      row([td('TK-001',900), td('Upgrade EF Core 6.0.0 → 8.x LTS (CVE-2024-0057, CVSS 9.1)',5000), td('5',800,{center:true}), td('SEGURIDAD',1804)]),
      row([td('TK-002',900,{bg:'EEF3FA'}), td('Upgrade JwtBearer 6.0.0 → 8.x (CVE-2024-21319, CVSS 6.8)',5000,{bg:'EEF3FA'}), td('1',800,{center:true,bg:'EEF3FA'}), td('SEGURIDAD',1804,{bg:'EEF3FA'})]),
      row([td('TK-005',900), td('Migrar passwords de usuarios a bcrypt hash',5000), td('5',800,{center:true}), td('SEGURIDAD',1804)]),
      row([td('TK-007',900,{bg:'EEF3FA'}), td('Pipeline CI/CD básico — GitHub Actions (build + test automático)',5000,{bg:'EEF3FA'}), td('5',800,{center:true,bg:'EEF3FA'}), td('CI/CD',1804,{bg:'EEF3FA'})]),
      row([td('SETUP',900), td('Jira + Confluence + Git Flow + Risk Register + SRS baseline',5000), td('6',800,{center:true}), td('GOBERNANZA',1804)]),
      row([td('TOTAL',900,{bold:true,bg:BLUE,color:WHITE}), td('',5000,{bg:BLUE}), td('24 SP',800,{center:true,bold:true,bg:BLUE,color:WHITE}), td('',1804,{bg:BLUE})]),
    ],
  }),
  br(),
  h2('4.2 Roadmap de Estabilización'),
  new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [900, 2800, 1400, 3404],
    rows: [
      row([th('Sprint',900), th('Foco',2800), th('SP evolutivos',1400), th('Hito clave',3404)]),
      row([td('S1',900,{bold:true}), td('Seguridad + CI/CD + gobernanza SOFIA',2800), td('0 SP',1400,{center:true,bold:true,color:RED}), td('Sistema seguro + pipeline operativo',3404)]),
      row([td('S2',900,{bg:'EEF3FA'}), td('Tests + primer evolutivo de negocio',2800,{bg:'EEF3FA'}), td('~15 SP',1400,{center:true,bold:true,color:GREEN,bg:'EEF3FA'}), td('Primer entregable de negocio (PAGADA, ANULADA)',3404,{bg:'EEF3FA'})]),
      row([td('S3',900,{bold:true}), td('FA-Agent + CMMI L3 + CI deploy',2800), td('~20 SP',1400,{center:true,bold:true,color:GREEN}), td('CMMI L3 completo — evolutivos a velocidad normal',3404,{bold:true})]),
      row([td('S4+',900,{bg:'EEF3FA'}), td('Velocidad de crucero',2800,{bg:'EEF3FA'}), td('~22 SP',1400,{center:true,bg:'EEF3FA'}), td('17 docs/sprint — 5% overhead gobernanza',3404,{bg:'EEF3FA'})]),
    ],
  }),
  br(),
];

// ── SECCIÓN 5: COMPROMISOS ────────────────────────────────────────────────────
const secCompromisos = [
  h1('5. Compromisos Mutuos'),
  h2('5.1 Experis se compromete a:'),
  bullet('Resolver los riesgos de seguridad críticos (TK-001..005) en Sprint 1, antes de cualquier evolutivo de negocio.'),
  bullet('Rotar los secrets de JWT y base de datos ANTES del inicio formal de Sprint 1.'),
  bullet('Comunicar proactivamente cualquier bloqueante o desviación detectada.'),
  bullet('Mantener este Baseline Document como referencia histórica inmutable (versión firmada).'),
  bullet('Alcanzar CMMI L3 en Sprint 3 según el Adoption Roadmap SOFIA.'),
  bullet('Informar del estado de los indicadores de calidad en cada sprint review.'),
  br(),
  h2('5.2 RetailCorp S.L. se compromete a:'),
  bullet('Proporcionar acceso write completo al repositorio antes del inicio de Sprint 1.'),
  bullet('Facilitar credenciales del servidor de producción para rotación de secrets (INMEDIATO).'),
  bullet('Designar contacto técnico (Miguel Fernández u otro) para transferencia en semana 1 de Sprint 1.'),
  bullet('Proporcionar o localizar el código fuente del endpoint de exportación PDF (DEBT-TK-014).'),
  bullet('Participar en las demos de sprint (Gate G-6) para validar las funcionalidades entregadas.'),
  br(),
  h2('5.3 Acciones Inmediatas — Antes del Inicio de Sprint 1'),
  new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [500, 4200, 1900, 1904],
    rows: [
      row([th('#',500), th('Acción',4200), th('Responsable',1900), th('Plazo',1904)]),
      row([td('1',500,{center:true}), td('Rotar JWT secret en servidor de producción',4200,{bold:true}), td('RetailCorp + Experis',1900), td('INMEDIATO',1904,{bold:true,color:RED})]),
      row([td('2',500,{center:true,bg:'EEF3FA'}), td('Rotar contraseña de base de datos en producción',4200,{bold:true,bg:'EEF3FA'}), td('RetailCorp + Experis',1900,{bg:'EEF3FA'}), td('INMEDIATO',1904,{bold:true,color:RED,bg:'EEF3FA'})]),
      row([td('3',500,{center:true}), td('Contactar a Miguel Fernández — sesión de transferencia operacional',4200), td('RetailCorp',1900), td('Semana 1 S1',1904)]),
      row([td('4',500,{center:true,bg:'EEF3FA'}), td('Localizar y respaldar código exportación PDF — DEBT-TK-014',4200,{bg:'EEF3FA'}), td('RetailCorp',1900,{bg:'EEF3FA'}), td('URGENTE',1904,{bold:true,color:ORANGE,bg:'EEF3FA'})]),
    ],
  }),
  br(),
];

// ── SECCIÓN 6: FIRMA DE ACEPTACIÓN ────────────────────────────────────────────
const HALF = Math.round((CW - 400) / 2);

const signatureBlock = (title) => new TableCell({
  width: { size: HALF, type: WidthType.DXA },
  borders: allBdr,
  shading: { fill: 'F5F8FE', type: ShadingType.CLEAR },
  margins: { top: 200, bottom: 200, left: 240, right: 240 },
  children: [
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 0, after: 100 },
      children: [new TextRun({ text: title, bold: true, font: FONT, size: 22, color: BLUE })] }),
    sep(),
    p('Nombre y apellidos:', { bold: true, color: GREY }),
    new Paragraph({ spacing: { before: 200, after: 60 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '333333' } }, children: [] }),
    br(),
    p('Cargo:', { bold: true, color: GREY }),
    new Paragraph({ spacing: { before: 160, after: 60 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '333333' } }, children: [] }),
    br(),
    p('NIF / CIF empresa:', { bold: true, color: GREY }),
    new Paragraph({ spacing: { before: 160, after: 60 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '333333' } }, children: [] }),
    br(),
    p('Firma:', { bold: true, color: GREY }),
    new Paragraph({ spacing: { before: 560, after: 60 },
      border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: '333333' } }, children: [] }),
    br(),
    p('Fecha: ___ / ___ / _______', { color: GREY }),
    p('Lugar: _______________________', { color: GREY }),
  ],
});

const spacerCell = new TableCell({
  width: { size: 400, type: WidthType.DXA },
  borders: { top: { style: BorderStyle.NONE }, bottom: { style: BorderStyle.NONE },
             left: { style: BorderStyle.NONE }, right: { style: BorderStyle.NONE } },
  shading: { fill: 'FFFFFF', type: ShadingType.CLEAR },
  children: [new Paragraph({ children: [] })],
});

const secFirma = [
  h1('6. Firma de Aceptación — Gate GT-5'),
  p('Al firmar este documento, ambas partes confirman que:'),
  br(),
  bullet('Han leído y comprenden el estado del sistema FacturaFlow documentado en las secciones 1 a 3.'),
  bullet('Aceptan el backlog del Sprint 1 detallado en la sección 4.1 como plan de trabajo inicial.'),
  bullet('Conocen los riesgos de seguridad activos y aceptan el plan de resolución en Sprint 1.'),
  bullet('Entienden que Sprint 1 es de estabilización sin evolutivos de negocio.'),
  bullet('Se comprometen a las acciones descritas en la sección 5.'),
  br(),
  alertBox('Este documento tiene carácter contractual. La firma manuscrita de ambas partes es vinculante y marca el inicio formal del servicio de Experis.', RED),
  br(),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40, after: 80 },
    children: [new TextRun({ text: '— PENDIENTE DE FIRMA MANUSCRITA — BORRADOR v1.0 —', font: FONT, size: 26, bold: true, color: ACCENT })] }),
  br(),
  new Table({
    width: { size: CW, type: WidthType.DXA },
    columnWidths: [HALF, 400, HALF],
    rows: [
      new TableRow({ children: [
        signatureBlock('POR RETAILCORP S.L. (CLIENTE)'),
        spacerCell,
        signatureBlock('POR EXPERIS / MANPOWERGROUP'),
      ]}),
    ],
  }),
  br(),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 60 },
    children: [new TextRun({ text: 'La versión firmada puede enviarse como PDF con firma electrónica avanzada (eIDAS) con plena validez jurídica.', font: FONT, size: 18, color: '777777', italics: true })] }),
  sep(),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 40 },
    children: [new TextRun({ text: 'Elaborado con SOFIA v2.6.27 — Experis / ManpowerGroup — 2026-04-07', font: FONT, size: 18, color: 'AAAAAA', italics: true })] }),
  new Paragraph({ alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: 'Artefactos: T0-DOC-MATRIX.json · T1-INVENTORY · T2-QUALITY-BASELINE · fa-index.json v0.1 · T3-FA-DRAFT · T4-GOVERNANCE-GAP', font: FONT, size: 16, color: 'CCCCCC' })] }),
];

// ── GENERAR DOC ───────────────────────────────────────────────────────────────
async function main() {
  const doc = new Document({
    sections: [{
      properties: {
        page: {
          size:   { width: 11906, height: 16838 },
          margin: { top: 1417, bottom: 1417, left: 1701, right: 1701 },
        },
      },
      children: [
        ...portada,
        ...secDeclaracion,
        ...secEstado,
        ...secCalidad,
        ...secGobernanza,
        ...secPlan,
        ...secCompromisos,
        ...secFirma,
      ],
    }],
  });
  const buf = await Packer.toBuffer(doc);
  fs.writeFileSync(OUT, buf);
  console.log('OK — BASELINE-DOCUMENT-v1.0.docx');
  console.log('Ruta:', OUT);
  console.log('Tamanyo:', Math.round(buf.length/1024), 'KB');
}
main().catch(e => { console.error('ERROR:', e.message); process.exit(1); });

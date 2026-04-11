-- Migración inicial FacturaFlow
-- Generada: 2022-03-15
-- EF Core Tools

CREATE TABLE [Clientes] (
    [Id] int NOT NULL IDENTITY,
    [RazonSocial] nvarchar(200) NOT NULL,
    [NifCif] nvarchar(20) NOT NULL,
    [Email] nvarchar(max) NOT NULL,
    [Telefono] nvarchar(max) NOT NULL,
    [Direccion] nvarchar(max) NOT NULL,
    [Activo] bit NOT NULL DEFAULT 1,
    [FechaAlta] datetime2 NOT NULL,
    [TipoCliente] nvarchar(max) NOT NULL DEFAULT N'NACIONAL',
    CONSTRAINT [PK_Clientes] PRIMARY KEY ([Id])
);

CREATE UNIQUE INDEX [IX_Clientes_NifCif] ON [Clientes] ([NifCif]);

CREATE TABLE [Facturas] (
    [Id] int NOT NULL IDENTITY,
    [Numero] nvarchar(20) NOT NULL,
    [ClienteId] int NOT NULL,
    [FechaCreacion] datetime2 NOT NULL,
    [FechaEmision] datetime2 NULL,
    [FechaVencimiento] datetime2 NULL,
    [Estado] nvarchar(20) NOT NULL,
    [BaseImponible] decimal(18,2) NOT NULL,
    [PorcentajeIVA] decimal(18,2) NOT NULL DEFAULT 21,
    [Total] decimal(18,2) NOT NULL,
    CONSTRAINT [PK_Facturas] PRIMARY KEY ([Id]),
    CONSTRAINT [FK_Facturas_Clientes] FOREIGN KEY ([ClienteId]) REFERENCES [Clientes] ([Id])
);

CREATE TABLE [Usuarios] (
    [Id] int NOT NULL IDENTITY,
    [Email] nvarchar(200) NOT NULL,
    [Password] nvarchar(max) NOT NULL,
    [Rol] nvarchar(max) NOT NULL DEFAULT N'Solo_Lectura',
    [Activo] bit NOT NULL DEFAULT 1,
    CONSTRAINT [PK_Usuarios] PRIMARY KEY ([Id])
);

CREATE UNIQUE INDEX [IX_Usuarios_Email] ON [Usuarios] ([Email]);

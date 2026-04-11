# ─────────────────────────────────────────────────────────────────────────────
# Dockerfile — FacturaFlow API
# SOFIA Sprint 1 RT-006 (DevOps Step 7)
# Stack: .NET 8 / ASP.NET Core
# Multi-stage: SDK build → ASP.NET runtime alpine (imagen mínima)
# ─────────────────────────────────────────────────────────────────────────────

# ── Stage 1: Build ──────────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Restaurar dependencias primero (optimizar cache de capas)
COPY FacturaFlow.Api.csproj .
RUN dotnet restore

# Copiar resto del código y publicar
COPY . .
RUN dotnet publish FacturaFlow.Api.csproj \
    -c Release \
    -o /app/publish \
    --no-restore \
    --self-contained false

# ── Stage 2: Runtime ─────────────────────────────────────────────────────────
FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS runtime
WORKDIR /app

# Usuario no-root — principio de mínimo privilegio (OWASP)
RUN addgroup -S facturaflow && adduser -S facturaflow -G facturaflow

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
    CMD wget -qO- http://localhost:8080/health/live || exit 1

# Copiar publicación desde stage build
COPY --from=build /app/publish .

# Permisos al usuario de aplicación
RUN chown -R facturaflow:facturaflow /app
USER facturaflow

# Puerto de escucha
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
ENV ASPNETCORE_ENVIRONMENT=Production

# Secrets NUNCA en el Dockerfile — inyectados en runtime via env vars:
#   JWTAUTH__SECRET
#   CONNECTIONSTRINGS__DEFAULTCONNECTION

ENTRYPOINT ["dotnet", "FacturaFlow.Api.dll"]

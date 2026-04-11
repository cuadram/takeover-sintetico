using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FacturaFlow.Migrations
{
    /// <summary>
    /// Migración Sprint 1 RT-005: añade columna PasswordHash a tabla Usuarios.
    /// La migración de datos (hashear passwords existentes con BCrypt) se ejecuta
    /// mediante el script separado: scripts/MigratePasswordsToBcrypt.cs
    /// </summary>
    public partial class AddPasswordHash : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Paso 1: añadir columna PasswordHash (nullable — permite rollback seguro)
            migrationBuilder.AddColumn<string>(
                name: "PasswordHash",
                table: "Usuarios",
                type: "nvarchar(max)",
                nullable: true);

            // Paso 2: cambiar columna Password a nullable para soporte de rollback
            // y para vaciarla tras la migración de datos
            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "Usuarios",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            // NOTA: El marcador PENDING_MIGRATION indica que la fila necesita
            // ser procesada por scripts/MigratePasswordsToBcrypt.cs
            // NO ejecutar scripts/MigratePasswordsToBcrypt.cs sin backup previo de BD.
            migrationBuilder.Sql(
                "UPDATE Usuarios SET PasswordHash = 'PENDING_MIGRATION' WHERE PasswordHash IS NULL;");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PasswordHash",
                table: "Usuarios");

            // Restaurar Password como NOT NULL
            migrationBuilder.AlterColumn<string>(
                name: "Password",
                table: "Usuarios",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: string.Empty,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);
        }
    }
}

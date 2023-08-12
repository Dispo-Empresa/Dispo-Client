using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Dispo.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class PR683 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: -3L);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: -2L);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: -1L);

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Key", "Name" },
                values: new object[,]
                {
                    { 5L, "manager", "Gerente" },
                    { 6L, "purchasingManager", "Gerente de compras" },
                    { 7L, "warehouseOperator", "Operador de depósito" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 5L);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 6L);

            migrationBuilder.DeleteData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 7L);

            migrationBuilder.InsertData(
                table: "Roles",
                columns: new[] { "Id", "Key", "Name" },
                values: new object[,]
                {
                    { -3L, "warehouseOperator", "Operador de depósito" },
                    { -2L, "purchasingManager", "Gerente de compras" },
                    { -1L, "manager", "Gerente" }
                });
        }
    }
}
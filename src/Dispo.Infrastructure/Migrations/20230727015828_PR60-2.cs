using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dispo.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class PR602 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Products_ProductDimensionId",
                table: "Products");

            migrationBuilder.AlterColumn<long>(
                name: "ProductDimensionId",
                table: "Products",
                type: "BIGINT",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "BIGINT");

            migrationBuilder.CreateIndex(
                name: "IX_Products_ProductDimensionId",
                table: "Products",
                column: "ProductDimensionId",
                unique: true,
                filter: "[ProductDimensionId] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Products_ProductDimensionId",
                table: "Products");

            migrationBuilder.AlterColumn<long>(
                name: "ProductDimensionId",
                table: "Products",
                type: "BIGINT",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "BIGINT",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Products_ProductDimensionId",
                table: "Products",
                column: "ProductDimensionId",
                unique: true);
        }
    }
}
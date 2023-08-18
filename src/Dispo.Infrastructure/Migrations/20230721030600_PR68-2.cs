using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dispo.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class PR682 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Accounts_UserId",
                table: "Accounts");

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "Accounts",
                type: "BIGINT",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "BIGINT");

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_UserId",
                table: "Accounts",
                column: "UserId",
                unique: true,
                filter: "[UserId] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Accounts_UserId",
                table: "Accounts");

            migrationBuilder.AlterColumn<long>(
                name: "UserId",
                table: "Accounts",
                type: "BIGINT",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "BIGINT",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_UserId",
                table: "Accounts",
                column: "UserId",
                unique: true);
        }
    }
}
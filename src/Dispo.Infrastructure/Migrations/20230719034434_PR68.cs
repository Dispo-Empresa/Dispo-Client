using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dispo.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class PR68 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "WarehouseAccount",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AccountId = table.Column<long>(type: "BIGINT", nullable: false),
                    WarehouseId = table.Column<long>(type: "BIGINT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WarehouseAccount", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WarehouseAccount_Accounts_AccountId",
                        column: x => x.AccountId,
                        principalTable: "Accounts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_WarehouseAccount_Warehouses_WarehouseId",
                        column: x => x.WarehouseId,
                        principalTable: "Warehouses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WarehouseAccount_AccountId",
                table: "WarehouseAccount",
                column: "AccountId");

            migrationBuilder.CreateIndex(
                name: "IX_WarehouseAccount_WarehouseId",
                table: "WarehouseAccount",
                column: "WarehouseId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "WarehouseAccount");
        }
    }
}
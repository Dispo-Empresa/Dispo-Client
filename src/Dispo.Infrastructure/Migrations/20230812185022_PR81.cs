using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dispo.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class PR81 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Movements_Warehouses_WarehouseId1",
                table: "Movements");

            migrationBuilder.DropIndex(
                name: "IX_Movements_WarehouseId1",
                table: "Movements");

            migrationBuilder.DropColumn(
                name: "WarehouseId1",
                table: "Movements");

            migrationBuilder.AddColumn<long>(
                name: "CurrentWarehouseId",
                table: "Users",
                type: "BIGINT",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "UserWarehouses",
                columns: table => new
                {
                    WarehouseId = table.Column<long>(type: "BIGINT", nullable: false),
                    UserId = table.Column<long>(type: "BIGINT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserWarehouses", x => new { x.UserId, x.WarehouseId });
                    table.ForeignKey(
                        name: "FK_UserWarehouses_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                    table.ForeignKey(
                        name: "FK_UserWarehouses_Warehouses_WarehouseId",
                        column: x => x.WarehouseId,
                        principalTable: "Warehouses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.NoAction);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_CurrentWarehouseId",
                table: "Users",
                column: "CurrentWarehouseId");

            migrationBuilder.CreateIndex(
                name: "IX_UserWarehouses_WarehouseId",
                table: "UserWarehouses",
                column: "WarehouseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Warehouses_CurrentWarehouseId",
                table: "Users",
                column: "CurrentWarehouseId",
                principalTable: "Warehouses",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Warehouses_CurrentWarehouseId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "UserWarehouses");

            migrationBuilder.DropIndex(
                name: "IX_Users_CurrentWarehouseId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "CurrentWarehouseId",
                table: "Users");

            migrationBuilder.AddColumn<long>(
                name: "WarehouseId1",
                table: "Movements",
                type: "BIGINT",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Movements_WarehouseId1",
                table: "Movements",
                column: "WarehouseId1",
                unique: true,
                filter: "[WarehouseId1] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Movements_Warehouses_WarehouseId1",
                table: "Movements",
                column: "WarehouseId1",
                principalTable: "Warehouses",
                principalColumn: "Id");
        }
    }
}
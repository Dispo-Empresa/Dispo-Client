using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dispo.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class PR81Correcao : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Warehouses_CurrentWarehouseId",
                table: "Users");

            migrationBuilder.DropForeignKey(
                name: "FK_WarehouseAccount_Accounts_AccountId",
                table: "WarehouseAccount");

            migrationBuilder.DropForeignKey(
                name: "FK_WarehouseAccount_Warehouses_WarehouseId",
                table: "WarehouseAccount");

            migrationBuilder.DropTable(
                name: "UserWarehouses");

            migrationBuilder.DropIndex(
                name: "IX_Users_CurrentWarehouseId",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WarehouseAccount",
                table: "WarehouseAccount");

            migrationBuilder.DropColumn(
                name: "CurrentWarehouseId",
                table: "Users");

            migrationBuilder.RenameTable(
                name: "WarehouseAccount",
                newName: "WarehouseAccounts");

            migrationBuilder.RenameIndex(
                name: "IX_WarehouseAccount_WarehouseId",
                table: "WarehouseAccounts",
                newName: "IX_WarehouseAccounts_WarehouseId");

            migrationBuilder.RenameIndex(
                name: "IX_WarehouseAccount_AccountId",
                table: "WarehouseAccounts",
                newName: "IX_WarehouseAccounts_AccountId");

            migrationBuilder.AddColumn<long>(
                name: "WarehouseId1",
                table: "Movements",
                type: "BIGINT",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "CurrentWarehouseId",
                table: "Accounts",
                type: "BIGINT",
                nullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "Id",
                table: "WarehouseAccounts",
                type: "BIGINT",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WarehouseAccounts",
                table: "WarehouseAccounts",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_Movements_WarehouseId1",
                table: "Movements",
                column: "WarehouseId1",
                unique: true,
                filter: "[WarehouseId1] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Accounts_CurrentWarehouseId",
                table: "Accounts",
                column: "CurrentWarehouseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Accounts_Warehouses_CurrentWarehouseId",
                table: "Accounts",
                column: "CurrentWarehouseId",
                principalTable: "Warehouses",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Movements_Warehouses_WarehouseId1",
                table: "Movements",
                column: "WarehouseId1",
                principalTable: "Warehouses",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WarehouseAccounts_Accounts_AccountId",
                table: "WarehouseAccounts",
                column: "AccountId",
                principalTable: "Accounts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_WarehouseAccounts_Warehouses_WarehouseId",
                table: "WarehouseAccounts",
                column: "WarehouseId",
                principalTable: "Warehouses",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Accounts_Warehouses_CurrentWarehouseId",
                table: "Accounts");

            migrationBuilder.DropForeignKey(
                name: "FK_Movements_Warehouses_WarehouseId1",
                table: "Movements");

            migrationBuilder.DropForeignKey(
                name: "FK_WarehouseAccounts_Accounts_AccountId",
                table: "WarehouseAccounts");

            migrationBuilder.DropForeignKey(
                name: "FK_WarehouseAccounts_Warehouses_WarehouseId",
                table: "WarehouseAccounts");

            migrationBuilder.DropIndex(
                name: "IX_Movements_WarehouseId1",
                table: "Movements");

            migrationBuilder.DropIndex(
                name: "IX_Accounts_CurrentWarehouseId",
                table: "Accounts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_WarehouseAccounts",
                table: "WarehouseAccounts");

            migrationBuilder.DropColumn(
                name: "WarehouseId1",
                table: "Movements");

            migrationBuilder.DropColumn(
                name: "CurrentWarehouseId",
                table: "Accounts");

            migrationBuilder.RenameTable(
                name: "WarehouseAccounts",
                newName: "WarehouseAccount");

            migrationBuilder.RenameIndex(
                name: "IX_WarehouseAccounts_WarehouseId",
                table: "WarehouseAccount",
                newName: "IX_WarehouseAccount_WarehouseId");

            migrationBuilder.RenameIndex(
                name: "IX_WarehouseAccounts_AccountId",
                table: "WarehouseAccount",
                newName: "IX_WarehouseAccount_AccountId");

            migrationBuilder.AddColumn<long>(
                name: "CurrentWarehouseId",
                table: "Users",
                type: "BIGINT",
                nullable: true);

            migrationBuilder.AlterColumn<long>(
                name: "Id",
                table: "WarehouseAccount",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "BIGINT")
                .Annotation("SqlServer:Identity", "1, 1")
                .OldAnnotation("SqlServer:Identity", "1, 1");

            migrationBuilder.AddPrimaryKey(
                name: "PK_WarehouseAccount",
                table: "WarehouseAccount",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "UserWarehouses",
                columns: table => new
                {
                    UserId = table.Column<long>(type: "BIGINT", nullable: false),
                    WarehouseId = table.Column<long>(type: "BIGINT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserWarehouses", x => new { x.UserId, x.WarehouseId });
                    table.ForeignKey(
                        name: "FK_UserWarehouses_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserWarehouses_Warehouses_WarehouseId",
                        column: x => x.WarehouseId,
                        principalTable: "Warehouses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
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

            migrationBuilder.AddForeignKey(
                name: "FK_WarehouseAccount_Accounts_AccountId",
                table: "WarehouseAccount",
                column: "AccountId",
                principalTable: "Accounts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WarehouseAccount_Warehouses_WarehouseId",
                table: "WarehouseAccount",
                column: "WarehouseId",
                principalTable: "Warehouses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

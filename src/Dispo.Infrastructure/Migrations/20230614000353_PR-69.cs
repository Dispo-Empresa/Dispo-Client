using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dispo.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class PR69 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Inventory_InventoryId",
                table: "Products");

            migrationBuilder.DropTable(
                name: "Inventory");

            migrationBuilder.RenameColumn(
                name: "InventoryId",
                table: "Products",
                newName: "WarehouseId");

            migrationBuilder.RenameIndex(
                name: "IX_Products_InventoryId",
                table: "Products",
                newName: "IX_Products_WarehouseId");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Movement",
                newName: "MovementType");

            migrationBuilder.CreateTable(
                name: "Warehouses",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchId = table.Column<long>(type: "BIGINT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Warehouses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Warehouses_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProductWarehouseQuantities",
                columns: table => new
                {
                    ProductId = table.Column<long>(type: "BIGINT", nullable: false),
                    WarehouseId = table.Column<long>(type: "bigint", nullable: false),
                    Quantity = table.Column<decimal>(type: "DECIMAL(10,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductWarehouseQuantities", x => new { x.ProductId, x.WarehouseId });
                    table.ForeignKey(
                        name: "FK_ProductWarehouseQuantities_Products_ProductId",
                        column: x => x.ProductId,
                        principalTable: "Products",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ProductWarehouseQuantities_Warehouses_WarehouseId",
                        column: x => x.WarehouseId,
                        principalTable: "Warehouses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProductWarehouseQuantities_ProductId",
                table: "ProductWarehouseQuantities",
                column: "ProductId",
                unique: false);

            migrationBuilder.CreateIndex(
                name: "IX_ProductWarehouseQuantities_ProductId_WarehouseId",
                table: "ProductWarehouseQuantities",
                columns: new[] { "ProductId", "WarehouseId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ProductWarehouseQuantities_WarehouseId",
                table: "ProductWarehouseQuantities",
                column: "WarehouseId",
                unique: false);

            migrationBuilder.CreateIndex(
                name: "IX_Warehouses_BranchId",
                table: "Warehouses",
                column: "BranchId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Warehouses_WarehouseId",
                table: "Products",
                column: "WarehouseId",
                principalTable: "Warehouses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_Warehouses_WarehouseId",
                table: "Products");

            migrationBuilder.DropTable(
                name: "ProductWarehouseQuantities");

            migrationBuilder.DropTable(
                name: "Warehouses");

            migrationBuilder.RenameColumn(
                name: "WarehouseId",
                table: "Products",
                newName: "InventoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Products_WarehouseId",
                table: "Products",
                newName: "IX_Products_InventoryId");

            migrationBuilder.RenameColumn(
                name: "MovementType",
                table: "Movement",
                newName: "Type");

            migrationBuilder.CreateTable(
                name: "Inventory",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    BranchId = table.Column<long>(type: "BIGINT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Inventory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Inventory_Branches_BranchId",
                        column: x => x.BranchId,
                        principalTable: "Branches",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Inventory_BranchId",
                table: "Inventory",
                column: "BranchId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Products_Inventory_InventoryId",
                table: "Products",
                column: "InventoryId",
                principalTable: "Inventory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

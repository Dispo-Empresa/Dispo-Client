using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dispo.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class PR96 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Companies_Addresses_AdressId",
                table: "Companies");

            migrationBuilder.DropForeignKey(
                name: "FK_Suppliers_Addresses_AdressId",
                table: "Suppliers");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Addresses_AdressId",
                table: "Users");

            migrationBuilder.DropForeignKey(
                name: "FK_Warehouses_Addresses_AdressId",
                table: "Warehouses");

            migrationBuilder.RenameColumn(
                name: "AdressId",
                table: "Warehouses",
                newName: "AddressId");

            migrationBuilder.RenameIndex(
                name: "IX_Warehouses_AdressId",
                table: "Warehouses",
                newName: "IX_Warehouses_AddressId");

            migrationBuilder.RenameColumn(
                name: "AdressId",
                table: "Users",
                newName: "AddressId");

            migrationBuilder.RenameIndex(
                name: "IX_Users_AdressId",
                table: "Users",
                newName: "IX_Users_AddressId");

            migrationBuilder.RenameColumn(
                name: "AdressId",
                table: "Suppliers",
                newName: "AddressId");

            migrationBuilder.RenameIndex(
                name: "IX_Suppliers_AdressId",
                table: "Suppliers",
                newName: "IX_Suppliers_AddressId");

            migrationBuilder.RenameColumn(
                name: "AdressId",
                table: "Companies",
                newName: "AddressId");

            migrationBuilder.RenameIndex(
                name: "IX_Companies_AdressId",
                table: "Companies",
                newName: "IX_Companies_AddressId");

            migrationBuilder.AddForeignKey(
                name: "FK_Companies_Addresses_AddressId",
                table: "Companies",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Suppliers_Addresses_AddressId",
                table: "Suppliers",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Addresses_AddressId",
                table: "Users",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Warehouses_Addresses_AddressId",
                table: "Warehouses",
                column: "AddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Companies_Addresses_AddressId",
                table: "Companies");

            migrationBuilder.DropForeignKey(
                name: "FK_Suppliers_Addresses_AddressId",
                table: "Suppliers");

            migrationBuilder.DropForeignKey(
                name: "FK_Users_Addresses_AddressId",
                table: "Users");

            migrationBuilder.DropForeignKey(
                name: "FK_Warehouses_Addresses_AddressId",
                table: "Warehouses");

            migrationBuilder.RenameColumn(
                name: "AddressId",
                table: "Warehouses",
                newName: "AdressId");

            migrationBuilder.RenameIndex(
                name: "IX_Warehouses_AddressId",
                table: "Warehouses",
                newName: "IX_Warehouses_AdressId");

            migrationBuilder.RenameColumn(
                name: "AddressId",
                table: "Users",
                newName: "AdressId");

            migrationBuilder.RenameIndex(
                name: "IX_Users_AddressId",
                table: "Users",
                newName: "IX_Users_AdressId");

            migrationBuilder.RenameColumn(
                name: "AddressId",
                table: "Suppliers",
                newName: "AdressId");

            migrationBuilder.RenameIndex(
                name: "IX_Suppliers_AddressId",
                table: "Suppliers",
                newName: "IX_Suppliers_AdressId");

            migrationBuilder.RenameColumn(
                name: "AddressId",
                table: "Companies",
                newName: "AdressId");

            migrationBuilder.RenameIndex(
                name: "IX_Companies_AddressId",
                table: "Companies",
                newName: "IX_Companies_AdressId");

            migrationBuilder.AddForeignKey(
                name: "FK_Companies_Addresses_AdressId",
                table: "Companies",
                column: "AdressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Suppliers_Addresses_AdressId",
                table: "Suppliers",
                column: "AdressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Addresses_AdressId",
                table: "Users",
                column: "AdressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Warehouses_Addresses_AdressId",
                table: "Warehouses",
                column: "AdressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

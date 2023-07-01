using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Dispo.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class PR87CamposNaoObrigatorios : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Logo",
                table: "PurchaseOrderAttachments",
                newName: "Attatchment");

            migrationBuilder.AlterColumn<byte[]>(
                name: "Attatchment",
                table: "PurchaseOrderAttachments",
                type: "varbinary(max)",
                nullable: false,
                oldClrType: typeof(byte[]),
                oldType: "image");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Attatchment",
                table: "PurchaseOrderAttachments",
                newName: "Logo");

            migrationBuilder.AlterColumn<byte[]>(
                name: "Logo",
                table: "PurchaseOrderAttachments",
                type: "image",
                nullable: false,
                oldClrType: typeof(byte[]),
                oldType: "varbinary(max)");
        }
    }
}

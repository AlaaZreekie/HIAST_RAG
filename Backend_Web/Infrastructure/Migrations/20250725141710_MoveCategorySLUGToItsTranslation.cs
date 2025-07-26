using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class MoveCategorySLUGToItsTranslation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "slug",
                table: "categories");

            migrationBuilder.AddColumn<string>(
                name: "slug",
                table: "category_translations",
                type: "nvarchar(100)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "slug",
                table: "category_translations");

            migrationBuilder.AddColumn<string>(
                name: "slug",
                table: "categories",
                type: "nvarchar(100)",
                nullable: false,
                defaultValue: "");
        }
    }
}

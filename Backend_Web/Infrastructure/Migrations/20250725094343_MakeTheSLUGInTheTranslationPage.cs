using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class MakeTheSLUGInTheTranslationPage : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "slug",
                table: "pages");

            migrationBuilder.AddColumn<string>(
                name: "slug",
                table: "page_translations",
                type: "nvarchar(255)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "slug",
                table: "page_translations");

            migrationBuilder.AddColumn<string>(
                name: "slug",
                table: "pages",
                type: "nvarchar(200)",
                nullable: false,
                defaultValue: "");
        }
    }
}

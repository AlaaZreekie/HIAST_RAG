using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddTranslationToLocation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "address",
                table: "locations");

            migrationBuilder.DropColumn(
                name: "name",
                table: "locations");

            migrationBuilder.AddColumn<string>(
                name: "location_code",
                table: "locations",
                type: "nvarchar(40)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "location_translations",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    name = table.Column<string>(type: "nvarchar(200)", nullable: false),
                    address = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    location_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    language_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_location_translations", x => x.id);
                    table.ForeignKey(
                        name: "FK_location_translations_languages_language_id",
                        column: x => x.language_id,
                        principalTable: "languages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_location_translations_locations_location_id",
                        column: x => x.location_id,
                        principalTable: "locations",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_location_translations_language_id",
                table: "location_translations",
                column: "language_id");

            migrationBuilder.CreateIndex(
                name: "IX_location_translations_location_id_language_id",
                table: "location_translations",
                columns: new[] { "location_id", "language_id" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "location_translations");

            migrationBuilder.DropColumn(
                name: "location_code",
                table: "locations");

            migrationBuilder.AddColumn<string>(
                name: "address",
                table: "locations",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "name",
                table: "locations",
                type: "nvarchar(200)",
                nullable: false,
                defaultValue: "");
        }
    }
}

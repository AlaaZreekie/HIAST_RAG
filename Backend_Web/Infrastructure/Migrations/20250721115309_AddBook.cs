using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddBook : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "books",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    author = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    publication_year = table.Column<int>(type: "int", nullable: false),
                    isbn = table.Column<string>(type: "nvarchar(20)", nullable: true),
                    cover_image_media_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    file_media_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_books", x => x.id);
                    table.ForeignKey(
                        name: "FK_books_media_cover_image_media_id",
                        column: x => x.cover_image_media_id,
                        principalTable: "media",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_books_media_file_media_id",
                        column: x => x.file_media_id,
                        principalTable: "media",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "book_translations",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    title = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    book_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    language_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_book_translations", x => x.id);
                    table.ForeignKey(
                        name: "FK_book_translations_books_book_id",
                        column: x => x.book_id,
                        principalTable: "books",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_book_translations_languages_language_id",
                        column: x => x.language_id,
                        principalTable: "languages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_book_translations_book_id_language_id",
                table: "book_translations",
                columns: new[] { "book_id", "language_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_book_translations_language_id",
                table: "book_translations",
                column: "language_id");

            migrationBuilder.CreateIndex(
                name: "IX_books_cover_image_media_id",
                table: "books",
                column: "cover_image_media_id");

            migrationBuilder.CreateIndex(
                name: "IX_books_file_media_id",
                table: "books",
                column: "file_media_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "book_translations");

            migrationBuilder.DropTable(
                name: "books");
        }
    }
}

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddFaqTraining : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "faq_categories",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_faq_categories", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "training_course_categories",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_training_course_categories", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "faq_category_translations",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    name = table.Column<string>(type: "nvarchar(150)", nullable: false),
                    faq_category_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    language_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_faq_category_translations", x => x.id);
                    table.ForeignKey(
                        name: "FK_faq_category_translations_faq_categories_faq_category_id",
                        column: x => x.faq_category_id,
                        principalTable: "faq_categories",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_faq_category_translations_languages_language_id",
                        column: x => x.language_id,
                        principalTable: "languages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "faqs",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    display_order = table.Column<int>(type: "int", nullable: false, defaultValue: 0),
                    faq_category_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_faqs", x => x.id);
                    table.ForeignKey(
                        name: "FK_faqs_faq_categories_faq_category_id",
                        column: x => x.faq_category_id,
                        principalTable: "faq_categories",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "training_course_category_translations",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    name = table.Column<string>(type: "nvarchar(150)", nullable: false),
                    training_course_category_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    language_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_training_course_category_translations", x => x.id);
                    table.ForeignKey(
                        name: "FK_training_course_category_translations_languages_language_id",
                        column: x => x.language_id,
                        principalTable: "languages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_training_course_category_translations_training_course_categories_training_course_category_id",
                        column: x => x.training_course_category_id,
                        principalTable: "training_course_categories",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "training_courses",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    course_code = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    duration_hours = table.Column<int>(type: "int", nullable: false),
                    number_of_sessions = table.Column<int>(type: "int", nullable: false),
                    target_audience = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    year = table.Column<int>(type: "int", nullable: false),
                    training_course_category_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_training_courses", x => x.id);
                    table.ForeignKey(
                        name: "FK_training_courses_training_course_categories_training_course_category_id",
                        column: x => x.training_course_category_id,
                        principalTable: "training_course_categories",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "faq_translations",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    question = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    answer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    faq_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    language_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_faq_translations", x => x.id);
                    table.ForeignKey(
                        name: "FK_faq_translations_faqs_faq_id",
                        column: x => x.faq_id,
                        principalTable: "faqs",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_faq_translations_languages_language_id",
                        column: x => x.language_id,
                        principalTable: "languages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "training_course_translations",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    title = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    training_course_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    language_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_training_course_translations", x => x.id);
                    table.ForeignKey(
                        name: "FK_training_course_translations_languages_language_id",
                        column: x => x.language_id,
                        principalTable: "languages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_training_course_translations_training_courses_training_course_id",
                        column: x => x.training_course_id,
                        principalTable: "training_courses",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_faq_category_translations_faq_category_id_language_id",
                table: "faq_category_translations",
                columns: new[] { "faq_category_id", "language_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_faq_category_translations_language_id",
                table: "faq_category_translations",
                column: "language_id");

            migrationBuilder.CreateIndex(
                name: "IX_faq_translations_faq_id_language_id",
                table: "faq_translations",
                columns: new[] { "faq_id", "language_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_faq_translations_language_id",
                table: "faq_translations",
                column: "language_id");

            migrationBuilder.CreateIndex(
                name: "IX_faqs_faq_category_id",
                table: "faqs",
                column: "faq_category_id");

            migrationBuilder.CreateIndex(
                name: "IX_training_course_category_translations_language_id",
                table: "training_course_category_translations",
                column: "language_id");

            migrationBuilder.CreateIndex(
                name: "IX_training_course_category_translations_training_course_category_id_language_id",
                table: "training_course_category_translations",
                columns: new[] { "training_course_category_id", "language_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_training_course_translations_language_id",
                table: "training_course_translations",
                column: "language_id");

            migrationBuilder.CreateIndex(
                name: "IX_training_course_translations_training_course_id_language_id",
                table: "training_course_translations",
                columns: new[] { "training_course_id", "language_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_training_courses_training_course_category_id",
                table: "training_courses",
                column: "training_course_category_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "faq_category_translations");

            migrationBuilder.DropTable(
                name: "faq_translations");

            migrationBuilder.DropTable(
                name: "training_course_category_translations");

            migrationBuilder.DropTable(
                name: "training_course_translations");

            migrationBuilder.DropTable(
                name: "faqs");

            migrationBuilder.DropTable(
                name: "training_courses");

            migrationBuilder.DropTable(
                name: "faq_categories");

            migrationBuilder.DropTable(
                name: "training_course_categories");
        }
    }
}

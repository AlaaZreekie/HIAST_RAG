using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddAdmissionsStudentLifecycle : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "admissions",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    academic_year = table.Column<string>(type: "nvarchar(20)", nullable: false),
                    announcement_date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    deadline = table.Column<DateTime>(type: "datetime2", nullable: false),
                    program_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    location_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_admissions", x => x.id);
                    table.ForeignKey(
                        name: "FK_admissions_locations_location_id",
                        column: x => x.location_id,
                        principalTable: "locations",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_admissions_programs_program_id",
                        column: x => x.program_id,
                        principalTable: "programs",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "testimonials",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    graduate_name = table.Column<string>(type: "nvarchar(150)", nullable: false),
                    graduate_year = table.Column<int>(type: "int", nullable: false),
                    specialization_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    media_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_testimonials", x => x.id);
                    table.ForeignKey(
                        name: "FK_testimonials_media_media_id",
                        column: x => x.media_id,
                        principalTable: "media",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_testimonials_specializations_specialization_id",
                        column: x => x.specialization_id,
                        principalTable: "specializations",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "admission_exams",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    exam_date_time = table.Column<DateTime>(type: "datetime2", nullable: false),
                    admission_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_admission_exams", x => x.id);
                    table.ForeignKey(
                        name: "FK_admission_exams_admissions_admission_id",
                        column: x => x.admission_id,
                        principalTable: "admissions",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "admission_results",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    result_type = table.Column<string>(type: "nvarchar(50)", nullable: false),
                    admission_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    media_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_admission_results", x => x.id);
                    table.ForeignKey(
                        name: "FK_admission_results_admissions_admission_id",
                        column: x => x.admission_id,
                        principalTable: "admissions",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_admission_results_media_media_id",
                        column: x => x.media_id,
                        principalTable: "media",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "testimonial_translations",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    quote = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    testimonial_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    language_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_testimonial_translations", x => x.id);
                    table.ForeignKey(
                        name: "FK_testimonial_translations_languages_language_id",
                        column: x => x.language_id,
                        principalTable: "languages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_testimonial_translations_testimonials_testimonial_id",
                        column: x => x.testimonial_id,
                        principalTable: "testimonials",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "admission_exam_translations",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    exam_name = table.Column<string>(type: "nvarchar(200)", nullable: false),
                    notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    admission_exam_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    language_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_admission_exam_translations", x => x.id);
                    table.ForeignKey(
                        name: "FK_admission_exam_translations_admission_exams_admission_exam_id",
                        column: x => x.admission_exam_id,
                        principalTable: "admission_exams",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_admission_exam_translations_languages_language_id",
                        column: x => x.language_id,
                        principalTable: "languages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_admission_exam_translations_admission_exam_id_language_id",
                table: "admission_exam_translations",
                columns: new[] { "admission_exam_id", "language_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_admission_exam_translations_language_id",
                table: "admission_exam_translations",
                column: "language_id");

            migrationBuilder.CreateIndex(
                name: "IX_admission_exams_admission_id",
                table: "admission_exams",
                column: "admission_id");

            migrationBuilder.CreateIndex(
                name: "IX_admission_results_admission_id",
                table: "admission_results",
                column: "admission_id");

            migrationBuilder.CreateIndex(
                name: "IX_admission_results_media_id",
                table: "admission_results",
                column: "media_id");

            migrationBuilder.CreateIndex(
                name: "IX_admissions_location_id",
                table: "admissions",
                column: "location_id");

            migrationBuilder.CreateIndex(
                name: "IX_admissions_program_id",
                table: "admissions",
                column: "program_id");

            migrationBuilder.CreateIndex(
                name: "IX_testimonial_translations_language_id",
                table: "testimonial_translations",
                column: "language_id");

            migrationBuilder.CreateIndex(
                name: "IX_testimonial_translations_testimonial_id_language_id",
                table: "testimonial_translations",
                columns: new[] { "testimonial_id", "language_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_testimonials_media_id",
                table: "testimonials",
                column: "media_id");

            migrationBuilder.CreateIndex(
                name: "IX_testimonials_specialization_id",
                table: "testimonials",
                column: "specialization_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "admission_exam_translations");

            migrationBuilder.DropTable(
                name: "admission_results");

            migrationBuilder.DropTable(
                name: "testimonial_translations");

            migrationBuilder.DropTable(
                name: "admission_exams");

            migrationBuilder.DropTable(
                name: "testimonials");

            migrationBuilder.DropTable(
                name: "admissions");
        }
    }
}

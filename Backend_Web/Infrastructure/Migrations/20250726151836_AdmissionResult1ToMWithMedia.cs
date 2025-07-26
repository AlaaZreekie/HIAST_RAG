using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AdmissionResult1ToMWithMedia : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_admission_results_media_id",
                table: "admission_results");

            migrationBuilder.CreateIndex(
                name: "IX_admission_results_media_id",
                table: "admission_results",
                column: "media_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_admission_results_media_id",
                table: "admission_results");

            migrationBuilder.CreateIndex(
                name: "IX_admission_results_media_id",
                table: "admission_results",
                column: "media_id",
                unique: true);
        }
    }
}

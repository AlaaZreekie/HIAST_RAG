using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AdmisionResultUpdateOnDelete : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_admission_results_media_media_id",
                table: "admission_results");

            migrationBuilder.AddForeignKey(
                name: "FK_admission_results_media_media_id",
                table: "admission_results",
                column: "media_id",
                principalTable: "media",
                principalColumn: "id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_admission_results_media_media_id",
                table: "admission_results");

            migrationBuilder.AddForeignKey(
                name: "FK_admission_results_media_media_id",
                table: "admission_results",
                column: "media_id",
                principalTable: "media",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

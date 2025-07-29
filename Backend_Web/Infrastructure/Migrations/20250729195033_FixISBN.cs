using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class FixISBN : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_testimonials_specializations_specialization_id",
                table: "testimonials");

            migrationBuilder.DropIndex(
                name: "IX_testimonials_specialization_id",
                table: "testimonials");

            migrationBuilder.DropColumn(
                name: "specialization_id",
                table: "testimonials");

            migrationBuilder.AlterColumn<string>(
                name: "isbn",
                table: "books",
                type: "nvarchar(209)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "specialization_id",
                table: "testimonials",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<string>(
                name: "isbn",
                table: "books",
                type: "nvarchar(20)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(209)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_testimonials_specialization_id",
                table: "testimonials",
                column: "specialization_id");

            migrationBuilder.AddForeignKey(
                name: "FK_testimonials_specializations_specialization_id",
                table: "testimonials",
                column: "specialization_id",
                principalTable: "specializations",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

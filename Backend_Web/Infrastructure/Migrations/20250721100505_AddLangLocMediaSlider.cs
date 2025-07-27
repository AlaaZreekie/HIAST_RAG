using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddLangLocMediaSlider : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_category_translations_Language_language_id",
                table: "category_translations");

            migrationBuilder.DropForeignKey(
                name: "FK_page_translations_Language_language_id",
                table: "page_translations");

            migrationBuilder.DropForeignKey(
                name: "FK_post_translations_Language_language_id",
                table: "post_translations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Language",
                table: "Language");

            migrationBuilder.RenameTable(
                name: "Language",
                newName: "languages");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "languages",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Code",
                table: "languages",
                newName: "code");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "languages",
                newName: "id");

            migrationBuilder.AlterColumn<string>(
                name: "name",
                table: "languages",
                type: "nvarchar(50)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "code",
                table: "languages",
                type: "nvarchar(10)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddPrimaryKey(
                name: "PK_languages",
                table: "languages",
                column: "id");

            migrationBuilder.CreateTable(
                name: "CourseGroup",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseGroup", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "locations",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    name = table.Column<string>(type: "nvarchar(200)", nullable: false),
                    address = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_locations", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "media_categories",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_media_categories", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "menus",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    location = table.Column<string>(type: "nvarchar(50)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_menus", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Program",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Duration = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Cost = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Currency = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Program", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Course",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CourseCode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Credits = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TheoreticalHours = table.Column<int>(type: "int", nullable: false),
                    PracticalHours = table.Column<int>(type: "int", nullable: false),
                    CourseGroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Course", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Course_CourseGroup_CourseGroupId",
                        column: x => x.CourseGroupId,
                        principalTable: "CourseGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CourseGroupTranslation",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CourseGroupId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LanguageId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseGroupTranslation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseGroupTranslation_CourseGroup_CourseGroupId",
                        column: x => x.CourseGroupId,
                        principalTable: "CourseGroup",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseGroupTranslation_languages_LanguageId",
                        column: x => x.LanguageId,
                        principalTable: "languages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "media",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    file_name = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    file_path = table.Column<string>(type: "nvarchar(500)", nullable: false),
                    file_type = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    media_category_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_media", x => x.id);
                    table.ForeignKey(
                        name: "FK_media_media_categories_media_category_id",
                        column: x => x.media_category_id,
                        principalTable: "media_categories",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "media_category_translations",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    name = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    media_category_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    language_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_media_category_translations", x => x.id);
                    table.ForeignKey(
                        name: "FK_media_category_translations_languages_language_id",
                        column: x => x.language_id,
                        principalTable: "languages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_media_category_translations_media_categories_media_category_id",
                        column: x => x.media_category_id,
                        principalTable: "media_categories",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "menu_items",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    link_url = table.Column<string>(type: "nvarchar(500)", nullable: false),
                    menu_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_menu_items", x => x.id);
                    table.ForeignKey(
                        name: "FK_menu_items_menus_menu_id",
                        column: x => x.menu_id,
                        principalTable: "menus",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProgramTranslation",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProgramId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LanguageId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProgramTranslation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProgramTranslation_Program_ProgramId",
                        column: x => x.ProgramId,
                        principalTable: "Program",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProgramTranslation_languages_LanguageId",
                        column: x => x.LanguageId,
                        principalTable: "languages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Specialization",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    DegreeType = table.Column<int>(type: "int", nullable: false),
                    ProgramId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LocationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Specialization", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Specialization_Program_ProgramId",
                        column: x => x.ProgramId,
                        principalTable: "Program",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Specialization_locations_LocationId",
                        column: x => x.LocationId,
                        principalTable: "locations",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CourseTranslation",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CourseId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LanguageId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseTranslation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseTranslation_Course_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Course",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CourseTranslation_languages_LanguageId",
                        column: x => x.LanguageId,
                        principalTable: "languages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "sliders",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    link_url = table.Column<string>(type: "nvarchar(500)", nullable: true),
                    media_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sliders", x => x.id);
                    table.ForeignKey(
                        name: "FK_sliders_media_media_id",
                        column: x => x.media_id,
                        principalTable: "media",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "menu_item_translations",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    title = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    menu_item_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    language_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_menu_item_translations", x => x.id);
                    table.ForeignKey(
                        name: "FK_menu_item_translations_languages_language_id",
                        column: x => x.language_id,
                        principalTable: "languages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_menu_item_translations_menu_items_menu_item_id",
                        column: x => x.menu_item_id,
                        principalTable: "menu_items",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Curriculum",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AcademicYear = table.Column<int>(type: "int", nullable: false),
                    Semester = table.Column<int>(type: "int", nullable: false),
                    CourseType = table.Column<int>(type: "int", nullable: false),
                    SpecializationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    CourseId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Curriculum", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Curriculum_Course_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Course",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Curriculum_Specialization_SpecializationId",
                        column: x => x.SpecializationId,
                        principalTable: "Specialization",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SpecializationTranslation",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    SpecializationId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LanguageId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SpecializationTranslation", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SpecializationTranslation_Specialization_SpecializationId",
                        column: x => x.SpecializationId,
                        principalTable: "Specialization",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SpecializationTranslation_languages_LanguageId",
                        column: x => x.LanguageId,
                        principalTable: "languages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "slider_translations",
                columns: table => new
                {
                    id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    title = table.Column<string>(type: "nvarchar(255)", nullable: false),
                    slider_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    language_id = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_slider_translations", x => x.id);
                    table.ForeignKey(
                        name: "FK_slider_translations_languages_language_id",
                        column: x => x.language_id,
                        principalTable: "languages",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_slider_translations_sliders_slider_id",
                        column: x => x.slider_id,
                        principalTable: "sliders",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Course_CourseGroupId",
                table: "Course",
                column: "CourseGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseGroupTranslation_CourseGroupId",
                table: "CourseGroupTranslation",
                column: "CourseGroupId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseGroupTranslation_LanguageId",
                table: "CourseGroupTranslation",
                column: "LanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseTranslation_CourseId",
                table: "CourseTranslation",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseTranslation_LanguageId",
                table: "CourseTranslation",
                column: "LanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_Curriculum_CourseId",
                table: "Curriculum",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_Curriculum_SpecializationId",
                table: "Curriculum",
                column: "SpecializationId");

            migrationBuilder.CreateIndex(
                name: "IX_media_media_category_id",
                table: "media",
                column: "media_category_id");

            migrationBuilder.CreateIndex(
                name: "IX_media_category_translations_language_id",
                table: "media_category_translations",
                column: "language_id");

            migrationBuilder.CreateIndex(
                name: "IX_media_category_translations_media_category_id_language_id",
                table: "media_category_translations",
                columns: new[] { "media_category_id", "language_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_menu_item_translations_language_id",
                table: "menu_item_translations",
                column: "language_id");

            migrationBuilder.CreateIndex(
                name: "IX_menu_item_translations_menu_item_id_language_id",
                table: "menu_item_translations",
                columns: new[] { "menu_item_id", "language_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_menu_items_menu_id",
                table: "menu_items",
                column: "menu_id");

            migrationBuilder.CreateIndex(
                name: "IX_ProgramTranslation_LanguageId",
                table: "ProgramTranslation",
                column: "LanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_ProgramTranslation_ProgramId",
                table: "ProgramTranslation",
                column: "ProgramId");

            migrationBuilder.CreateIndex(
                name: "IX_slider_translations_language_id",
                table: "slider_translations",
                column: "language_id");

            migrationBuilder.CreateIndex(
                name: "IX_slider_translations_slider_id_language_id",
                table: "slider_translations",
                columns: new[] { "slider_id", "language_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_sliders_media_id",
                table: "sliders",
                column: "media_id");

            migrationBuilder.CreateIndex(
                name: "IX_Specialization_LocationId",
                table: "Specialization",
                column: "LocationId");

            migrationBuilder.CreateIndex(
                name: "IX_Specialization_ProgramId",
                table: "Specialization",
                column: "ProgramId");

            migrationBuilder.CreateIndex(
                name: "IX_SpecializationTranslation_LanguageId",
                table: "SpecializationTranslation",
                column: "LanguageId");

            migrationBuilder.CreateIndex(
                name: "IX_SpecializationTranslation_SpecializationId",
                table: "SpecializationTranslation",
                column: "SpecializationId");

            migrationBuilder.AddForeignKey(
                name: "FK_category_translations_languages_language_id",
                table: "category_translations",
                column: "language_id",
                principalTable: "languages",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_page_translations_languages_language_id",
                table: "page_translations",
                column: "language_id",
                principalTable: "languages",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_post_translations_languages_language_id",
                table: "post_translations",
                column: "language_id",
                principalTable: "languages",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_category_translations_languages_language_id",
                table: "category_translations");

            migrationBuilder.DropForeignKey(
                name: "FK_page_translations_languages_language_id",
                table: "page_translations");

            migrationBuilder.DropForeignKey(
                name: "FK_post_translations_languages_language_id",
                table: "post_translations");

            migrationBuilder.DropTable(
                name: "CourseGroupTranslation");

            migrationBuilder.DropTable(
                name: "CourseTranslation");

            migrationBuilder.DropTable(
                name: "Curriculum");

            migrationBuilder.DropTable(
                name: "media_category_translations");

            migrationBuilder.DropTable(
                name: "menu_item_translations");

            migrationBuilder.DropTable(
                name: "ProgramTranslation");

            migrationBuilder.DropTable(
                name: "slider_translations");

            migrationBuilder.DropTable(
                name: "SpecializationTranslation");

            migrationBuilder.DropTable(
                name: "Course");

            migrationBuilder.DropTable(
                name: "menu_items");

            migrationBuilder.DropTable(
                name: "sliders");

            migrationBuilder.DropTable(
                name: "Specialization");

            migrationBuilder.DropTable(
                name: "CourseGroup");

            migrationBuilder.DropTable(
                name: "menus");

            migrationBuilder.DropTable(
                name: "media");

            migrationBuilder.DropTable(
                name: "Program");

            migrationBuilder.DropTable(
                name: "locations");

            migrationBuilder.DropTable(
                name: "media_categories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_languages",
                table: "languages");

            migrationBuilder.RenameTable(
                name: "languages",
                newName: "Language");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "Language",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "code",
                table: "Language",
                newName: "Code");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Language",
                newName: "Id");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Language",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(50)");

            migrationBuilder.AlterColumn<int>(
                name: "Code",
                table: "Language",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Language",
                table: "Language",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_category_translations_Language_language_id",
                table: "category_translations",
                column: "language_id",
                principalTable: "Language",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_page_translations_Language_language_id",
                table: "page_translations",
                column: "language_id",
                principalTable: "Language",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_post_translations_Language_language_id",
                table: "post_translations",
                column: "language_id",
                principalTable: "Language",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

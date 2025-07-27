using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddProgramsSpecializationsCourses : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Course_CourseGroup_CourseGroupId",
                table: "Course");

            migrationBuilder.DropForeignKey(
                name: "FK_CourseGroupTranslation_CourseGroup_CourseGroupId",
                table: "CourseGroupTranslation");

            migrationBuilder.DropForeignKey(
                name: "FK_CourseGroupTranslation_languages_LanguageId",
                table: "CourseGroupTranslation");

            migrationBuilder.DropForeignKey(
                name: "FK_CourseTranslation_Course_CourseId",
                table: "CourseTranslation");

            migrationBuilder.DropForeignKey(
                name: "FK_CourseTranslation_languages_LanguageId",
                table: "CourseTranslation");

            migrationBuilder.DropForeignKey(
                name: "FK_Curriculum_Course_CourseId",
                table: "Curriculum");

            migrationBuilder.DropForeignKey(
                name: "FK_Curriculum_Specialization_SpecializationId",
                table: "Curriculum");

            migrationBuilder.DropForeignKey(
                name: "FK_ProgramTranslation_Program_ProgramId",
                table: "ProgramTranslation");

            migrationBuilder.DropForeignKey(
                name: "FK_ProgramTranslation_languages_LanguageId",
                table: "ProgramTranslation");

            migrationBuilder.DropForeignKey(
                name: "FK_Specialization_Program_ProgramId",
                table: "Specialization");

            migrationBuilder.DropForeignKey(
                name: "FK_Specialization_locations_LocationId",
                table: "Specialization");

            migrationBuilder.DropForeignKey(
                name: "FK_SpecializationTranslation_Specialization_SpecializationId",
                table: "SpecializationTranslation");

            migrationBuilder.DropForeignKey(
                name: "FK_SpecializationTranslation_languages_LanguageId",
                table: "SpecializationTranslation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Curriculum",
                table: "Curriculum");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SpecializationTranslation",
                table: "SpecializationTranslation");

            migrationBuilder.DropIndex(
                name: "IX_SpecializationTranslation_SpecializationId",
                table: "SpecializationTranslation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Specialization",
                table: "Specialization");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProgramTranslation",
                table: "ProgramTranslation");

            migrationBuilder.DropIndex(
                name: "IX_ProgramTranslation_ProgramId",
                table: "ProgramTranslation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Program",
                table: "Program");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CourseTranslation",
                table: "CourseTranslation");

            migrationBuilder.DropIndex(
                name: "IX_CourseTranslation_CourseId",
                table: "CourseTranslation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CourseGroupTranslation",
                table: "CourseGroupTranslation");

            migrationBuilder.DropIndex(
                name: "IX_CourseGroupTranslation_CourseGroupId",
                table: "CourseGroupTranslation");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CourseGroup",
                table: "CourseGroup");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Course",
                table: "Course");

            migrationBuilder.RenameTable(
                name: "Curriculum",
                newName: "curriculum");

            migrationBuilder.RenameTable(
                name: "SpecializationTranslation",
                newName: "specialization_translations");

            migrationBuilder.RenameTable(
                name: "Specialization",
                newName: "specializations");

            migrationBuilder.RenameTable(
                name: "ProgramTranslation",
                newName: "program_translations");

            migrationBuilder.RenameTable(
                name: "Program",
                newName: "programs");

            migrationBuilder.RenameTable(
                name: "CourseTranslation",
                newName: "course_translations");

            migrationBuilder.RenameTable(
                name: "CourseGroupTranslation",
                newName: "course_group_translations");

            migrationBuilder.RenameTable(
                name: "CourseGroup",
                newName: "course_groups");

            migrationBuilder.RenameTable(
                name: "Course",
                newName: "courses");

            migrationBuilder.RenameColumn(
                name: "Semester",
                table: "curriculum",
                newName: "semester");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "curriculum",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "SpecializationId",
                table: "curriculum",
                newName: "specialization_id");

            migrationBuilder.RenameColumn(
                name: "CourseType",
                table: "curriculum",
                newName: "course_type");

            migrationBuilder.RenameColumn(
                name: "CourseId",
                table: "curriculum",
                newName: "course_id");

            migrationBuilder.RenameColumn(
                name: "AcademicYear",
                table: "curriculum",
                newName: "academic_year");

            migrationBuilder.RenameIndex(
                name: "IX_Curriculum_SpecializationId",
                table: "curriculum",
                newName: "IX_curriculum_specialization_id");

            migrationBuilder.RenameIndex(
                name: "IX_Curriculum_CourseId",
                table: "curriculum",
                newName: "IX_curriculum_course_id");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "specialization_translations",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "specialization_translations",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "specialization_translations",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "SpecializationId",
                table: "specialization_translations",
                newName: "specialization_id");

            migrationBuilder.RenameColumn(
                name: "LanguageId",
                table: "specialization_translations",
                newName: "language_id");

            migrationBuilder.RenameIndex(
                name: "IX_SpecializationTranslation_LanguageId",
                table: "specialization_translations",
                newName: "IX_specialization_translations_language_id");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "specializations",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "ProgramId",
                table: "specializations",
                newName: "program_id");

            migrationBuilder.RenameColumn(
                name: "LocationId",
                table: "specializations",
                newName: "location_id");

            migrationBuilder.RenameColumn(
                name: "DegreeType",
                table: "specializations",
                newName: "degree_type");

            migrationBuilder.RenameIndex(
                name: "IX_Specialization_ProgramId",
                table: "specializations",
                newName: "IX_specializations_program_id");

            migrationBuilder.RenameIndex(
                name: "IX_Specialization_LocationId",
                table: "specializations",
                newName: "IX_specializations_location_id");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "program_translations",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "program_translations",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "program_translations",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "ProgramId",
                table: "program_translations",
                newName: "program_id");

            migrationBuilder.RenameColumn(
                name: "LanguageId",
                table: "program_translations",
                newName: "language_id");

            migrationBuilder.RenameIndex(
                name: "IX_ProgramTranslation_LanguageId",
                table: "program_translations",
                newName: "IX_program_translations_language_id");

            migrationBuilder.RenameColumn(
                name: "Duration",
                table: "programs",
                newName: "duration");

            migrationBuilder.RenameColumn(
                name: "Currency",
                table: "programs",
                newName: "currency");

            migrationBuilder.RenameColumn(
                name: "Cost",
                table: "programs",
                newName: "cost");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "programs",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "course_translations",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "course_translations",
                newName: "description");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "course_translations",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "LanguageId",
                table: "course_translations",
                newName: "language_id");

            migrationBuilder.RenameColumn(
                name: "CourseId",
                table: "course_translations",
                newName: "course_id");

            migrationBuilder.RenameIndex(
                name: "IX_CourseTranslation_LanguageId",
                table: "course_translations",
                newName: "IX_course_translations_language_id");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "course_group_translations",
                newName: "name");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "course_group_translations",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "LanguageId",
                table: "course_group_translations",
                newName: "language_id");

            migrationBuilder.RenameColumn(
                name: "CourseGroupId",
                table: "course_group_translations",
                newName: "course_group_id");

            migrationBuilder.RenameIndex(
                name: "IX_CourseGroupTranslation_LanguageId",
                table: "course_group_translations",
                newName: "IX_course_group_translations_language_id");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "course_groups",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "Credits",
                table: "courses",
                newName: "credits");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "courses",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "TheoreticalHours",
                table: "courses",
                newName: "theoretical_hours");

            migrationBuilder.RenameColumn(
                name: "PracticalHours",
                table: "courses",
                newName: "practical_hours");

            migrationBuilder.RenameColumn(
                name: "CourseGroupId",
                table: "courses",
                newName: "course_group_id");

            migrationBuilder.RenameColumn(
                name: "CourseCode",
                table: "courses",
                newName: "course_code");

            migrationBuilder.RenameIndex(
                name: "IX_Course_CourseGroupId",
                table: "courses",
                newName: "IX_courses_course_group_id");

            migrationBuilder.AlterColumn<string>(
                name: "course_type",
                table: "curriculum",
                type: "nvarchar(20)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "name",
                table: "specialization_translations",
                type: "nvarchar(200)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "description",
                table: "specialization_translations",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "degree_type",
                table: "specializations",
                type: "nvarchar(20)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "name",
                table: "program_translations",
                type: "nvarchar(200)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "description",
                table: "program_translations",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "duration",
                table: "programs",
                type: "nvarchar(50)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "currency",
                table: "programs",
                type: "nvarchar(10)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "name",
                table: "course_translations",
                type: "nvarchar(200)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "description",
                table: "course_translations",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<string>(
                name: "name",
                table: "course_group_translations",
                type: "nvarchar(100)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AlterColumn<decimal>(
                name: "credits",
                table: "courses",
                type: "decimal(3,1)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<string>(
                name: "course_code",
                table: "courses",
                type: "nvarchar(20)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_curriculum",
                table: "curriculum",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_specialization_translations",
                table: "specialization_translations",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_specializations",
                table: "specializations",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_program_translations",
                table: "program_translations",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_programs",
                table: "programs",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_course_translations",
                table: "course_translations",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_course_group_translations",
                table: "course_group_translations",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_course_groups",
                table: "course_groups",
                column: "id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_courses",
                table: "courses",
                column: "id");

            migrationBuilder.CreateIndex(
                name: "IX_specialization_translations_specialization_id_language_id",
                table: "specialization_translations",
                columns: new[] { "specialization_id", "language_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_program_translations_program_id_language_id",
                table: "program_translations",
                columns: new[] { "program_id", "language_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_course_translations_course_id_language_id",
                table: "course_translations",
                columns: new[] { "course_id", "language_id" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_course_group_translations_course_group_id_language_id",
                table: "course_group_translations",
                columns: new[] { "course_group_id", "language_id" },
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_course_group_translations_course_groups_course_group_id",
                table: "course_group_translations",
                column: "course_group_id",
                principalTable: "course_groups",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_course_group_translations_languages_language_id",
                table: "course_group_translations",
                column: "language_id",
                principalTable: "languages",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_course_translations_courses_course_id",
                table: "course_translations",
                column: "course_id",
                principalTable: "courses",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_course_translations_languages_language_id",
                table: "course_translations",
                column: "language_id",
                principalTable: "languages",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_courses_course_groups_course_group_id",
                table: "courses",
                column: "course_group_id",
                principalTable: "course_groups",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_curriculum_courses_course_id",
                table: "curriculum",
                column: "course_id",
                principalTable: "courses",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_curriculum_specializations_specialization_id",
                table: "curriculum",
                column: "specialization_id",
                principalTable: "specializations",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_program_translations_languages_language_id",
                table: "program_translations",
                column: "language_id",
                principalTable: "languages",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_program_translations_programs_program_id",
                table: "program_translations",
                column: "program_id",
                principalTable: "programs",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_specialization_translations_languages_language_id",
                table: "specialization_translations",
                column: "language_id",
                principalTable: "languages",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_specialization_translations_specializations_specialization_id",
                table: "specialization_translations",
                column: "specialization_id",
                principalTable: "specializations",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_specializations_locations_location_id",
                table: "specializations",
                column: "location_id",
                principalTable: "locations",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_specializations_programs_program_id",
                table: "specializations",
                column: "program_id",
                principalTable: "programs",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_course_group_translations_course_groups_course_group_id",
                table: "course_group_translations");

            migrationBuilder.DropForeignKey(
                name: "FK_course_group_translations_languages_language_id",
                table: "course_group_translations");

            migrationBuilder.DropForeignKey(
                name: "FK_course_translations_courses_course_id",
                table: "course_translations");

            migrationBuilder.DropForeignKey(
                name: "FK_course_translations_languages_language_id",
                table: "course_translations");

            migrationBuilder.DropForeignKey(
                name: "FK_courses_course_groups_course_group_id",
                table: "courses");

            migrationBuilder.DropForeignKey(
                name: "FK_curriculum_courses_course_id",
                table: "curriculum");

            migrationBuilder.DropForeignKey(
                name: "FK_curriculum_specializations_specialization_id",
                table: "curriculum");

            migrationBuilder.DropForeignKey(
                name: "FK_program_translations_languages_language_id",
                table: "program_translations");

            migrationBuilder.DropForeignKey(
                name: "FK_program_translations_programs_program_id",
                table: "program_translations");

            migrationBuilder.DropForeignKey(
                name: "FK_specialization_translations_languages_language_id",
                table: "specialization_translations");

            migrationBuilder.DropForeignKey(
                name: "FK_specialization_translations_specializations_specialization_id",
                table: "specialization_translations");

            migrationBuilder.DropForeignKey(
                name: "FK_specializations_locations_location_id",
                table: "specializations");

            migrationBuilder.DropForeignKey(
                name: "FK_specializations_programs_program_id",
                table: "specializations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_curriculum",
                table: "curriculum");

            migrationBuilder.DropPrimaryKey(
                name: "PK_specializations",
                table: "specializations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_specialization_translations",
                table: "specialization_translations");

            migrationBuilder.DropIndex(
                name: "IX_specialization_translations_specialization_id_language_id",
                table: "specialization_translations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_programs",
                table: "programs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_program_translations",
                table: "program_translations");

            migrationBuilder.DropIndex(
                name: "IX_program_translations_program_id_language_id",
                table: "program_translations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_courses",
                table: "courses");

            migrationBuilder.DropPrimaryKey(
                name: "PK_course_translations",
                table: "course_translations");

            migrationBuilder.DropIndex(
                name: "IX_course_translations_course_id_language_id",
                table: "course_translations");

            migrationBuilder.DropPrimaryKey(
                name: "PK_course_groups",
                table: "course_groups");

            migrationBuilder.DropPrimaryKey(
                name: "PK_course_group_translations",
                table: "course_group_translations");

            migrationBuilder.DropIndex(
                name: "IX_course_group_translations_course_group_id_language_id",
                table: "course_group_translations");

            migrationBuilder.RenameTable(
                name: "curriculum",
                newName: "Curriculum");

            migrationBuilder.RenameTable(
                name: "specializations",
                newName: "Specialization");

            migrationBuilder.RenameTable(
                name: "specialization_translations",
                newName: "SpecializationTranslation");

            migrationBuilder.RenameTable(
                name: "programs",
                newName: "Program");

            migrationBuilder.RenameTable(
                name: "program_translations",
                newName: "ProgramTranslation");

            migrationBuilder.RenameTable(
                name: "courses",
                newName: "Course");

            migrationBuilder.RenameTable(
                name: "course_translations",
                newName: "CourseTranslation");

            migrationBuilder.RenameTable(
                name: "course_groups",
                newName: "CourseGroup");

            migrationBuilder.RenameTable(
                name: "course_group_translations",
                newName: "CourseGroupTranslation");

            migrationBuilder.RenameColumn(
                name: "semester",
                table: "Curriculum",
                newName: "Semester");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Curriculum",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "specialization_id",
                table: "Curriculum",
                newName: "SpecializationId");

            migrationBuilder.RenameColumn(
                name: "course_type",
                table: "Curriculum",
                newName: "CourseType");

            migrationBuilder.RenameColumn(
                name: "course_id",
                table: "Curriculum",
                newName: "CourseId");

            migrationBuilder.RenameColumn(
                name: "academic_year",
                table: "Curriculum",
                newName: "AcademicYear");

            migrationBuilder.RenameIndex(
                name: "IX_curriculum_specialization_id",
                table: "Curriculum",
                newName: "IX_Curriculum_SpecializationId");

            migrationBuilder.RenameIndex(
                name: "IX_curriculum_course_id",
                table: "Curriculum",
                newName: "IX_Curriculum_CourseId");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Specialization",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "program_id",
                table: "Specialization",
                newName: "ProgramId");

            migrationBuilder.RenameColumn(
                name: "location_id",
                table: "Specialization",
                newName: "LocationId");

            migrationBuilder.RenameColumn(
                name: "degree_type",
                table: "Specialization",
                newName: "DegreeType");

            migrationBuilder.RenameIndex(
                name: "IX_specializations_program_id",
                table: "Specialization",
                newName: "IX_Specialization_ProgramId");

            migrationBuilder.RenameIndex(
                name: "IX_specializations_location_id",
                table: "Specialization",
                newName: "IX_Specialization_LocationId");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "SpecializationTranslation",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "SpecializationTranslation",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "SpecializationTranslation",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "specialization_id",
                table: "SpecializationTranslation",
                newName: "SpecializationId");

            migrationBuilder.RenameColumn(
                name: "language_id",
                table: "SpecializationTranslation",
                newName: "LanguageId");

            migrationBuilder.RenameIndex(
                name: "IX_specialization_translations_language_id",
                table: "SpecializationTranslation",
                newName: "IX_SpecializationTranslation_LanguageId");

            migrationBuilder.RenameColumn(
                name: "duration",
                table: "Program",
                newName: "Duration");

            migrationBuilder.RenameColumn(
                name: "currency",
                table: "Program",
                newName: "Currency");

            migrationBuilder.RenameColumn(
                name: "cost",
                table: "Program",
                newName: "Cost");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Program",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "ProgramTranslation",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "ProgramTranslation",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "ProgramTranslation",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "program_id",
                table: "ProgramTranslation",
                newName: "ProgramId");

            migrationBuilder.RenameColumn(
                name: "language_id",
                table: "ProgramTranslation",
                newName: "LanguageId");

            migrationBuilder.RenameIndex(
                name: "IX_program_translations_language_id",
                table: "ProgramTranslation",
                newName: "IX_ProgramTranslation_LanguageId");

            migrationBuilder.RenameColumn(
                name: "credits",
                table: "Course",
                newName: "Credits");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Course",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "theoretical_hours",
                table: "Course",
                newName: "TheoreticalHours");

            migrationBuilder.RenameColumn(
                name: "practical_hours",
                table: "Course",
                newName: "PracticalHours");

            migrationBuilder.RenameColumn(
                name: "course_group_id",
                table: "Course",
                newName: "CourseGroupId");

            migrationBuilder.RenameColumn(
                name: "course_code",
                table: "Course",
                newName: "CourseCode");

            migrationBuilder.RenameIndex(
                name: "IX_courses_course_group_id",
                table: "Course",
                newName: "IX_Course_CourseGroupId");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "CourseTranslation",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "description",
                table: "CourseTranslation",
                newName: "Description");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "CourseTranslation",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "language_id",
                table: "CourseTranslation",
                newName: "LanguageId");

            migrationBuilder.RenameColumn(
                name: "course_id",
                table: "CourseTranslation",
                newName: "CourseId");

            migrationBuilder.RenameIndex(
                name: "IX_course_translations_language_id",
                table: "CourseTranslation",
                newName: "IX_CourseTranslation_LanguageId");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "CourseGroup",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "name",
                table: "CourseGroupTranslation",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "CourseGroupTranslation",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "language_id",
                table: "CourseGroupTranslation",
                newName: "LanguageId");

            migrationBuilder.RenameColumn(
                name: "course_group_id",
                table: "CourseGroupTranslation",
                newName: "CourseGroupId");

            migrationBuilder.RenameIndex(
                name: "IX_course_group_translations_language_id",
                table: "CourseGroupTranslation",
                newName: "IX_CourseGroupTranslation_LanguageId");

            migrationBuilder.AlterColumn<int>(
                name: "CourseType",
                table: "Curriculum",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)");

            migrationBuilder.AlterColumn<int>(
                name: "DegreeType",
                table: "Specialization",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "SpecializationTranslation",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "SpecializationTranslation",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Duration",
                table: "Program",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(50)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Currency",
                table: "Program",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(10)");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "ProgramTranslation",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "ProgramTranslation",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "Credits",
                table: "Course",
                type: "decimal(18,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(3,1)");

            migrationBuilder.AlterColumn<string>(
                name: "CourseCode",
                table: "Course",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(20)");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "CourseTranslation",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "CourseTranslation",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "CourseGroupTranslation",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(100)");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Curriculum",
                table: "Curriculum",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Specialization",
                table: "Specialization",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SpecializationTranslation",
                table: "SpecializationTranslation",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Program",
                table: "Program",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProgramTranslation",
                table: "ProgramTranslation",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Course",
                table: "Course",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CourseTranslation",
                table: "CourseTranslation",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CourseGroup",
                table: "CourseGroup",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CourseGroupTranslation",
                table: "CourseGroupTranslation",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_SpecializationTranslation_SpecializationId",
                table: "SpecializationTranslation",
                column: "SpecializationId");

            migrationBuilder.CreateIndex(
                name: "IX_ProgramTranslation_ProgramId",
                table: "ProgramTranslation",
                column: "ProgramId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseTranslation_CourseId",
                table: "CourseTranslation",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_CourseGroupTranslation_CourseGroupId",
                table: "CourseGroupTranslation",
                column: "CourseGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_Course_CourseGroup_CourseGroupId",
                table: "Course",
                column: "CourseGroupId",
                principalTable: "CourseGroup",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseGroupTranslation_CourseGroup_CourseGroupId",
                table: "CourseGroupTranslation",
                column: "CourseGroupId",
                principalTable: "CourseGroup",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseGroupTranslation_languages_LanguageId",
                table: "CourseGroupTranslation",
                column: "LanguageId",
                principalTable: "languages",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseTranslation_Course_CourseId",
                table: "CourseTranslation",
                column: "CourseId",
                principalTable: "Course",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CourseTranslation_languages_LanguageId",
                table: "CourseTranslation",
                column: "LanguageId",
                principalTable: "languages",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Curriculum_Course_CourseId",
                table: "Curriculum",
                column: "CourseId",
                principalTable: "Course",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Curriculum_Specialization_SpecializationId",
                table: "Curriculum",
                column: "SpecializationId",
                principalTable: "Specialization",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProgramTranslation_Program_ProgramId",
                table: "ProgramTranslation",
                column: "ProgramId",
                principalTable: "Program",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProgramTranslation_languages_LanguageId",
                table: "ProgramTranslation",
                column: "LanguageId",
                principalTable: "languages",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Specialization_Program_ProgramId",
                table: "Specialization",
                column: "ProgramId",
                principalTable: "Program",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Specialization_locations_LocationId",
                table: "Specialization",
                column: "LocationId",
                principalTable: "locations",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SpecializationTranslation_Specialization_SpecializationId",
                table: "SpecializationTranslation",
                column: "SpecializationId",
                principalTable: "Specialization",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SpecializationTranslation_languages_LanguageId",
                table: "SpecializationTranslation",
                column: "LanguageId",
                principalTable: "languages",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

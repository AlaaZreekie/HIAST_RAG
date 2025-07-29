using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Domain.Entity.IdentityEntity;
using Infrastructure.Context;
using Domain.Entity.ApplicationEntity;
using Domain.Ennum;
using Domain.Common;
using Domain.Enum;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System;

namespace Infrastructure.Seeds
{
    public class DataSeeder(
        ApplicationDbContext context,
        RoleManager<ApplicationRole> roleManager,
        UserManager<ApplicationUser> userManager)
    {
        private readonly ApplicationDbContext _appDbContext = context;
        private readonly UserManager<ApplicationUser> _userManager = userManager;
        private readonly RoleManager<ApplicationRole> _roleManager = roleManager;

        /// <summary>
        /// Main method to orchestrate the entire seeding process in the correct order.
        /// </summary>
        public void SeedData()
        {
            // Step 1: Seed core identity and languages. These have no dependencies.
            SeedCoreIdentityAndLanguages();
            
            // Step 2: Save changes to ensure the above entities get IDs from the database.
            // This is CRITICAL for all subsequent steps that rely on LanguageId or UserId.
            _appDbContext.SaveChanges();
            var placeholderMedia = SeedPlaceholderMediaAndSaveChanges();

            // Step 3: Seed foundational application data.
            SeedMedia();
            SeedAcademicStructure();
            
            // Step 4: Save again to ensure academic structures (Programs, Locations, Courses) have IDs.
            // This is needed for linkers like Curriculum and Admissions.
            _appDbContext.SaveChanges();

            // Step 5: Seed the rest of the data which depends on the foundational data.
            SeedDependentEntities( placeholderMedia);

            // Step 6: Final save for all remaining changes.
            _appDbContext.SaveChanges();
        }

        #region Seeding Helper Methods

        /// <summary>
        /// Seeds Languages, Roles, and the default Admin User.
        /// </summary>
        private void SeedCoreIdentityAndLanguages()
        {
            // LangSeeding
            if (!_appDbContext.Languages.Any())
            {
                var languages = new List<Language>
                {
                    new() { Id = Guid.NewGuid(), Code = LanguageCodeEnum.AR, Name = "Arabic" },
                    new() { Id = Guid.NewGuid(), Code = LanguageCodeEnum.EN, Name = "English" }
                };
                _appDbContext.Languages.AddRange(languages);
            }

            // RoleSeeding
            if (!_appDbContext.Roles.Any())
            {
                var roles = new List<ApplicationRole>
                {
                    new() { Name = DefaultSetting.UserRoleName },
                    new() { Name = DefaultSetting.EmployeeRoleName },
                    new() { Name = DefaultSetting.AdminRoleName },
                    new() { Name = DefaultSetting.CustomerRoleName }
                };
                foreach (var role in roles)
                {
                    _roleManager.CreateAsync(role).GetAwaiter().GetResult();
                }
            }

            // UserSeeding
            if (!_appDbContext.Users.Any(u => u.Email == DefaultSetting.DefaultAdminOneEmail))
            {
                var adminUser = new ApplicationUser
                {
                    Email = DefaultSetting.DefaultAdminOneEmail,
                    UserName = DefaultSetting.DefaultAdminOneUserName,
                    PhoneNumber = DefaultSetting.DefaultAdminOnePhone,
                    PhoneNumberConfirmed = true,
                };

                var result = _userManager.CreateAsync(adminUser, DefaultSetting.DefaultAdminPassword).GetAwaiter().GetResult();
                if (result.Succeeded)
                {
                    _userManager.AddToRoleAsync(adminUser, DefaultSetting.AdminRoleName).GetAwaiter().GetResult();
                    var code = _userManager.GenerateEmailConfirmationTokenAsync(adminUser).GetAwaiter().GetResult();
                    _userManager.ConfirmEmailAsync(adminUser, code).GetAwaiter().GetResult();
                }
            }
        }

        /// <summary>
        /// Seeds all Media Categories and Media files. Must run before any entity that needs a MediaId.
        /// </summary>
        private void SeedMedia()
        {
            if (_appDbContext.Media.Any()) return;

            var arabicLang = _appDbContext.Languages.Single(l => l.Code == LanguageCodeEnum.AR);
            var englishLang = _appDbContext.Languages.Single(l => l.Code == LanguageCodeEnum.EN);

            var publicationsCategory = new MediaCategory { Translations = new List<MediaCategoryTranslation> { new() { LanguageId = arabicLang.Id, Name = "نشرات علمية" }, new() { LanguageId = englishLang.Id, Name = "Scientific Publications" } } };
            var sliderCategory = new MediaCategory { Translations = new List<MediaCategoryTranslation> { new() { LanguageId = arabicLang.Id, Name = "صور السلايدر" }, new() { LanguageId = englishLang.Id, Name = "Slider Images" } } };
            var trainingDocsCategory = new MediaCategory { Translations = new List<MediaCategoryTranslation> { new() { LanguageId = arabicLang.Id, Name = "وثائق التدريب" }, new() { LanguageId = englishLang.Id, Name = "Training Documents" } } };
            var examArchiveCategory = new MediaCategory { Translations = new List<MediaCategoryTranslation> { new() { LanguageId = arabicLang.Id, Name = "أرشيف امتحانات القبول" }, new() { LanguageId = englishLang.Id, Name = "Admission Exam Archive" } } };
            var admissionDocsCategory = new MediaCategory { Translations = new List<MediaCategoryTranslation> { new() { LanguageId = arabicLang.Id, Name = "وثائق القبول" }, new() { LanguageId = englishLang.Id, Name = "Admission Documents" } } };
            var partnerLogosCategory = new MediaCategory { Translations = new List<MediaCategoryTranslation> { new() { LanguageId = arabicLang.Id, Name = "شعارات الشركاء" }, new() { LanguageId = englishLang.Id, Name = "Partner Logos" } } };
            var bookCoversCategory = new MediaCategory { Translations = new List<MediaCategoryTranslation> { new() { LanguageId = arabicLang.Id, Name = "أغلفة كتب" }, new() { LanguageId = englishLang.Id, Name = "Book Covers" } } };
            _appDbContext.MediaCategories.AddRange(publicationsCategory, sliderCategory, trainingDocsCategory, examArchiveCategory, admissionDocsCategory, partnerLogosCategory, bookCoversCategory);

            var allMedia = new List<Media>();
            for (int i = 1; i <= 10; i++)
            {
                allMedia.Add(new Media { FileName = $"publication_{i}.pdf", FilePath = $"/media/publications/publication_{i}.pdf", FileType = "application/pdf", MediaCategory = publicationsCategory });
            }
            allMedia.Add(new Media { FileName = "training_plan_2024.pdf", FilePath = "/media/docs/training_plan_2024.pdf", FileType = "application/pdf", MediaCategory = trainingDocsCategory });
            allMedia.AddRange(new List<Media>
            {
                new() { FileName = "test-math-2023-part1.pdf", FilePath = "/media/exams/test-math-2023-part1.pdf", FileType = "application/pdf", MediaCategory = examArchiveCategory },
                new() { FileName = "test-math-2023-part2.pdf", FilePath = "/media/exams/test-math-2023-part2.pdf", FileType = "application/pdf", MediaCategory = examArchiveCategory },
                new() { FileName = "test-physics-2022.pdf", FilePath = "/media/exams/test-physics-2022.pdf", FileType = "application/pdf", MediaCategory = examArchiveCategory },
                new() { FileName = "test-iq-2021.pdf", FilePath = "/media/exams/test-iq-2021.pdf", FileType = "application/pdf", MediaCategory = examArchiveCategory },
                new() { FileName = "word_excel_course_banner.png", FilePath = "/media/sliders/word_excel_course_banner.png", FileType = "image/png", MediaCategory = sliderCategory },
                new() { FileName = "numerical_methods.jpg", FilePath = "/media/covers/numerical_methods.jpg", FileType = "image/jpeg", MediaCategory = bookCoversCategory },
                new() { FileName = "numerical_methods_v2.jpg", FilePath = "/media/covers/numerical_methods_v2.jpg", FileType = "image/jpeg", MediaCategory = bookCoversCategory },
                new() { FileName = "machine_elements_v1.jpg", FilePath = "/media/covers/machine_elements_v1.jpg", FileType = "image/jpeg", MediaCategory = bookCoversCategory },
                new() { FileName = "machine_elements_v2.jpg", FilePath = "/media/covers/machine_elements_v2.jpg", FileType = "image/jpeg", MediaCategory = bookCoversCategory },
                new() { FileName = "thermodynamics.jpg", FilePath = "/media/covers/thermodynamics.jpg", FileType = "image/jpeg", MediaCategory = bookCoversCategory },
                new() { FileName = "water_chemistry.jpg", FilePath = "/media/covers/water_chemistry.jpg", FileType = "image/jpeg", MediaCategory = bookCoversCategory },
                new() { FileName = "aqueous_solutions.jpg", FilePath = "/media/covers/aqueous_solutions.jpg", FileType = "image/jpeg", MediaCategory = bookCoversCategory },
                new() { FileName = "solid_mechanics.jpg", FilePath = "/media/covers/solid_mechanics.jpg", FileType = "image/jpeg", MediaCategory = bookCoversCategory },
                new() { FileName = "manara_university_logo.png", FilePath = "/media/logos/manara_university_logo.png", FileType = "image/png", MediaCategory = partnerLogosCategory },
                new() { FileName = "damascus_university_logo.png", FilePath = "/media/logos/damascus_university_logo.png", FileType = "image/png", MediaCategory = partnerLogosCategory },
                new() { FileName = "tishreen_university_logo.png", FilePath = "/media/logos/tishreen_university_logo.png", FileType = "image/png", MediaCategory = partnerLogosCategory },
                new() { FileName = "aleppo_university_logo.png", FilePath = "/media/logos/aleppo_university_logo.png", FileType = "image/png", MediaCategory = partnerLogosCategory },
                new() { FileName = "distinction_creativity_agency_logo.png", FilePath = "/media/logos/distinction_creativity_agency_logo.png", FileType = "image/png", MediaCategory = partnerLogosCategory },
                new() { FileName = "svu_logo.png", FilePath = "/media/logos/svu_logo.png", FileType = "image/png", MediaCategory = partnerLogosCategory },
                new() { FileName = "syrian_telecom_logo.png", FilePath = "/media/logos/syrian_telecom_logo.png", FileType = "image/png", MediaCategory = partnerLogosCategory },
                new() { FileName = "hbt_logo.png", FilePath = "/media/logos/hbt_logo.png", FileType = "image/png", MediaCategory = partnerLogosCategory },
                new() { FileName = "gcsar_logo.png", FilePath = "/media/logos/gcsar_logo.png", FileType = "image/png", MediaCategory = partnerLogosCategory },
                new() { FileName = "albaath_university_logo.png", FilePath = "/media/logos/albaath_university_logo.png", FileType = "image/png", MediaCategory = partnerLogosCategory },
                new() { FileName = "hama_university_logo.png", FilePath = "/media/logos/hama_university_logo.png", FileType = "image/png", MediaCategory = partnerLogosCategory },
                new() { FileName = "network_services_agency_logo.png", FilePath = "/media/logos/network_services_agency_logo.png", FileType = "image/png", MediaCategory = partnerLogosCategory },
                new() { FileName = "national_center_for_biotechnology_logo.png", FilePath = "/media/logos/national_center_for_biotechnology_logo.png", FileType = "image/png", MediaCategory = partnerLogosCategory },
                new() { FileName = "syrian_scientific_society_logo.png", FilePath = "/media/logos/syrian_scientific_society_logo.png", FileType = "image/png", MediaCategory = partnerLogosCategory },
                new() { FileName = "nerc_logo.png", FilePath = "/media/logos/nerc_logo.png", FileType = "image/png", MediaCategory = partnerLogosCategory },
                new() { FileName = "sham_private_university_logo.png", FilePath = "/media/logos/sham_private_university_logo.png", FileType = "image/png", MediaCategory = partnerLogosCategory },
                new() { FileName = "jpu_logo.png", FilePath = "/media/logos/jpu_logo.png", FileType = "image/png", MediaCategory = partnerLogosCategory },
                new() { FileName = "phd_control_system.pdf", FilePath = "/media/docs/phd_control_system.pdf", FileType = "application/pdf", MediaCategory = admissionDocsCategory },
                new() { FileName = "new_education_system_clarification.pdf", FilePath = "/media/docs/new_education_system_clarification.pdf", FileType = "application/pdf", MediaCategory = admissionDocsCategory },
                new() { FileName = "phd_research_proposal_template.docx", FilePath = "/media/docs/phd_research_proposal_template.docx", FileType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document", MediaCategory = admissionDocsCategory },
                new() { FileName = "phd_registration_form_2025.doc", FilePath = "/media/docs/phd_registration_form_2025.doc", FileType = "application/msword", MediaCategory = admissionDocsCategory },
                new() { FileName = "materials_admission_system.pdf", FilePath = "/media/docs/materials_admission_system.pdf", FileType = "application/pdf", MediaCategory = admissionDocsCategory },
                new() { FileName = "masters_registration_form_2025.doc", FilePath = "/media/docs/masters_registration_form_2025.doc", FileType = "application/msword", MediaCategory = admissionDocsCategory },
                new() { FileName = "masters_registration_form_control_robotics_2025.doc", FilePath = "/media/docs/masters_registration_form_control_robotics_2025.doc", FileType = "application/msword", MediaCategory = admissionDocsCategory }
            });

            _appDbContext.Media.AddRange(allMedia);
        }

        /// <summary>
        /// Seeds Locations, Programs, CourseGroups, Courses, and Specializations.
        /// </summary>
        private void SeedAcademicStructure()
        {
            if (_appDbContext.Specializations.Any()) return;

            var arabicLang = _appDbContext.Languages.Single(l => l.Code == LanguageCodeEnum.AR);
            var englishLang = _appDbContext.Languages.Single(l => l.Code == LanguageCodeEnum.EN);

            var damascusLocation = new Location { LocationCode = LocationCodeEnum.DAMAS, Translations = new List<LocationTranslation> { new() { LanguageId = arabicLang.Id, Name = "دمشق" }, new() { LanguageId = englishLang.Id, Name = "Damascus" } } };
            var aleppoLocation = new Location { LocationCode = LocationCodeEnum.ALEPPO, Translations = new List<LocationTranslation> { new() { LanguageId = arabicLang.Id, Name = "حلب" }, new() { LanguageId = englishLang.Id, Name = "Aleppo" } } };
            var engineeringProgram = new Program { Duration = "5 years", Translations = new List<ProgramTranslation> { new() { LanguageId = arabicLang.Id, Name = "برنامج التأهيل الهندسي", Description = "..." }, new() { LanguageId = englishLang.Id, Name = "Engineering Qualification Program", Description = "..." } } };
            var postgradProgram = new Program { Duration = "2-3 years", Translations = new List<ProgramTranslation> { new() { LanguageId = arabicLang.Id, Name = "برنامج الدراسات العليا" }, new() { LanguageId = englishLang.Id, Name = "Postgraduate Studies Program" } } };
            _appDbContext.Locations.AddRange(damascusLocation, aleppoLocation);
            _appDbContext.Programs.AddRange(engineeringProgram, postgradProgram);

            var courseGroups = new List<CourseGroup>
            {
                new() { CourseGroupCode = CourseGroupCodeEnum.MTH, Translations = new List<CourseGroupTranslation> { new() { LanguageId = arabicLang.Id, Name = "الرياضيات" }, new() { LanguageId = englishLang.Id, Name = "Mathematics" } } },
                new() { CourseGroupCode = CourseGroupCodeEnum.PHY, Translations = new List<CourseGroupTranslation> { new() { LanguageId = arabicLang.Id, Name = "الفيزياء" }, new() { LanguageId = englishLang.Id, Name = "Physics" } } },
                new() { CourseGroupCode = CourseGroupCodeEnum.ELC, Translations = new List<CourseGroupTranslation> { new() { LanguageId = arabicLang.Id, Name = "النظم الإلكترونية" }, new() { LanguageId = englishLang.Id, Name = "Electronic Systems" } } },
                new() { CourseGroupCode = CourseGroupCodeEnum.SWE, Translations = new List<CourseGroupTranslation> { new() { LanguageId = arabicLang.Id, Name = "هندسة البرمجيات" }, new() { LanguageId = englishLang.Id, Name = "Software Engineering" } } },
                new() { CourseGroupCode = CourseGroupCodeEnum.AIN, Translations = new List<CourseGroupTranslation> { new() { LanguageId = arabicLang.Id, Name = "الذكاء الصنعي" }, new() { LanguageId = englishLang.Id, Name = "Artificial Intelligence" } } },
                new() { CourseGroupCode = CourseGroupCodeEnum.NET, Translations = new List<CourseGroupTranslation> { new() { LanguageId = arabicLang.Id, Name = "الشبكات ونظم التشغيل" }, new() { LanguageId = englishLang.Id, Name = "Networking and OS" } } },
                new() { CourseGroupCode = CourseGroupCodeEnum.MEC, Translations = new List<CourseGroupTranslation> { new() { LanguageId = arabicLang.Id, Name = "علوم وهندسة المواد" }, new() { LanguageId = englishLang.Id, Name = "Materials Science and Engineering" } } },
                new() { CourseGroupCode = CourseGroupCodeEnum.CRL, Translations = new List<CourseGroupTranslation> { new() { LanguageId = arabicLang.Id, Name = "التحكم" }, new() { LanguageId = englishLang.Id, Name = "Control" } } },
                new() { CourseGroupCode = CourseGroupCodeEnum.ROB, Translations = new List<CourseGroupTranslation> { new() { LanguageId = arabicLang.Id, Name = "الروبوتيك" }, new() { LanguageId = englishLang.Id, Name = "Robotics" } } },
                new() { CourseGroupCode = CourseGroupCodeEnum.TEL, Translations = new List<CourseGroupTranslation> { new() { LanguageId = arabicLang.Id, Name = "الاتصالات" }, new() { LanguageId = englishLang.Id, Name = "Telecommunications" } } },
                new() { CourseGroupCode = CourseGroupCodeEnum.DBS, Translations = new List<CourseGroupTranslation> { new() { LanguageId = arabicLang.Id, Name = "علم المعطيات" }, new() { LanguageId = englishLang.Id, Name = "Data Science" } } },
                new() { CourseGroupCode = CourseGroupCodeEnum.CGS, Translations = new List<CourseGroupTranslation> { new() { LanguageId = arabicLang.Id, Name = "التقانات السحابية" }, new() { LanguageId = englishLang.Id, Name = "Cloud Technologies" } } },
                new() { CourseGroupCode = CourseGroupCodeEnum.SIG, Translations = new List<CourseGroupTranslation> { new() { LanguageId = arabicLang.Id, Name = "معالجة الإشارة" }, new() { LanguageId = englishLang.Id, Name = "Signal Processing" } } },
                new() { CourseGroupCode = CourseGroupCodeEnum.MGT, Translations = new List<CourseGroupTranslation> { new() { LanguageId = arabicLang.Id, Name = "الإدارة" }, new() { LanguageId = englishLang.Id, Name = "Management" } } },
                new() { CourseGroupCode = CourseGroupCodeEnum.LNG, Translations = new List<CourseGroupTranslation> { new() { LanguageId = arabicLang.Id, Name = "لغات" }, new() { LanguageId = englishLang.Id, Name = "Languages" } } }
            };
            _appDbContext.CourseGroups.AddRange(courseGroups);

            var courseGroupMap = courseGroups.ToDictionary(g => g.CourseGroupCode, g => g);
            var allCourses = new List<Course>
            {
                new() { CourseCode = "MTH101", Credits = 5, TheoreticalHours = 40, PracticalHours = 20, CourseGroup = courseGroupMap[CourseGroupCodeEnum.MTH], Translations = new List<CourseTranslation> { new() { LanguageId = arabicLang.Id, Name = "تحليل رياضي 1" } } },
                new() { CourseCode = "PHY101", Credits = 5, TheoreticalHours = 40, PracticalHours = 20, CourseGroup = courseGroupMap[CourseGroupCodeEnum.PHY], Translations = new List<CourseTranslation> { new() { LanguageId = arabicLang.Id, Name = "فيزياء 1" } } },
                new() { CourseCode = "SWE201", Credits = 5, TheoreticalHours = 40, PracticalHours = 20, CourseGroup = courseGroupMap[CourseGroupCodeEnum.SWE], Translations = new List<CourseTranslation> { new() { LanguageId = arabicLang.Id, Name = "بنى المعطيات" } } },
                new() { CourseCode = "SWE202", Credits = 5, TheoreticalHours = 40, PracticalHours = 20, CourseGroup = courseGroupMap[CourseGroupCodeEnum.SWE], Translations = new List<CourseTranslation> { new() { LanguageId = arabicLang.Id, Name = "الخوارزميات" } } },
                new() { CourseCode = "NET301", Credits = 4.5m, TheoreticalHours = 30, PracticalHours = 30, CourseGroup = courseGroupMap[CourseGroupCodeEnum.NET], Translations = new List<CourseTranslation> { new() { LanguageId = arabicLang.Id, Name = "شبكات حاسوبية 1" } } },
                new() { CourseCode = "NET302", Credits = 5, TheoreticalHours = 40, PracticalHours = 20, CourseGroup = courseGroupMap[CourseGroupCodeEnum.NET], Translations = new List<CourseTranslation> { new() { LanguageId = arabicLang.Id, Name = "نظم التشغيل 1" } } },
                new() { CourseCode = "NET401", Credits = 5, TheoreticalHours = 40, PracticalHours = 20, CourseGroup = courseGroupMap[CourseGroupCodeEnum.NET], Translations = new List<CourseTranslation> { new() { LanguageId = arabicLang.Id, Name = "أمن الشبكات" } } },
                new() { CourseCode = "NET501", Credits = 5, TheoreticalHours = 40, PracticalHours = 20, CourseGroup = courseGroupMap[CourseGroupCodeEnum.NET], Translations = new List<CourseTranslation> { new() { LanguageId = arabicLang.Id, Name = "النظم الموزعة" } } },
            };
            _appDbContext.Courses.AddRange(allCourses);

            var specializations = new List<Specialization>
            {
                new() { DegreeType = DegreeTypeEnum.PhD, Location = damascusLocation, Program = postgradProgram, Translations = new List<SpecializationTranslation> { new() { LanguageId = arabicLang.Id, Name = "دكتوراه نظم التحكم", Description = "<h4>الاختصاصات المتوافقة:</h4>..." }, new() { LanguageId = englishLang.Id, Name = "PhD in Control Systems", Description = "<h4>Compatible Specializations:</h4>..." } } },
                new() { DegreeType = DegreeTypeEnum.Engineer, Location = aleppoLocation, Program = engineeringProgram, Translations = new List<SpecializationTranslation> { new() { LanguageId = arabicLang.Id, Name = "هندسة الطيران", Description = "<h4>غايات البرنامج</h4>..." }, new() { LanguageId = englishLang.Id, Name = "Aeronautical Engineering", Description = "<h4>Program Goals</h4>..." } } },
                new() { DegreeType = DegreeTypeEnum.Engineer, Location = damascusLocation, Program = engineeringProgram, Translations = new List<SpecializationTranslation> { new() { LanguageId = arabicLang.Id, Name = "هندسة البرمجيات والذكاء الصنعي", Description = "..." }, new() { LanguageId = englishLang.Id, Name = "Software Engineering and Artificial Intelligence", Description = "..." } } },
                new() { DegreeType = DegreeTypeEnum.Engineer, Location = damascusLocation, Program = engineeringProgram, Translations = new List<SpecializationTranslation> { new() { LanguageId = arabicLang.Id, Name = "هندسة الشبكات ونظم التشغيل", Description = "..." }, new() { LanguageId = englishLang.Id, Name = "Networks and Operating Systems Engineering", Description = "..." } } }
            };
            _appDbContext.Specializations.AddRange(specializations);
        }

        /// <summary>
        /// Seeds entities that depend on the core structures, like Curriculum, Books, Posts, etc.
        /// </summary>
        private void SeedDependentEntities(Media placeholderMedia)
        {
            SeedAcademicStructure();
            _appDbContext.SaveChanges(); // Save academic structure to get IDs for Curriculum

            SeedCurriculum();
            SeedAdmissions();
            SeedTrainingCourses();
            //SeedBooks(placeholderMedia); // Pass the placeholder
            
            SeedPosts();
            SeedFaqs();
            SeedMenus();
            SeedPages();
            SeedSliders();
            _appDbContext.SaveChanges();
        }

        private void SeedCurriculum()
        {
            if (_appDbContext.Curriculums.Any()) return;

            // Fetch Specializations - Use FirstOrDefault for safety
            var aeroSpecialization = _appDbContext.Specializations.FirstOrDefault(s => s.Translations.Any(t => t.Name.Contains("Aeronautical")));
            var softwareSpec = _appDbContext.Specializations.FirstOrDefault(s => s.Translations.Any(t => t.Name.Contains("Software Engineering")));
            var networksSpec = _appDbContext.Specializations.FirstOrDefault(s => s.Translations.Any(t => t.Name.Contains("Networks and Operating")));
            var electronicsSpec = _appDbContext.Specializations.FirstOrDefault(s => s.Translations.Any(t => t.Name.Contains("Electronic Systems")));
            var telecomSpec = _appDbContext.Specializations.FirstOrDefault(s => s.Translations.Any(t => t.Name.Contains("Telecommunications Engineering")));
            var mechatronicsSpec = _appDbContext.Specializations.FirstOrDefault(s => s.Translations.Any(t => t.Name.Contains("Mechatronics")));
            var materialsSpec = _appDbContext.Specializations.FirstOrDefault(s => s.Translations.Any(t => t.Name.Contains("Materials Science and Engineering")));

            // Fetch Courses
            var courses = _appDbContext.Courses.ToDictionary(c => c.CourseCode, c => c);
            var curriculumEntries = new List<Curriculum>();

            // Helper to safely get a course
            Course GetCourse(string code) => courses.GetValueOrDefault(code);

            // Aeronautical Engineering Curriculum
            if (aeroSpecialization != null && GetCourse("MTH101") != null && GetCourse("PHY101") != null)
            {
                curriculumEntries.Add(new Curriculum { SpecializationId = aeroSpecialization.Id, CourseId = GetCourse("MTH101").Id, AcademicYear = 1, Semester = 1, CourseType = CourseTypeEnum.Core });
                curriculumEntries.Add(new Curriculum { SpecializationId = aeroSpecialization.Id, CourseId = GetCourse("PHY101").Id, AcademicYear = 1, Semester = 2, CourseType = CourseTypeEnum.Core });
                // Note: AER301 and AER401 were not in your CourseSeeding block, so they are omitted to prevent errors.
            }

            // Software Engineering Curriculum
            if (softwareSpec != null && GetCourse("SWE201") != null && GetCourse("SWE202") != null)
            {
                curriculumEntries.Add(new Curriculum { SpecializationId = softwareSpec.Id, CourseId = GetCourse("SWE201").Id, AcademicYear = 2, Semester = 1, CourseType = CourseTypeEnum.Core });
                curriculumEntries.Add(new Curriculum { SpecializationId = softwareSpec.Id, CourseId = GetCourse("SWE202").Id, AcademicYear = 2, Semester = 2, CourseType = CourseTypeEnum.Core });
            }

            // Networks and OS Curriculum
            if (networksSpec != null && GetCourse("NET301") != null && GetCourse("NET302") != null && GetCourse("NET401") != null && GetCourse("NET501") != null)
            {
                curriculumEntries.Add(new Curriculum { SpecializationId = networksSpec.Id, CourseId = GetCourse("NET301").Id, AcademicYear = 3, Semester = 1, CourseType = CourseTypeEnum.Specialized });
                curriculumEntries.Add(new Curriculum { SpecializationId = networksSpec.Id, CourseId = GetCourse("NET302").Id, AcademicYear = 3, Semester = 2, CourseType = CourseTypeEnum.Specialized });
                curriculumEntries.Add(new Curriculum { SpecializationId = networksSpec.Id, CourseId = GetCourse("NET401").Id, AcademicYear = 4, Semester = 1, CourseType = CourseTypeEnum.Specialized });
                curriculumEntries.Add(new Curriculum { SpecializationId = networksSpec.Id, CourseId = GetCourse("NET501").Id, AcademicYear = 5, Semester = 1, CourseType = CourseTypeEnum.Specialized });
            }

            // Add other curriculum entries...
            // Ensure you add the corresponding courses and specializations in the SeedAcademicStructure method first.

            if (curriculumEntries.Any())
            {
                _appDbContext.Curriculums.AddRange(curriculumEntries);
            }
        }

        private void SeedAdmissions()
        {
            if (_appDbContext.Admissions.Any()) return;

            var arabicLang = _appDbContext.Languages.Single(l => l.Code == LanguageCodeEnum.AR);
            var englishLang = _appDbContext.Languages.Single(l => l.Code == LanguageCodeEnum.EN);
            var postgradProgram = _appDbContext.Programs.Single(p => p.Translations.Any(t => t.Name.Contains("Postgraduate")));
            var engProgram = _appDbContext.Programs.Single(p => p.Translations.Any(t => t.Name.Contains("Engineering")));
            var damascusLocation = _appDbContext.Locations.Single(l => l.LocationCode == LocationCodeEnum.DAMAS);

            var admissions = new List<Admission>
            {
                new()
                {
                    AcademicYear = "2024-2025",
                    AnnouncementDate = new DateTime(2024, 9, 18),
                    Deadline = new DateTime(2024, 10, 10),
                    ProgramId = engProgram.Id,
                    LocationId = damascusLocation.Id
                },
                new()
                {
                    AcademicYear = "2024-2025",
                    AnnouncementDate = new DateTime(2024, 9, 8),
                    Deadline = new DateTime(2024, 10, 10),
                    ProgramId = postgradProgram.Id,
                    LocationId = damascusLocation.Id,
                    AdmissionExams = new List<AdmissionExam>
                    {
                        new() { ExamDateTime = new DateTime(2024, 10, 14, 10, 0, 0), Translations = new List<AdmissionExamTranslation> { new() { LanguageId = arabicLang.Id, ExamName = "فحص اللغة الإنكليزية" }, new() { LanguageId = englishLang.Id, ExamName = "English Language Exam" } } },
                        new() { ExamDateTime = new DateTime(2024, 10, 14, 12, 0, 0), Translations = new List<AdmissionExamTranslation> { new() { LanguageId = arabicLang.Id, ExamName = "الفحص المشترك" }, new() { LanguageId = englishLang.Id, ExamName = "Common Aptitude Test" } } },
                        new() { ExamDateTime = new DateTime(2024, 10, 14, 13, 15, 0), Translations = new List<AdmissionExamTranslation> { new() { LanguageId = arabicLang.Id, ExamName = "الفحص التخصصي العلمي" }, new() { LanguageId = englishLang.Id, ExamName = "Specialized Scientific Exam" } } }
                    }
                },
                new()
                {
                    AcademicYear = "2024-2025",
                    AnnouncementDate = new DateTime(2024, 9, 8),
                    Deadline = new DateTime(2024, 10, 10),
                    ProgramId = postgradProgram.Id,
                    LocationId = damascusLocation.Id,
                    AdmissionExams = new List<AdmissionExam>
                    {
                        new() { ExamDateTime = new DateTime(2024, 10, 14, 10, 0, 0), Translations = new List<AdmissionExamTranslation> { new() { LanguageId = arabicLang.Id, ExamName = "امتحان القبول للدكتوراه" }, new () { LanguageId = englishLang.Id, ExamName = "PhD Entrance Exam" } } }
                    }
                }
            };
            _appDbContext.Admissions.AddRange(admissions);
        }

        private void SeedTrainingCourses()
        {
            if (_appDbContext.TrainingCourses.Any()) return;

            var arabicLang = _appDbContext.Languages.Single(l => l.Code == LanguageCodeEnum.AR);
            var englishLang = _appDbContext.Languages.Single(l => l.Code == LanguageCodeEnum.EN);

            var inspectionCategory = new TrainingCourseCategory { Translations = new List<TrainingCourseCategoryTranslation> { new() { LanguageId = arabicLang.Id, Name = "دورات التفتيش والاختبار" }, new() { LanguageId = englishLang.Id, Name = "Inspection and Testing Courses" } } };
            var weldingCategory = new TrainingCourseCategory { Translations = new List<TrainingCourseCategoryTranslation> { new() { LanguageId = arabicLang.Id, Name = "دورات اللحام" }, new() { LanguageId = englishLang.Id, Name = "Welding Courses" } } };
            var qualityCategory = new TrainingCourseCategory { Translations = new List<TrainingCourseCategoryTranslation> { new() { LanguageId = arabicLang.Id, Name = "دورات جودة اللحام" }, new() { LanguageId = englishLang.Id, Name = "Welding Quality Courses" } } };
            var officeCategory = new TrainingCourseCategory { Translations = new List<TrainingCourseCategoryTranslation> { new() { LanguageId = arabicLang.Id, Name = "البرامج المكتبية والإدارية" }, new() { LanguageId = englishLang.Id, Name = "Office and Administrative Programs" } } };
            var engineeringCategory = new TrainingCourseCategory { Translations = new List<TrainingCourseCategoryTranslation> { new() { LanguageId = arabicLang.Id, Name = "البرامج الهندسية والإدارية" }, new() { LanguageId = englishLang.Id, Name = "Engineering and Administrative Programs" } } };

            _appDbContext.TrainingCourseCategories.AddRange(inspectionCategory, weldingCategory, qualityCategory, officeCategory, engineeringCategory);

            var courses = new List<TrainingCourse>
            {
                new() { CourseCode = "NDT1", DurationHours = 40, NumberOfSessions = 5, TargetAudience = "Engineers and technicians", Year = 2024, TrainingCourseCategory = inspectionCategory, Translations = new List<TrainingCourseTranslation> { new() { LanguageId = arabicLang.Id, Title = "التفتيش البصري في اللحام", Content = "..." }, new() { LanguageId = englishLang.Id, Title = "Visual Inspection in Welding", Content = "..." } } },
                new() { CourseCode = "NDT2", DurationHours = 40, NumberOfSessions = 5, TargetAudience = "Engineers and technicians", Year = 2024, TrainingCourseCategory = inspectionCategory, Translations = new List<TrainingCourseTranslation> { new() { LanguageId = arabicLang.Id, Title = "التفتيش بالأصبغة النافذة", Content = "..." }, new() { LanguageId = englishLang.Id, Title = "Penetrant Testing", Content = "..." } } },
                new() { CourseCode = "WLD1", DurationHours = 80, NumberOfSessions = 10, TargetAudience = "Welders and engineers", Year = 2024, TrainingCourseCategory = weldingCategory, Translations = new List<TrainingCourseTranslation> { new() { LanguageId = arabicLang.Id, Title = "تكنولوجيا اللحام بالقوس الكهربائي", Content = "..." }, new() { LanguageId = englishLang.Id, Title = "Arc Welding Technology", Content = "..." } } },
                new() { CourseCode = "WLD2", DurationHours = 80, NumberOfSessions = 10, TargetAudience = "Welders and engineers", Year = 2024, TrainingCourseCategory = weldingCategory, Translations = new List<TrainingCourseTranslation> { new() { LanguageId = arabicLang.Id, Title = "تقنيات اللحام المتقدمة", Content = "..." }, new() { LanguageId = englishLang.Id, Title = "Advanced Welding Techniques", Content = "..." } } },
                new() { CourseCode = "QLT1", DurationHours = 40, NumberOfSessions = 5, TargetAudience = "Quality control engineers", Year = 2024, TrainingCourseCategory = qualityCategory, Translations = new List<TrainingCourseTranslation> { new() { LanguageId = arabicLang.Id, Title = "تأهيل إجراءات اللحام", Content = "..." }, new() { LanguageId = englishLang.Id, Title = "Welding Procedure Qualification", Content = "..." } } },
                new() { CourseCode = "QLT2", DurationHours = 40, NumberOfSessions = 5, TargetAudience = "Quality control engineers", Year = 2024, TrainingCourseCategory = qualityCategory, Translations = new List<TrainingCourseTranslation> { new() { LanguageId = arabicLang.Id, Title = "ضمان جودة اللحام", Content = "..." }, new() { LanguageId = englishLang.Id, Title = "Welding Quality Assurance", Content = "..." } } },
                new() { CourseCode = "Mag/8", DurationHours = 22, NumberOfSessions = 11, TargetAudience = "Beginners", Year = 2024, TrainingCourseCategory = officeCategory, Translations = new List<TrainingCourseTranslation> { new() { LanguageId = arabicLang.Id, Title = "Microsoft Word", Content = "..." } } },
                new() { CourseCode = "Mag/1", DurationHours = 26, NumberOfSessions = 13, TargetAudience = "Managers", Year = 2024, TrainingCourseCategory = officeCategory, Translations = new List<TrainingCourseTranslation> { new() { LanguageId = arabicLang.Id, Title = "تحليل المشكلات واتخاذ القرار", Content = "..." } } },
                new() { CourseCode = "Mag/2", DurationHours = 20, NumberOfSessions = 11, TargetAudience = "Project Managers", Year = 2024, TrainingCourseCategory = officeCategory, Translations = new List<TrainingCourseTranslation> { new() { LanguageId = arabicLang.Id, Title = "إعداد برنامج زمني - Microsoft Project", Content = "..." } } },
                new() { CourseCode = "Mag/3", DurationHours = 26, NumberOfSessions = 12, TargetAudience = "Project Managers", Year = 2024, TrainingCourseCategory = engineeringCategory, Translations = new List<TrainingCourseTranslation> { new() { LanguageId = arabicLang.Id, Title = "إعداد برنامج زمني باستخدام Primavera", Content = "..." } } },
                new() { CourseCode = "Mag/9", DurationHours = 21, NumberOfSessions = 7, TargetAudience = "All levels", Year = 2024, TrainingCourseCategory = officeCategory, Translations = new List<TrainingCourseTranslation> { new() { LanguageId = arabicLang.Id, Title = "التفكير الإبداعي وحل المشكلات", Content = "..." } } }
            };
            _appDbContext.TrainingCourses.AddRange(courses);
        }

        /// <summary>
        /// Seeds books using the guaranteed placeholder media object.
        /// </summary>
        private void SeedBooks(Media placeholderMedia)
        {
            if (_appDbContext.Books.Any()) return;

            var arabicLang = _appDbContext.Languages.Single(l => l.Code == LanguageCodeEnum.AR);
            var englishLang = _appDbContext.Languages.Single(l => l.Code == LanguageCodeEnum.EN);

            var allBooks = new List<Book>
    {
        // --- Publications (now assigning the placeholder to the BookFile navigation property) ---
        new() { Author = "Yaman Safar", PublicationYear = 2025, ISBN = "https://doi.org/10.1038/s41598-025-00560-3",
                BookFile = placeholderMedia,
                Translations = new List<BookTranslation> { new() { LanguageId = englishLang.Id, Title = "Development of an innovative cost-effective hemostatic material based on electrospun polyacrylonitrile/exfoliated bentonite/calcium chloride nanocomposite" } } },
        new() { Author = "Yaman Al-Atrash", PublicationYear = 2025, ISBN = "https://ouci.dntb.gov.ua/en/works/4Krrm1jN",
                BookFile = placeholderMedia,
                Translations = new List<BookTranslation> { new() { LanguageId = englishLang.Id, Title = "The role of polysiloxane and nano-additives in improving hydrophobicity, adhesion, corrosion resistance, and fouling prevention of epoxy marine coatings" } } },
        new() { Author = "Al-Sayed Badr Al-Din", PublicationYear = 2025, ISBN = "https://doi.org/10.1007/s00289-025-0563-0",
                BookFile = placeholderMedia,
                Translations = new List<BookTranslation> { new() { LanguageId = englishLang.Id, Title = "Synergistic effect of calcium chloride as coagulant and (chitosan-graft-polyacrylamide) as flocculant for anionic dye removal from wastewater" } } },
        new() { Author = "Ali Sami Karim", PublicationYear = 2024, ISBN = "https://doi.org/10.1016/j.heliyon.2024.e31847",
                BookFile = placeholderMedia,
                Translations = new List<BookTranslation> { new() { LanguageId = englishLang.Id, Title = "Workspace trajectory generation with smooth gait transition using CPG-based locomotion control for hexapod robot" } } },
        new() { Author = "Jawdat Al-Rukbi", PublicationYear = 2024, ISBN = "https://doi.org/10.1002/ces2.210226",
                BookFile = placeholderMedia,
                Translations = new List<BookTranslation> { new() { LanguageId = englishLang.Id, Title = "Porous alumina-based ceramics with very low thermal conductivity prepared by the starch consolidation route" } } },
        new() { Author = "Ammar Hajjar", PublicationYear = 2024, ISBN = "https://doi.org/10.54218/JISISoT.120110",
                BookFile = placeholderMedia,
                Translations = new List<BookTranslation> { new() { LanguageId = englishLang.Id, Title = "An adaptive distributed intrusion detection system in local network: Hybrid classification methods" } } },
        new() { Author = "Samer Jamal", PublicationYear = 2024, ISBN = "10.2174/0122103279291431240218061325",
                BookFile = placeholderMedia,
                Translations = new List<BookTranslation> { new() { LanguageId = englishLang.Id, Title = "Spectrum and Power Efficient Anti-Jamming Approach for Cognitive Radio Networks Based on Reinforcement Learning" } } },
        new() { Author = "Ammar Qouja", PublicationYear = 2024, ISBN = "10.1109/OJCSYS.2024.3402050",
                BookFile = placeholderMedia,
                Translations = new List<BookTranslation> { new() { LanguageId = englishLang.Id, Title = "Self-Excited Dynamics of Discrete-Time Lur'e Systems with Affinely Constrained, Piecewise-C1 Feedback Nonlinearities" } } },

        // --- Books with Covers (now assigning the placeholder to the CoverImage navigation property) ---
        new() { Author = "Dr. Edmond Abboud", PublicationYear = 2022,
                CoverImage = placeholderMedia,
                Translations = new List<BookTranslation> { new() { LanguageId = arabicLang.Id, Title = "طرائق عددية للمهندسين" }, new() { LanguageId = englishLang.Id, Title = "Numerical Methods for Engineers" } } },
        new() { Author = "Dr. Osama Jadid", PublicationYear = 2022,
                CoverImage = placeholderMedia,
                Translations = new List<BookTranslation> { new() { LanguageId = arabicLang.Id, Title = "طرائق عددية للمهندسين - جزء ثاني" }, new() { LanguageId = englishLang.Id, Title = "Numerical Methods for Engineers - Part 2" } } },
        new() { Author = "Dr. Ahmad Salem", PublicationYear = 2021,
                CoverImage = placeholderMedia,
                Translations = new List<BookTranslation> { new() { LanguageId = arabicLang.Id, Title = "تصميم عناصر الآلات" }, new() { LanguageId = englishLang.Id, Title = "Design of Machine Elements" } } },
        new() { Author = "Dr. Ahmad Salem", PublicationYear = 2021,
                CoverImage = placeholderMedia,
                Translations = new List<BookTranslation> { new() { LanguageId = arabicLang.Id, Title = "تصميم عناصر الآلات - جزء ثاني" }, new() { LanguageId = englishLang.Id, Title = "Design of Machine Elements - Part 2" } } },
        new() { Author = "Dr. Akil Saloum", PublicationYear = 2023,
                CoverImage = placeholderMedia,
                Translations = new List<BookTranslation> { new() { LanguageId = arabicLang.Id, Title = "الترموديناميك" }, new() { LanguageId = englishLang.Id, Title = "Thermodynamics" } } },
        new() { Author = "Dr. Ghadir Al-Durzi", PublicationYear = 2020,
                CoverImage = placeholderMedia,
                Translations = new List<BookTranslation> { new() { LanguageId = arabicLang.Id, Title = "مدخل إلى كيمياء المياه" }, new() { LanguageId = englishLang.Id, Title = "Introduction to Water Chemistry" } } },
        new() { Author = "Dr. Ma'di Al-Hassan", PublicationYear = 2022,
                CoverImage = placeholderMedia,
                Translations = new List<BookTranslation> { new() { LanguageId = arabicLang.Id, Title = "كيمياء المحاليل المائية" }, new() { LanguageId = englishLang.Id, Title = "Chemistry of Aqueous Solutions" } } },
        new() { Author = "Dr. Mustafa Al-Jourani", PublicationYear = 2021,
                CoverImage = placeholderMedia,
                Translations = new List<BookTranslation> { new() { LanguageId = arabicLang.Id, Title = "ميكانيك الجسم الصلب" }, new() { LanguageId = englishLang.Id, Title = "Solid Body Mechanics" } } }
    };

            _appDbContext.Books.AddRange(allBooks);
        }

        private void SeedPosts()
        {
            if (_appDbContext.Posts.Any()) return;

            var arabicLang = _appDbContext.Languages.Single(l => l.Code == LanguageCodeEnum.AR);
            var englishLang = _appDbContext.Languages.Single(l => l.Code == LanguageCodeEnum.EN);
            var adminUser = _appDbContext.Users.Single(u => u.Email == DefaultSetting.DefaultAdminOneEmail);

            var announcementsCategory = new Category { Translations = new List<CategoryTranslation> { new() { LanguageId = arabicLang.Id, Name = "إعلانات", Slug = "announcements-ar" }, new() { LanguageId = englishLang.Id, Name = "Announcements", Slug = "announcements-en" } } };
            _appDbContext.Categories.Add(announcementsCategory);

            var posts = new List<Post>
            {
                new() { AuthorId = adminUser.Id, Category = announcementsCategory, PublicationDate = DateTime.UtcNow, Translations = new List<PostTranslation> { new() { LanguageId = arabicLang.Id, Title = "دفاع دكتوراه رواد علي ملحم", Content = "محتوى إعلان الدفاع..." }, new() { LanguageId = englishLang.Id, Title = "PhD Defense of Rawad Ali Melhem", Content = "Defense announcement content..." } } },
                new() { AuthorId = adminUser.Id, Category = announcementsCategory, PublicationDate = DateTime.UtcNow, Translations = new List<PostTranslation> { new() { LanguageId = arabicLang.Id, Title = "دورة وورد وإكسل", Content = "تفاصيل دورة الوورد والإكسل..." }, new() { LanguageId = englishLang.Id, Title = "Word and Excel Course", Content = "Word and Excel course details..." } } },
                new() { AuthorId = adminUser.Id, Category = announcementsCategory, PublicationDate = DateTime.UtcNow, Translations = new List<PostTranslation> { new() { LanguageId = arabicLang.Id, Title = "إعلان مناقصة", Content = "تفاصيل المناقصة..." }, new() { LanguageId = englishLang.Id, Title = "Tender Announcement", Content = "Tender details..." } } }
            };
            _appDbContext.Posts.AddRange(posts);
        }

        private void SeedFaqs()
        {
            if (_appDbContext.Faqs.Any()) return;

            var arabicLang = _appDbContext.Languages.Single(l => l.Code == LanguageCodeEnum.AR);
            var englishLang = _appDbContext.Languages.Single(l => l.Code == LanguageCodeEnum.EN);

            var phdCategory = new FaqCategory { Translations = new List<FaqCategoryTranslation> { new() { LanguageId = arabicLang.Id, Name = "برنامج الدكتوراه" }, new() { LanguageId = englishLang.Id, Name = "PhD Program" } } };
            var engineeringCategory = new FaqCategory { Translations = new List<FaqCategoryTranslation> { new() { LanguageId = arabicLang.Id, Name = "التأهيل الهندسي" }, new() { LanguageId = englishLang.Id, Name = "Engineering Qualification" } } };
            var postgradCategory = new FaqCategory { Translations = new List<FaqCategoryTranslation> { new() { LanguageId = arabicLang.Id, Name = "الدراسات العليا" }, new() { LanguageId = englishLang.Id, Name = "Postgraduate Studies" } } };
            var generalCategory = new FaqCategory { Translations = new List<FaqCategoryTranslation> { new() { LanguageId = arabicLang.Id, Name = "أسئلة عامة" }, new() { LanguageId = englishLang.Id, Name = "General Questions" } } };
            var masterCategory = new FaqCategory { Translations = new List<FaqCategoryTranslation> { new() { LanguageId = arabicLang.Id, Name = "أسئلة عن الماجستيرات" }, new() { LanguageId = englishLang.Id, Name = "Questions about Master's Programs" } } };
            _appDbContext.FaqCategories.AddRange(phdCategory, engineeringCategory, postgradCategory, generalCategory, masterCategory);

            var faqs = new List<Faq>
            {
                new() { DisplayOrder = 1, FaqCategory = phdCategory, Translations = new List<FaqTranslation> { new() { LanguageId = arabicLang.Id, Question = "ما هي الرسوم السنوية لبرنامج الدكتوراه؟", Answer = "القسط السنوي للطلاب السوريين هو 2,000,000 ليرة سورية." }, new() { LanguageId = englishLang.Id, Question = "What are the annual fees for the PhD program?", Answer = "The annual fee for Syrian students is 2,000,000 Syrian Pounds." } } },
                new() { DisplayOrder = 1, FaqCategory = engineeringCategory, Translations = new List<FaqTranslation> { new() { LanguageId = arabicLang.Id, Question = "هل المعهد العالي خاص أم حكومي؟", Answer = "المعهد العالي... مؤسسة حكومية سورية عامة." }, new() { LanguageId = englishLang.Id, Question = "Is HIAST a private or public institute?", Answer = "HIAST is a public Syrian governmental institution." } } },
                new() { DisplayOrder = 2, FaqCategory = engineeringCategory, Translations = new List<FaqTranslation> { new() { LanguageId = arabicLang.Id, Question = "ما هي طبيعة الدراسة في المعهد العالي؟", Answer = "يخضع الطالب المقبول في المعهد العالي لنظام داخلي صارم." }, new() { LanguageId = englishLang.Id, Question = "What is the nature of study at HIAST?", Answer = "Students admitted to HIAST are subject to a strict internal (boarding) system." } } },
                new() { DisplayOrder = 1, FaqCategory = postgradCategory, Translations = new List<FaqTranslation> { new() { LanguageId = arabicLang.Id, Question = "هل شهادات المعهد العالي معترف بها أكاديمياً؟", Answer = "نعم، جميع شهادات المعهد العالي معترف بها من قبل وزارة التعليم العالي." }, new() { LanguageId = englishLang.Id, Question = "Are HIAST certificates recognized academically?", Answer = "Yes, all HIAST certificates are recognized by the Ministry of Higher Education." } } },
                new() { DisplayOrder = 1, FaqCategory = generalCategory, Translations = new List<FaqTranslation> { new() { LanguageId = arabicLang.Id, Question = "ما هي مواعيد الدوام الرسمي؟", Answer = "من الأحد إلى الخميس من التاسعة صباحاً إلى الرابعة عصراً." }, new() { LanguageId = englishLang.Id, Question = "What are the official working hours?", Answer = "From Sunday to Thursday, 9:00 AM to 4:00 PM." } } },
                new() { DisplayOrder = 1, FaqCategory = masterCategory, Translations = new List<FaqTranslation> { new() { LanguageId = arabicLang.Id, Question = "مما يتألف امتحان القبول للماجستير؟", Answer = "يتألف الامتحان من ثلاثة أقسام: لغة إنكليزية، فحص مؤهلات، وفحص علمي." }, new() { LanguageId = englishLang.Id, Question = "What does the Master's entrance exam consist of?", Answer = "The exam consists of three parts: English language, aptitude test, and scientific test." } } }
            };
            _appDbContext.Faqs.AddRange(faqs);
        }

        private void SeedMenus()
        {
            if (_appDbContext.Menus.Any()) return;

            var arabicLang = _appDbContext.Languages.Single(l => l.Code == LanguageCodeEnum.AR);
            var englishLang = _appDbContext.Languages.Single(l => l.Code == LanguageCodeEnum.EN);

            var menus = new List<Menu>
            {
                new() { Location = MenuLocationEnum.MainMenu, MenuItems = new List<MenuItem> { new() { LinkURL = "/home", Translations = new List<MenuItemTranslation> { new() { LanguageId = arabicLang.Id, Title = "الرئيسية" }, new() { LanguageId = englishLang.Id, Title = "Home" } } }, new() { LinkURL = "/study", Translations = new List<MenuItemTranslation> { new() { LanguageId = arabicLang.Id, Title = "الدراسة في المعهد" }, new() { LanguageId = englishLang.Id, Title = "Study at the Institute" } } }, new() { LinkURL = "/library", Translations = new List<MenuItemTranslation> { new() { LanguageId = arabicLang.Id, Title = "المكتبة الرقمية" }, new() { LanguageId = englishLang.Id, Title = "Digital Library" } } } } },
                new() { Location = MenuLocationEnum.FooterInformation, MenuItems = new List<MenuItem> { new() { LinkURL = "/contact", Translations = new List<MenuItemTranslation> { new() { LanguageId = arabicLang.Id, Title = "اتصل بنا" }, new() { LanguageId = englishLang.Id, Title = "Contact Us" } } } } },
                new() { Location = MenuLocationEnum.SidebarAbout, MenuItems = new List<MenuItem> { new() { LinkURL = "/research-development", Translations = new List<MenuItemTranslation> { new() { LanguageId = arabicLang.Id, Title = "البحث والتطوير" }, new() { LanguageId = englishLang.Id, Title = "Research and Development" } } }, new() { LinkURL = "/about", Translations = new List<MenuItemTranslation> { new() { LanguageId = arabicLang.Id, Title = "عن المعهد" }, new() { LanguageId = englishLang.Id, Title = "About the Institute" } } } } }
            };
            _appDbContext.Menus.AddRange(menus);
        }

        private void SeedPages()
        {
            if (_appDbContext.PageTranslations.Any(p => p.Slug == "directors-word")) return;

            var arabicLang = _appDbContext.Languages.Single(l => l.Code == LanguageCodeEnum.AR);
            var englishLang = _appDbContext.Languages.Single(l => l.Code == LanguageCodeEnum.EN);

            var pagesToSeed = new List<Page>
            {
                new() { Translations = new List<PageTranslation> { new() { LanguageId = arabicLang.Id, Slug = "kalemat-modeer-al-mahad", Title = "كلمة مدير المعهد", Content = "<p>انطلقت تجربة المعهد العالي...</p>" }, new() { LanguageId = englishLang.Id, Slug = "directors-word", Title = "Word of the Institute Director", Content = "<p>The journey of the Higher Institute...</p>" } } },
                new() { Translations = new List<PageTranslation> { new() { LanguageId = arabicLang.Id, Slug = "alruya-wal-risala", Title = "الرؤية والرسالة", Content = "<h4>المعهد العالي...</h4>" }, new() { LanguageId = englishLang.Id, Slug = "vision-and-mission", Title = "Vision and Mission", Content = "<h4>Higher Institute...</h4>" } } },
                new() { Translations = new List<PageTranslation> { new() { LanguageId = arabicLang.Id, Slug = "al-taheel-al-handasi", Title = "برنامج التأهيل الهندسي", Content = "<h4>برنامج التأهيل الهندسي...</h4>" }, new() { LanguageId = englishLang.Id, Slug = "engineering-qualification-program", Title = "Engineering Qualification Program", Content = "<h4>Engineering Qualification Program...</h4>" } } },
                new() { Translations = new List<PageTranslation> { new() { LanguageId = arabicLang.Id, Slug = "jihat-al-taawun-al-dakhiliya", Title = "جهات التعاون الداخلية", Content = "<h4>جهات التعاون الداخلية</h4><div class='logo-grid'>...</div>" }, new() { LanguageId = englishLang.Id, Slug = "internal-cooperation-parties", Title = "Internal Cooperation Parties", Content = "<h4>Internal Cooperation Parties</h4><div class='logo-grid'>...</div>" } } },
                new() { Translations = new List<PageTranslation> { new() { LanguageId = arabicLang.Id, Slug = "qism-al-maelumatiat", Title = "قسم المعلوماتيات", Content = "<h4>قسم المعلوماتيات...</h4>" }, new() { LanguageId = englishLang.Id, Slug = "informatics-department", Title = "Informatics Department", Content = "<h4>Informatics Department...</h4>" } } },
                // ... Add all other Page entities here with their full content ...
                new() { Translations = new List<PageTranslation> { new() { LanguageId = arabicLang.Id, Slug = "lab-activities", Title = "أنشطة المخبر", Content = "<h4>الدراسات والبحوث...</h4>" }, new() { LanguageId = englishLang.Id, Slug = "lab-activities", Title = "Lab Activities", Content = "<h4>Studies and Research...</h4>" } } }
            };
            _appDbContext.Pages.AddRange(pagesToSeed);
        }

        private void SeedSliders()
        {
            if (_appDbContext.Sliders.Any()) return;

            var arabicLang = _appDbContext.Languages.Single(l => l.Code == LanguageCodeEnum.AR);
            var englishLang = _appDbContext.Languages.Single(l => l.Code == LanguageCodeEnum.EN);
            var sliderImage = _appDbContext.Media.FirstOrDefault(m => m.FileName.Contains("word_excel"));

            if (sliderImage != null)
            {
                var courseSlider = new Slider
                {
                    LinkURL = "/training/word-excel-basics",
                    MediaId = sliderImage.Id,
                    Translations = new List<SliderTranslation>
                    {
                        new() { LanguageId = arabicLang.Id, Title = "إعلان دورة تدريبية: أساسيات الحاسوب وتطبيقات Word - Excel" },
                        new() { LanguageId = englishLang.Id, Title = "Training Course Announcement: Computer Basics and Word/Excel Applications" }
                    }
                };
                _appDbContext.Sliders.Add(courseSlider);
            }
        }
        private Media SeedPlaceholderMediaAndSaveChanges()
        {
            var placeholder = _appDbContext.Media.FirstOrDefault(m => m.FileName == "placeholder.pdf");
            if (placeholder == null)
            {
                var arabicLang = _appDbContext.Languages.Single(l => l.Code == LanguageCodeEnum.AR);
                var englishLang = _appDbContext.Languages.Single(l => l.Code == LanguageCodeEnum.EN);

                var placeholderCategory = new MediaCategory { Translations = new List<MediaCategoryTranslation> { new() { LanguageId = arabicLang.Id, Name = "ملفات النظام" }, new() { LanguageId = englishLang.Id, Name = "System Files" } } };
                _appDbContext.MediaCategories.Add(placeholderCategory);

                placeholder = new Media
                {
                    FileName = "placeholder.pdf",
                    FilePath = "/media/system/placeholder.pdf",
                    FileType = "application/pdf",
                    MediaCategory = placeholderCategory
                };
                _appDbContext.Media.Add(placeholder);
                _appDbContext.SaveChanges(); // <-- The crucial immediate save.
            }
            return placeholder;
        }

        #endregion
    }
}
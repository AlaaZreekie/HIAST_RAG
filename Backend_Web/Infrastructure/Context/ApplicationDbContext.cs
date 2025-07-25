using Domain.Entity.ApplicationEntity;
using Domain.Entity.IdentityEntity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Context
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> op) : IdentityDbContext<ApplicationUser, ApplicationRole, Guid>(op)
    {
        #region IdentityTables
        public virtual DbSet<IdentityUserClaim<Guid>> Claims { get; set; }
        public virtual DbSet<IdentityUserLogin<Guid>> Logins { get; set; }
        public virtual DbSet<IdentityUserToken<Guid>> Tokens { get; set; }
        public override DbSet<ApplicationRole> Roles { get; set; }
        public override DbSet<ApplicationUser> Users { get; set; }
        #endregion
        #region ApplicationTables
        #region MainTables
        public virtual DbSet<Admission> Admissions { get; set; }
        public virtual DbSet<AdmissionExam> AdmissionExams { get; set; }
        public virtual DbSet<AdmissionResult> AdmissionResults { get; set; }
        public virtual DbSet<Book> Books { get; set; }

        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Course> Courses { get; set; }
        public virtual DbSet<CourseGroup> CourseGroups { get; set; }
        public virtual DbSet<Curriculum> Curriculums { get; set; }
        public virtual DbSet<Faq> Faqs { get; set; }
        public virtual DbSet<FaqCategory> FaqCategories { get; set; }
        public virtual DbSet<Language> Languages { get; set; }
        public virtual DbSet<Location> Locations { get; set; }
        public virtual DbSet<Media> Media { get; set; }
        public virtual DbSet<MediaCategory> MediaCategories { get; set; }
        public virtual DbSet<Menu> Menus { get; set; }
        public virtual DbSet<MenuItem> MenuItems { get; set; }
        public virtual DbSet<Page> Pages { get; set; }
        public virtual DbSet<Post> Posts { get; set; }
        public virtual DbSet<Program> Programs { get; set; }
        public virtual DbSet<Slider> Sliders { get; set; }
        public virtual DbSet<Specialization> Specializations { get; set; }
        public virtual DbSet<Testimonial> Testimonials { get; set; }
        public virtual DbSet<TrainingCourse> TrainingCourses { get; set; }
        public virtual DbSet<TrainingCourseCategory> TrainingCourseCategories { get; set; }

        #endregion
        #region Translations
        public virtual DbSet<AdmissionExamTranslation> AdmissionExamTranslations { get; set; }
        public virtual DbSet<BookTranslation> BookTranslations { get; set; }

        public virtual DbSet<CategoryTranslation> CategoryTranslations { get; set; }
        public virtual DbSet<CourseGroupTranslation> CourseGroupTranslations { get; set; }
        public virtual DbSet<CourseTranslation> CourseTranslations { get; set; }
        public virtual DbSet<FaqCategoryTranslation> FaqCategoryTranslations { get; set; }
        public virtual DbSet<FaqTranslation> FaqTranslations { get; set; }
        public virtual DbSet<LocationTranslation> LocationTranslations { get; set; }
        public virtual DbSet<MediaCategoryTranslation> MediaCategoryTranslations { get; set; }
        public virtual DbSet<MenuItemTranslation> MenuItemTranslations { get; set; }
        public virtual DbSet<PageTranslation> PageTranslations { get; set; }
        public virtual DbSet<PostTranslation> PostTranslations { get; set; }
        public virtual DbSet<ProgramTranslation> ProgramTranslations { get; set; }
        public virtual DbSet<SliderTranslation> SliderTranslations { get; set; }
        public virtual DbSet<SpecializationTranslation> SpecializationTranslations { get; set; }
        public virtual DbSet<TestimonialTranslation> TestimonialTranslations { get; set; }
        public virtual DbSet<TrainingCourseCategoryTranslation> TrainingCourseCategoryTranslations { get; set; }
        public virtual DbSet<TrainingCourseTranslation> TrainingCourseTranslations { get; set; }

        #endregion
        #endregion

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            #region IdentityDbContext 
            modelBuilder.Entity<ApplicationUser>(b =>
            {
                b.ToTable("Users");
                b.HasKey(p => p.Id);
                b.Property(u => u.ConcurrencyStamp).IsConcurrencyToken();

                b.HasMany<IdentityUserClaim<Guid>>().WithOne().HasForeignKey(uc => uc.UserId).IsRequired().HasConstraintName("FK_AspNetUserClaims_AspNetUsers_UserId");
                b.HasMany<IdentityUserRole<Guid>>().WithOne().HasForeignKey(ur => ur.UserId).IsRequired().HasConstraintName("FK_AspNetUserRoles_AspNetUsers_UserId");
                b.HasMany<IdentityUserToken<Guid>>().WithOne().HasForeignKey(ut => ut.UserId).IsRequired().HasConstraintName("FK_AspNetUserTokens_AspNetUsers_UserId");
                b.HasMany<IdentityUserLogin<Guid>>().WithOne().HasForeignKey(ul => ul.UserId).IsRequired().HasConstraintName("FK_AspNetUserLogins_AspNetUsers_UserId");
            });

            modelBuilder.Entity<IdentityUserClaim<Guid>>(b =>
            {
                b.ToTable("UserClaims");
                b.HasKey(p => p.Id);
            });

            modelBuilder.Entity<IdentityUserLogin<Guid>>(b =>
            {
                b.ToTable("UserLogins");
                b.HasKey(p => new { p.UserId, p.LoginProvider, p.ProviderKey });
            });

            modelBuilder.Entity<IdentityUserToken<Guid>>(b =>
            {
                b.ToTable("UserTokens");
                b.HasKey(p => new { p.UserId, p.LoginProvider, p.Name });
            });

            modelBuilder.Entity<ApplicationRole>(b =>
            {
                b.ToTable("Roles");
                b.HasKey(p => p.Id);
                b.Property(r => r.ConcurrencyStamp).IsConcurrencyToken();

                b.HasMany<IdentityUserRole<Guid>>().WithOne().HasForeignKey(us => us.RoleId).IsRequired();
                b.HasMany<IdentityRoleClaim<Guid>>().WithOne().HasForeignKey(uc => uc.RoleId).IsRequired();
            });

            modelBuilder.Entity<IdentityUserRole<Guid>>(b =>
            {
                b.ToTable("UserRoles");
                b.HasKey(p => new { p.UserId, p.RoleId });
            });

            modelBuilder.Entity<IdentityRoleClaim<Guid>>(b =>
            {
                b.ToTable("RoleClaims");
                b.HasKey(p => p.Id);
            });
            #endregion

            #region Pages
            modelBuilder.Entity<Page>(b =>
            {
                b.ToTable("pages");
                b.HasKey(e => e.Id);
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.HasMany(e => e.Translations).WithOne(t => t.Page).HasForeignKey(t => t.PageId);
            });

            modelBuilder.Entity<PageTranslation>(b =>
            {
                b.ToTable("page_translations");
                b.HasKey(e => e.Id);
                b.HasIndex(e => new { e.PageId, e.LanguageId }).IsUnique();
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.PageId).HasColumnName("page_id");
                b.Property(e => e.Slug).HasColumnName("slug").HasColumnType("nvarchar(255)").IsRequired();
                b.Property(e => e.LanguageId).HasColumnName("language_id");
                b.Property(e => e.Title).HasColumnName("title").HasColumnType("nvarchar(255)").IsRequired();
                b.Property(e => e.Content).HasColumnName("content").HasColumnType("nvarchar(max)").IsRequired();
            });
            #endregion

            #region Categories
            modelBuilder.Entity<Category>(b =>
            {
                b.ToTable("categories");
                b.HasKey(e => e.Id);
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.Slug).HasColumnName("slug").HasColumnType("nvarchar(100)").IsRequired();
                b.HasMany(e => e.Translations).WithOne(t => t.Category).HasForeignKey(t => t.CategoryId);
            });

            modelBuilder.Entity<CategoryTranslation>(b =>
            {
                b.ToTable("category_translations");
                b.HasKey(e => e.Id);
                b.HasIndex(e => new { e.CategoryId, e.LanguageId }).IsUnique();
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.CategoryId).HasColumnName("category_id");
                b.Property(e => e.LanguageId).HasColumnName("language_id");
                b.Property(e => e.Name).HasColumnName("name").HasColumnType("nvarchar(100)").IsRequired();
            });
            #endregion

            #region Posts
            modelBuilder.Entity<Post>(b =>
            {
                b.ToTable("posts");
                b.HasKey(e => e.Id);
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.PublicationDate).HasColumnName("publication_date").HasColumnType("datetime2").IsRequired();
                b.Property(e => e.AuthorId).HasColumnName("author_id");
                b.Property(e => e.CategoryId).HasColumnName("category_id");
                b.HasOne(e => e.Author).WithMany().HasForeignKey(e => e.AuthorId);
                b.HasOne(e => e.Category).WithMany(c => c.Posts).HasForeignKey(e => e.CategoryId);
                b.HasMany(e => e.Translations).WithOne(t => t.Post).HasForeignKey(t => t.PostId);
            });

            modelBuilder.Entity<PostTranslation>(b =>
            {
                b.ToTable("post_translations");
                b.HasKey(e => e.Id);
                b.HasIndex(e => new { e.PostId, e.LanguageId }).IsUnique();
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.PostId).HasColumnName("post_id");
                b.Property(e => e.LanguageId).HasColumnName("language_id");
                b.Property(e => e.Title).HasColumnName("title").HasColumnType("nvarchar(255)").IsRequired();
                b.Property(e => e.Content).HasColumnName("content").HasColumnType("nvarchar(max)").IsRequired();
            });
            #endregion

            #region Languages
            modelBuilder.Entity<Language>(b =>
            {
                b.ToTable("languages");
                b.HasKey(e => e.Id);
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.Code).HasColumnName("code").HasConversion<string>().HasColumnType("nvarchar(10)").IsRequired();
                b.Property(e => e.Name).HasColumnName("name").HasColumnType("nvarchar(50)").IsRequired();
            });
            #endregion

            #region Locations
            modelBuilder.Entity<Location>(b =>
            {
                b.ToTable("locations");
                b.HasKey(e => e.Id);
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.LocationCode).HasColumnName("location_code").HasConversion<string>().HasColumnType("nvarchar(40)").IsRequired();
                b.HasMany(e => e.Translations).WithOne(t => t.Location).HasForeignKey(t => t.LocationId);
            });

            modelBuilder.Entity<LocationTranslation>(b =>
            {
                b.ToTable("location_translations");
                b.HasKey(e => e.Id);
                b.HasIndex(e => new { e.LocationId, e.LanguageId }).IsUnique();
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.LocationId).HasColumnName("location_id");
                b.Property(e => e.LanguageId).HasColumnName("language_id");
                b.Property(e => e.Name).HasColumnName("name").HasColumnType("nvarchar(200)").IsRequired();
                b.Property(e => e.Address).HasColumnName("address").HasColumnType("nvarchar(max)").IsRequired(false);
            });
            #endregion

            #region MediaCategories
            modelBuilder.Entity<MediaCategory>(b =>
            {
                b.ToTable("media_categories");
                b.HasKey(e => e.Id);
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.HasMany(e => e.Translations).WithOne(t => t.MediaCategory).HasForeignKey(t => t.MediaCategoryId);
                b.HasMany(e => e.Media).WithOne(m => m.MediaCategory).HasForeignKey(m => m.MediaCategoryId);
            });
            modelBuilder.Entity<MediaCategoryTranslation>(b =>
            {
                b.ToTable("media_category_translations");
                b.HasKey(e => e.Id);
                b.HasIndex(e => new { e.MediaCategoryId, e.LanguageId }).IsUnique();
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.MediaCategoryId).HasColumnName("media_category_id");
                b.Property(e => e.LanguageId).HasColumnName("language_id");
                b.Property(e => e.Name).HasColumnName("name").HasColumnType("nvarchar(100)").IsRequired();
            });
            #endregion

            #region Media
            modelBuilder.Entity<Media>(b =>
            {
                b.ToTable("media");
                b.HasKey(e => e.Id);
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.FileName).HasColumnName("file_name").HasColumnType("nvarchar(255)").IsRequired();
                b.Property(e => e.FilePath).HasColumnName("file_path").HasColumnType("nvarchar(500)").IsRequired();
                b.Property(e => e.FileType).HasColumnName("file_type").HasColumnType("nvarchar(100)").IsRequired();
                b.Property(e => e.MediaCategoryId).HasColumnName("media_category_id");
            });
            #endregion

            #region Menus
            modelBuilder.Entity<Menu>(b =>
            {
                b.ToTable("menus");
                b.HasKey(e => e.Id);
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.Location).HasColumnName("location").HasConversion<string>().HasColumnType("nvarchar(50)").IsRequired();
                b.HasMany(e => e.MenuItems).WithOne(i => i.Menu).HasForeignKey(i => i.MenuId);
            });
            #endregion

            #region MenuItems
            modelBuilder.Entity<MenuItem>(b =>
            {
                b.ToTable("menu_items");
                b.HasKey(e => e.Id);
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.LinkURL).HasColumnName("link_url").HasColumnType("nvarchar(500)").IsRequired();
                b.Property(e => e.MenuId).HasColumnName("menu_id");
                b.HasMany(e => e.Translations).WithOne(t => t.MenuItem).HasForeignKey(t => t.MenuItemId);
            });
            modelBuilder.Entity<MenuItemTranslation>(b =>
            {
                b.ToTable("menu_item_translations");
                b.HasKey(e => e.Id);
                b.HasIndex(e => new { e.MenuItemId, e.LanguageId }).IsUnique();
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.MenuItemId).HasColumnName("menu_item_id");
                b.Property(e => e.LanguageId).HasColumnName("language_id");
                b.Property(e => e.Title).HasColumnName("title").HasColumnType("nvarchar(100)").IsRequired();
            });
            #endregion

            #region Sliders
            modelBuilder.Entity<Slider>(b =>
            {
                b.ToTable("sliders");
                b.HasKey(e => e.Id);
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.LinkURL).HasColumnName("link_url").HasColumnType("nvarchar(500)").IsRequired(false);
                b.Property(e => e.MediaId).HasColumnName("media_id");
                b.HasOne(e => e.Media).WithMany().HasForeignKey(e => e.MediaId);
                b.HasMany(e => e.Translations).WithOne(t => t.Slider).HasForeignKey(t => t.SliderId);
            });
            modelBuilder.Entity<SliderTranslation>(b =>
            {
                b.ToTable("slider_translations");
                b.HasKey(e => e.Id);
                b.HasIndex(e => new { e.SliderId, e.LanguageId }).IsUnique();
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.SliderId).HasColumnName("slider_id");
                b.Property(e => e.LanguageId).HasColumnName("language_id");
                b.Property(e => e.Title).HasColumnName("title").HasColumnType("nvarchar(255)").IsRequired();
            });
            #endregion

            #region Programs
            modelBuilder.Entity<Program>(b =>
            {
                b.ToTable("programs");
                b.HasKey(e => e.Id);
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.Duration).HasColumnName("duration").HasColumnType("nvarchar(50)").IsRequired(false);
                b.HasMany(e => e.Specializations).WithOne(s => s.Program).HasForeignKey(s => s.ProgramId);
                b.HasMany(e => e.Translations).WithOne(t => t.Program).HasForeignKey(t => t.ProgramId);
            });
            modelBuilder.Entity<ProgramTranslation>(b =>
            {
                b.ToTable("program_translations");
                b.HasKey(e => e.Id);
                b.HasIndex(e => new { e.ProgramId, e.LanguageId }).IsUnique();
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.ProgramId).HasColumnName("program_id");
                b.Property(e => e.LanguageId).HasColumnName("language_id");
                b.Property(e => e.Name).HasColumnName("name").HasColumnType("nvarchar(200)").IsRequired();
                b.Property(e => e.Description).HasColumnName("description").HasColumnType("nvarchar(max)").IsRequired(false);
            });
            #endregion

            #region Specializations
            modelBuilder.Entity<Specialization>(b =>
            {
                b.ToTable("specializations");
                b.HasKey(e => e.Id);
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.DegreeType).HasColumnName("degree_type").HasConversion<string>().HasColumnType("nvarchar(20)").IsRequired();
                b.Property(e => e.ProgramId).HasColumnName("program_id");
                b.Property(e => e.LocationId).HasColumnName("location_id");
                b.HasOne(e => e.Program).WithMany(p => p.Specializations).HasForeignKey(e => e.ProgramId);
                b.HasOne(e => e.Location).WithMany(l => l.Specializations).HasForeignKey(e => e.LocationId);
                b.HasMany(e => e.Translations).WithOne(t => t.Specialization).HasForeignKey(t => t.SpecializationId);
            });
            modelBuilder.Entity<SpecializationTranslation>(b =>
            {
                b.ToTable("specialization_translations");
                b.HasKey(e => e.Id);
                b.HasIndex(e => new { e.SpecializationId, e.LanguageId }).IsUnique();
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.SpecializationId).HasColumnName("specialization_id");
                b.Property(e => e.LanguageId).HasColumnName("language_id");
                b.Property(e => e.Name).HasColumnName("name").HasColumnType("nvarchar(200)").IsRequired();
                b.Property(e => e.Description).HasColumnName("description").HasColumnType("nvarchar(max)").IsRequired(false);
            });
            #endregion

            #region CourseGroups
            modelBuilder.Entity<CourseGroup>(b =>
            {
                b.ToTable("course_groups");
                b.HasKey(e => e.Id);
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.CourseGroupCode).HasColumnName("course_groub_code").HasConversion<string>().HasColumnType("nvarchar(20)").IsRequired();
                b.HasMany(e => e.Translations).WithOne(t => t.CourseGroup).HasForeignKey(t => t.CourseGroupId);
                b.HasMany(e => e.Courses).WithOne(c => c.CourseGroup).HasForeignKey(c => c.CourseGroupId);
            });
            modelBuilder.Entity<CourseGroupTranslation>(b =>
            {
                b.ToTable("course_group_translations");
                b.HasKey(e => e.Id);
                b.HasIndex(e => new { e.CourseGroupId, e.LanguageId }).IsUnique();
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.CourseGroupId).HasColumnName("course_group_id");
                b.Property(e => e.LanguageId).HasColumnName("language_id");
                b.Property(e => e.Name).HasColumnName("name").HasColumnType("nvarchar(100)").IsRequired();
            });
            #endregion

            #region Courses
            modelBuilder.Entity<Course>(b =>
            {
                b.ToTable("courses");
                b.HasKey(e => e.Id);
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.CourseCode).HasColumnName("course_code").HasColumnType("nvarchar(20)").IsRequired();
                b.Property(e => e.Credits).HasColumnName("credits").HasColumnType("decimal(3,1)").IsRequired();
                b.Property(e => e.TheoreticalHours).HasColumnName("theoretical_hours");
                b.Property(e => e.PracticalHours).HasColumnName("practical_hours");
                b.Property(e => e.CourseGroupId).HasColumnName("course_group_id");
                b.HasMany(e => e.Translations).WithOne(t => t.Course).HasForeignKey(t => t.CourseId);
            });
            modelBuilder.Entity<CourseTranslation>(b =>
            {
                b.ToTable("course_translations");
                b.HasKey(e => e.Id);
                b.HasIndex(e => new { e.CourseId, e.LanguageId }).IsUnique();
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.CourseId).HasColumnName("course_id");
                b.Property(e => e.LanguageId).HasColumnName("language_id");
                b.Property(e => e.Name).HasColumnName("name").HasColumnType("nvarchar(200)").IsRequired();
                b.Property(e => e.Description).HasColumnName("description").HasColumnType("nvarchar(max)").IsRequired(false);
            });
            #endregion

            #region Curriculum
            modelBuilder.Entity<Curriculum>(b =>
            {
                b.ToTable("curriculum");
                b.HasKey(e => e.Id);
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.AcademicYear).HasColumnName("academic_year").IsRequired();
                b.Property(e => e.Semester).HasColumnName("semester").IsRequired();
                b.Property(e => e.CourseType).HasColumnName("course_type").HasConversion<string>().HasColumnType("nvarchar(20)").IsRequired();
                b.Property(e => e.SpecializationId).HasColumnName("specialization_id");
                b.Property(e => e.CourseId).HasColumnName("course_id");
                b.HasOne(c => c.Specialization).WithMany(s => s.Curriculum).HasForeignKey(c => c.SpecializationId);
                b.HasOne(c => c.Course).WithMany(c => c.Curriculum).HasForeignKey(c => c.CourseId);
            });
            #endregion

            #region Admissions
            modelBuilder.Entity<Admission>(b =>
            {
                b.ToTable("admissions");
                b.HasKey(e => e.Id);
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.AcademicYear).HasColumnName("academic_year").HasColumnType("nvarchar(20)").IsRequired();
                b.Property(e => e.AnnouncementDate).HasColumnName("announcement_date").HasColumnType("datetime2");
                b.Property(e => e.Deadline).HasColumnName("deadline").HasColumnType("datetime2");
                b.Property(e => e.ProgramId).HasColumnName("program_id");
                b.Property(e => e.LocationId).HasColumnName("location_id");
                b.HasMany(e => e.AdmissionExams).WithOne(ex => ex.Admission).HasForeignKey(ex => ex.AdmissionId);
                b.HasMany(e => e.AdmissionResults).WithOne(r => r.Admission).HasForeignKey(r => r.AdmissionId);
            });
            #endregion

            #region AdmissionExams
            modelBuilder.Entity<AdmissionExam>(b =>
            {
                b.ToTable("admission_exams");
                b.HasKey(e => e.Id);
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.ExamDateTime).HasColumnName("exam_date_time").HasColumnType("datetime2").IsRequired();
                b.Property(e => e.AdmissionId).HasColumnName("admission_id");
                b.HasMany(e => e.Translations).WithOne(t => t.AdmissionExam).HasForeignKey(t => t.AdmissionExamId);
            });
            modelBuilder.Entity<AdmissionExamTranslation>(b =>
            {
                b.ToTable("admission_exam_translations");
                b.HasKey(e => e.Id);
                b.HasIndex(e => new { e.AdmissionExamId, e.LanguageId }).IsUnique();
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.AdmissionExamId).HasColumnName("admission_exam_id");
                b.Property(e => e.LanguageId).HasColumnName("language_id");
                b.Property(e => e.ExamName).HasColumnName("exam_name").HasColumnType("nvarchar(200)").IsRequired();
                b.Property(e => e.Notes).HasColumnName("notes").HasColumnType("nvarchar(max)").IsRequired(false);
            });
            #endregion

            #region AdmissionResults
            modelBuilder.Entity<AdmissionResult>(b =>
            {
                b.ToTable("admission_results");
                b.HasKey(e => e.Id);
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.ResultType).HasColumnName("result_type").HasConversion<string>().HasColumnType("nvarchar(50)").IsRequired();
                b.Property(e => e.AdmissionId).HasColumnName("admission_id");
                b.Property(e => e.MediaId).HasColumnName("media_id");
                b.HasOne(e => e.Media).WithMany().HasForeignKey(e => e.MediaId);
            });
            #endregion

            #region Testimonials
            modelBuilder.Entity<Testimonial>(b =>
            {
                b.ToTable("testimonials");
                b.HasKey(e => e.Id);
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.GraduateName).HasColumnName("graduate_name").HasColumnType("nvarchar(150)").IsRequired();
                b.Property(e => e.GraduateYear).HasColumnName("graduate_year");
                b.Property(e => e.SpecializationId).HasColumnName("specialization_id");
                b.Property(e => e.MediaId).HasColumnName("media_id"); // Photo
                b.HasOne(e => e.Specialization).WithMany().HasForeignKey(e => e.SpecializationId);
                b.HasOne(e => e.Media).WithMany().HasForeignKey(e => e.MediaId);
                b.HasMany(e => e.Translations).WithOne(t => t.Testimonial).HasForeignKey(t => t.TestimonialId);
            });
            modelBuilder.Entity<TestimonialTranslation>(b =>
            {
                b.ToTable("testimonial_translations");
                b.HasKey(e => e.Id);
                b.HasIndex(e => new { e.TestimonialId, e.LanguageId }).IsUnique();
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.TestimonialId).HasColumnName("testimonial_id");
                b.Property(e => e.LanguageId).HasColumnName("language_id");
                b.Property(e => e.Quote).HasColumnName("quote").HasColumnType("nvarchar(max)").IsRequired();
            });
            #endregion

            #region FaqCategories
            modelBuilder.Entity<FaqCategory>(b =>
            {
                b.ToTable("faq_categories");
                b.HasKey(e => e.Id);
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.HasMany(e => e.Translations).WithOne(t => t.FaqCategory).HasForeignKey(t => t.FaqCategoryId);
                b.HasMany(e => e.Faqs).WithOne(f => f.FaqCategory).HasForeignKey(f => f.FaqCategoryId);
            });
            modelBuilder.Entity<FaqCategoryTranslation>(b =>
            {
                b.ToTable("faq_category_translations");
                b.HasKey(e => e.Id);
                b.HasIndex(e => new { e.FaqCategoryId, e.LanguageId }).IsUnique();
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.FaqCategoryId).HasColumnName("faq_category_id");
                b.Property(e => e.LanguageId).HasColumnName("language_id");
                b.Property(e => e.Name).HasColumnName("name").HasColumnType("nvarchar(150)").IsRequired();
            });
            #endregion

            #region Faqs
            modelBuilder.Entity<Faq>(b =>
            {
                b.ToTable("faqs");
                b.HasKey(e => e.Id);
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.DisplayOrder).HasColumnName("display_order").HasDefaultValue(0);
                b.Property(e => e.FaqCategoryId).HasColumnName("faq_category_id");
                b.HasMany(e => e.Translations).WithOne(t => t.Faq).HasForeignKey(t => t.FaqId);
            });
            modelBuilder.Entity<FaqTranslation>(b =>
            {
                b.ToTable("faq_translations");
                b.HasKey(e => e.Id);
                b.HasIndex(e => new { e.FaqId, e.LanguageId }).IsUnique();
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.FaqId).HasColumnName("faq_id");
                b.Property(e => e.LanguageId).HasColumnName("language_id");
                b.Property(e => e.Question).HasColumnName("question").HasColumnType("nvarchar(max)").IsRequired();
                b.Property(e => e.Answer).HasColumnName("answer").HasColumnType("nvarchar(max)").IsRequired();
            });
            #endregion

            #region TrainingCourseCategories
            modelBuilder.Entity<TrainingCourseCategory>(b =>
            {
                b.ToTable("training_course_categories");
                b.HasKey(e => e.Id);
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.HasMany(e => e.Translations).WithOne(t => t.TrainingCourseCategory).HasForeignKey(t => t.TrainingCourseCategoryId);
                b.HasMany(e => e.TrainingCourses).WithOne(c => c.TrainingCourseCategory).HasForeignKey(c => c.TrainingCourseCategoryId);
            });
            modelBuilder.Entity<TrainingCourseCategoryTranslation>(b =>
            {
                b.ToTable("training_course_category_translations");
                b.HasKey(e => e.Id);
                b.HasIndex(e => new { e.TrainingCourseCategoryId, e.LanguageId }).IsUnique();
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.TrainingCourseCategoryId).HasColumnName("training_course_category_id");
                b.Property(e => e.LanguageId).HasColumnName("language_id");
                b.Property(e => e.Name).HasColumnName("name").HasColumnType("nvarchar(150)").IsRequired();
            });
            #endregion

            #region TrainingCourses
            modelBuilder.Entity<TrainingCourse>(b =>
            {
                b.ToTable("training_courses");
                b.HasKey(e => e.Id);
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.CourseCode).HasColumnName("course_code").HasColumnType("nvarchar(50)").IsRequired(false);
                b.Property(e => e.DurationHours).HasColumnName("duration_hours");
                b.Property(e => e.NumberOfSessions).HasColumnName("number_of_sessions");
                b.Property(e => e.TargetAudience).HasColumnName("target_audience").HasColumnType("nvarchar(255)").IsRequired(false);
                b.Property(e => e.Year).HasColumnName("year");
                b.Property(e => e.TrainingCourseCategoryId).HasColumnName("training_course_category_id");
                b.HasMany(e => e.Translations).WithOne(t => t.TrainingCourse).HasForeignKey(t => t.TrainingCourseId);
            });
            modelBuilder.Entity<TrainingCourseTranslation>(b =>
            {
                b.ToTable("training_course_translations");
                b.HasKey(e => e.Id);
                b.HasIndex(e => new { e.TrainingCourseId, e.LanguageId }).IsUnique();
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.TrainingCourseId).HasColumnName("training_course_id");
                b.Property(e => e.LanguageId).HasColumnName("language_id");
                b.Property(e => e.Title).HasColumnName("title").HasColumnType("nvarchar(255)").IsRequired();
                b.Property(e => e.Content).HasColumnName("content").HasColumnType("nvarchar(max)").IsRequired(false);
            });
            #endregion

            #region Books
            modelBuilder.Entity<Book>(b =>
            {
                b.ToTable("books");
                b.HasKey(e => e.Id);
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.Author).HasColumnName("author").HasColumnType("nvarchar(255)").IsRequired(false);
                b.Property(e => e.PublicationYear).HasColumnName("publication_year");
                b.Property(e => e.ISBN).HasColumnName("isbn").HasColumnType("nvarchar(20)").IsRequired(false);
                b.Property(e => e.CoverImageMediaId).HasColumnName("cover_image_media_id");
                b.Property(e => e.FileMediaId).HasColumnName("file_media_id");

                // Define relationships to the Media table
                b.HasOne(e => e.CoverImage).WithMany().HasForeignKey(e => e.CoverImageMediaId).OnDelete(DeleteBehavior.Restrict);
                b.HasOne(e => e.BookFile).WithMany().HasForeignKey(e => e.FileMediaId).OnDelete(DeleteBehavior.Restrict);

                b.HasMany(e => e.Translations).WithOne(t => t.Book).HasForeignKey(t => t.BookId);
            });

            modelBuilder.Entity<BookTranslation>(b =>
            {
                b.ToTable("book_translations");
                b.HasKey(e => e.Id);
                b.HasIndex(e => new { e.BookId, e.LanguageId }).IsUnique();
                b.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnName("id");
                b.Property(e => e.BookId).HasColumnName("book_id");
                b.Property(e => e.LanguageId).HasColumnName("language_id");
                b.Property(e => e.Title).HasColumnName("title").HasColumnType("nvarchar(255)").IsRequired();
                b.Property(e => e.Description).HasColumnName("description").HasColumnType("nvarchar(max)").IsRequired(false);
            });
            #endregion
        }
    }
}

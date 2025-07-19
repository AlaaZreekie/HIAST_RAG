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
        public virtual DbSet<IdentityUserClaim<Guid>> Claims { get; set; }
        public virtual DbSet<IdentityUserLogin<Guid>> Logins { get; set; }
        public virtual DbSet<IdentityUserToken<Guid>> Tokens { get; set; }
        public override DbSet<ApplicationRole> Roles { get; set; }
        public override DbSet<ApplicationUser> Users { get; set; }

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

        }
    }
}

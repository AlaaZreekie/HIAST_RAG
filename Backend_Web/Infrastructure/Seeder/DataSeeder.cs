using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Domain.Entity.IdentityEntity;
using Infrastructure.Context;
using Domain.Entity.ApplicationEntity;
using Domain.Ennum;
using Domain.Common;

namespace Infrastructure.Seeds
{
    public class DataSeeder(
        ApplicationDbContext context,
        RoleManager<ApplicationRole> roleManeger,
        UserManager<ApplicationUser> userManager)
    {
        private readonly ApplicationDbContext _appDbContext = context;
        private readonly UserManager<ApplicationUser> _userManager = userManager;
        private readonly RoleManager<ApplicationRole> _roleManeger = roleManeger;
        public void SeedData()
        {
            var shouldUpdateContext = false;

            #region LangSeeding
            if (!_appDbContext.Languages.Any())
            {
                // Create the languages.
                var languages = new List<Language>
                {
                    new() { Id = Guid.NewGuid(), Code = LanguageCodeEnum.AR, Name = "Arabic" },
                    new() { Id = Guid.NewGuid(), Code = LanguageCodeEnum.EN, Name = "English" }
                };

                // Add the new languages to the context.
                _appDbContext.Languages.AddRange(languages);

                // Mark that the context needs to be saved.
                shouldUpdateContext = true;
            }
            #endregion

            #region RoleSeeding
            if (!_appDbContext.Roles.Any())
            {
                shouldUpdateContext = true;

                var roleUser = new ApplicationRole()
                {
                    Name = DefaultSetting.UserRoleName,
                };
                var roleEmployee = new ApplicationRole()
                {
                    Name = DefaultSetting.EmployeeRoleName,
                };
                var roleAdmin = new ApplicationRole()
                {
                    Name = DefaultSetting.AdminRoleName
                };
                var roleCustomer = new ApplicationRole()
                {
                    Name = DefaultSetting.CustomerRoleName
                };
                _roleManeger.CreateAsync(roleAdmin).GetAwaiter().GetResult();
                _roleManeger.CreateAsync(roleUser).GetAwaiter().GetResult();
                _roleManeger.CreateAsync(roleEmployee).GetAwaiter().GetResult();
                _roleManeger.CreateAsync(roleCustomer).GetAwaiter().GetResult();
            }
            #endregion

            #region UserSeeding
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

                shouldUpdateContext = true;

            }
            #endregion


            if (shouldUpdateContext)
            {
                shouldUpdateContext = false;
                _appDbContext.SaveChanges();
            }
        }
    }
}

using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Domain.Entity.IdentityEntity;
using Infrastructure.Context;

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



            if (shouldUpdateContext)
            {
                shouldUpdateContext = false;
                _appDbContext.SaveChanges();
            }
        }
    }

}

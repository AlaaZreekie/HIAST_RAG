using Application.IApplicationServices.Authentication;
using Application.IReositosy;
using Application.IServices;
using Application.IUnitOfWork;
using Application.Serializer;
using Domain.Entity.IdentityEntity;
using Infrastructure.Context;
using Infrastructure.Seeds;
using Infrastructure.Services;
using Infrastructure.UnitOfWork;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using System.Security.Claims;

namespace Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        =>
       services
           .AddServices()
           .AddDatabase(configuration)
           .AddIdentityOptions()
           .AddBackgroundServices();

        private static IServiceCollection AddServices(this IServiceCollection services)
        {

            services.AddScoped(typeof(IAppRepository<>), typeof(AppRepository<>));
            services.AddScoped<IJsonFieldsSerializer, JsonFieldsSerializer>();
            services.AddScoped<DataSeeder>();
            services.AddScoped<IAppUnitOfWork, AppUnitOfWork>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<ILanguageService, LanguageService>();
            services.AddScoped<IProgramService, ProgramService>();
            services.AddScoped<ILocationService, LocationService>();
            services.AddScoped<ISpecializationService, SpecializationService>();
            services.AddScoped<IFaqCategoryService, FaqCategoryService>();
            return services;
        }
        private static IServiceCollection AddIdentityOptions(this IServiceCollection services)
        {
            services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
            {
                options.SignIn.RequireConfirmedAccount = true;
                options.ClaimsIdentity.UserIdClaimType = ClaimTypes.NameIdentifier;
                options.Lockout.AllowedForNewUsers = true;
                options.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(15);
                options.Lockout.MaxFailedAccessAttempts = 5;
                options.Password.RequiredLength = 6;
                options.Password.RequireDigit = true;
                options.Password.RequireNonAlphanumeric = true;
            })
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddTokenProvider<DataProtectorTokenProvider<ApplicationUser>>(TokenOptions.DefaultProvider);

            return services;
        }

        private static IServiceCollection AddDatabase(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
             options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            return services;
        }

        private static IServiceCollection AddBackgroundServices(this IServiceCollection services)
        {
            return services;
        }
    }
}

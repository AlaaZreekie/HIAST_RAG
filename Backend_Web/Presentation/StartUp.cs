using Application;
using Application.IReositosy;
using Application.IUnitOfWork;
using Infrastructure;
using Infrastructure.Seeds;
using Presentation;
using Presentation.Middleware;

public class Startup(IConfiguration configuration)
{
    public IConfiguration Configuration { get; } = configuration;

    public void ConfigureServices(IServiceCollection services)
    {
        services
            .AddApplication()
            .AddInfrastructure(Configuration)
            .AddPresentation(Configuration);
    }


    public void Configure(IApplicationBuilder app, IWebHostEnvironment env, DataSeeder dataSeeder)
    {
        if (env.IsDevelopment())
        {
            app.UseExceptionHandler("/Home/Error");
            app.UseHsts();
        }

        dataSeeder.SeedData();

        // Enable CORS first, before other middleware
        app.UseCors("AllowAll");

        app.UseHttpsRedirection();
        app.UseStaticFiles();
        app.UseRouting();
        
        app.UseAuthentication();
        app.UseAuthorization();
        
        app.UseSwagger();
        app.UseSwaggerUI(c =>
        {
            c.SwaggerEndpoint("/swagger/v1/swagger.json", "My_API V1");
        });

        app.UseMiddleware<ExceptionHandlingMiddleware>();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }
}

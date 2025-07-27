using System.Globalization;
using Application.Common;
using Domain.Common;
using Newtonsoft.Json;

namespace Presentation.Middleware
{
    public class ExceptionHandlingMiddleware(RequestDelegate next)
    {
        private readonly RequestDelegate _next = next;

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (Exception ex)
            {
                bool isApiRequest = context.Request.Path.StartsWithSegments("/api");
                
                var response = new ApiResponse(false, ex.Message, StatusCodes.Status500InternalServerError, ex.Data?[ApiConsts.ExceptionKey]);

                if (ex.Data is not null)
                {
                    var statusCode = ex.Data[ApiConsts.StatusCodeKey];
                    if (statusCode is not null)
                        response.Code = (int)statusCode;
                    
                    var data = ex.Data[ApiConsts.DataKey];
                    if (data is not null)
                        response.Data = data;
                    
                }

                if (!isApiRequest)
                {
                    await _next(context);
                }

                context.Response.StatusCode = StatusCodes.Status500InternalServerError;
                context.Response.ContentType = "application/json";
                await context.Response.WriteAsync(JsonConvert.SerializeObject(response));
            }
        }

    }
}
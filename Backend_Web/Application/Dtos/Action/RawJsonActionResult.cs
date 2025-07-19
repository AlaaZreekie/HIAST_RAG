using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Application.DTOs.Actions
{
    public class RawJsonActionResult : ActionResult
    {
        private readonly string _jsonString = string.Empty;

        public RawJsonActionResult(object value)
        {
            if (value != null)
            {
                _jsonString = value.ToString()!;
            }
        }

        public string Value()
        {
            return _jsonString;
        }

        public override async Task ExecuteResultAsync(ActionContext context)
        {
            if (context == null)
            {
                throw new ArgumentNullException(nameof(context));
            }

            var response = context.HttpContext.Response;

            response.StatusCode = 200;
            response.ContentType = "application/json";

            await response.WriteAsync(_jsonString);
        }
    }
}

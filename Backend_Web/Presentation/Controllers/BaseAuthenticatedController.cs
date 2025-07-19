using Application.DTOs.Authentication;
using Application.IApplicationServices.Authentication;
using Application.Serializer;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]/[action]")]
    public class BaseAuthenticatedController(IAuthenticationService authenticationService, IJsonFieldsSerializer jsonFieldsSerializer) : ControllerBase
    {
        protected readonly IAuthenticationService _authenticationService = authenticationService;
        protected readonly IJsonFieldsSerializer _jsonFieldsSerializer = jsonFieldsSerializer;

        [ApiExplorerSettings(IgnoreApi = true)]
        public async Task<UserProfileDto> GetCurrentUserAsync()
        {
            return await _authenticationService.GetAuthenticatedUser();
        }
    }
}

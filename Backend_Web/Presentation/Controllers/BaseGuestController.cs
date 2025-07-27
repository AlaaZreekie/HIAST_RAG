using Application.IApplicationServices.Authentication;
using Application.Serializer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    public class BaseGuestController(IAuthenticationService authenticationService, IJsonFieldsSerializer jsonFieldsSerializer) : ControllerBase
    {
        protected readonly IAuthenticationService _authenticationService = authenticationService;
        protected readonly IJsonFieldsSerializer _jsonFieldsSerializer = jsonFieldsSerializer;
    }
}

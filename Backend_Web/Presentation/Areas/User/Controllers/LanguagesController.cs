using Application.Dtos.LanguageDtos;
using Application.IServices;
using Application.Common;
using Application.DTOs.Actions;
using Application.Serializer;
using Application.IApplicationServices.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;
using API.Controllers;

namespace Backend_Web.Presentation.Areas.User.Controllers
{
    [Area("User")]
    [Route("api/[area]/[controller]/[action]")]
    public class LanguagesController : BaseGuestController
    {
        private readonly ILanguageService _languageService;
        public LanguagesController(ILanguageService languageService, IAuthenticationService authenticationService, IJsonFieldsSerializer jsonFieldsSerializer)
            : base(authenticationService, jsonFieldsSerializer)
        {
            _languageService = languageService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllLanguages(CancellationToken cancellationToken)
        {
            var result = await _languageService.GetAllAsync(cancellationToken);
            var apiResponse = new ApiResponse(true, "Languages retrieved successfully", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpGet]
        public async Task<IActionResult> GetByFilter([FromQuery] LanguageFilterDto filter, CancellationToken cancellationToken)
        {
            var result = await _languageService.GetByFilterAsync(filter, cancellationToken);
            var apiResponse = new ApiResponse(true, "Languages filtered successfully.", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }
    }
} 
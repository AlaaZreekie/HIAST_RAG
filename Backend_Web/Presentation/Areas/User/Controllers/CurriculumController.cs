using Application.Dtos.CurriculumDtos;
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
    public class CurriculumController : BaseGuestController
    {
        private readonly ICurriculumService _curriculumService;
        public CurriculumController(ICurriculumService curriculumService, IAuthenticationService authenticationService, IJsonFieldsSerializer jsonFieldsSerializer)
            : base(authenticationService, jsonFieldsSerializer)
        {
            _curriculumService = curriculumService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCurriculums(CancellationToken cancellationToken)
        {
            var result = await _curriculumService.GetAllAsync(cancellationToken);
            var apiResponse = new ApiResponse(true, "Curriculums retrieved successfully", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpGet]
        public async Task<IActionResult> GetByFilter([FromQuery] CurriculumFilterDto filter, CancellationToken cancellationToken)
        {
            var result = await _curriculumService.GetByFilterAsync(filter, cancellationToken);
            var apiResponse = new ApiResponse(true, "Curriculums filtered successfully.", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }
    }
} 
using Application.Dtos.ProgramDtos;
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
    public class ProgramsController : BaseGuestController
    {
        private readonly IProgramService _programService;
        public ProgramsController(IProgramService programService, IAuthenticationService authenticationService, IJsonFieldsSerializer jsonFieldsSerializer)
            : base(authenticationService, jsonFieldsSerializer)
        {
            _programService = programService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPrograms(CancellationToken cancellationToken)
        {
            var result = await _programService.GetAllAsync(cancellationToken);
            var apiResponse = new ApiResponse(true, "Programs retrieved successfully", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpGet]
        public async Task<IActionResult> GetByFilter([FromQuery] ProgramFilterDto filter, CancellationToken cancellationToken)
        {
            var result = await _programService.GetByFilterAsync(filter, cancellationToken);
            var apiResponse = new ApiResponse(true, "Programs filtered successfully.", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }
    }
} 
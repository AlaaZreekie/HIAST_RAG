using API.Controllers;
using Application.Common;
using Application.DTO.CommonDTO;
using Application.Dtos.SpecializationDtos;
using Application.DTOs.Actions;
using Application.IApplicationServices.Authentication;
using Application.IServices;
using Application.Serializer;
using Domain.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using API.Controllers;

namespace HIAST.API.Areas.User.Controllers
{
    [Area("User")]
    [Route("api/[area]/[controller]/[action]")]
    public class SpecializationsController : BaseGuestController
    {
        private readonly ISpecializationService _specializationService;

        public SpecializationsController(
            ISpecializationService specializationService,
            IAuthenticationService authenticationService,
            IJsonFieldsSerializer jsonFieldsSerializer)
            : base(authenticationService, jsonFieldsSerializer)
        {
            _specializationService = specializationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSpecializations(CancellationToken cancellationToken)
        {
            var result = await _specializationService.GetAllAsync(cancellationToken);
            var apiResponse = new ApiResponse(true, "Specializations retrieved successfully.", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        
        [HttpPost]
        public async Task<IActionResult> GetSpecializationsByFilter([FromBody] SpecializationFilterDto filter, CancellationToken cancellationToken)
        {
            var result = await _specializationService.GetByFilterAsync(filter, cancellationToken);
            var apiResponse = new ApiResponse(true, "Specializations filtered successfully.", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }
    }
}
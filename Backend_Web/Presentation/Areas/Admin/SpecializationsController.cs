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

namespace HIAST.API.Areas.Admin.Controllers
{
    [Area(DefaultSetting.AdminRoleName)]
    [Route("api/[area]/[controller]/[action]")]
    [Authorize(Roles = DefaultSetting.AdminRoleName)]
    public class SpecializationsController : BaseAuthenticatedController
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

        [HttpPost]
        public async Task<IActionResult> CreateSpecialization([FromBody] CreateSpecializationDto dto, CancellationToken cancellationToken)
        {
            var result = await _specializationService.CreateAsync(dto, cancellationToken);
            var apiResponse = new ApiResponse(true, "Specialization created successfully.", StatusCodes.Status201Created, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateSpecialization([FromBody] UpdateSpecializationDto dto, CancellationToken cancellationToken)
        {
            await _specializationService.UpdateAsync(dto, cancellationToken);
            var apiResponse = new ApiResponse(true, "Specialization updated successfully.", StatusCodes.Status200OK, null);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteSpecialization([FromBody] BaseDto<Guid> dto, CancellationToken cancellationToken)
        {
            await _specializationService.DeleteAsync(dto.Id, cancellationToken);
            var apiResponse = new ApiResponse(true, "Specialization deleted successfully.", StatusCodes.Status200OK, null);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }
    }
}
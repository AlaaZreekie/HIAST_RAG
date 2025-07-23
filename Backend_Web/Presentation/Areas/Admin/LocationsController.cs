using API.Controllers;
using Application.Common;
using Application.DTO.CommonDTO;
using Application.Dtos.LocationDtos;
using Application.DTOs.Actions;
using Application.IApplicationServices.Authentication;
using Application.IServices;
using Application.Serializer;
using Domain.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
// ... other usings

namespace HIAST.API.Areas.Admin.Controllers
{
    [Area(DefaultSetting.AdminRoleName)]
    [Route("api/[area]/[controller]/[action]")]
    [Authorize(Roles = DefaultSetting.AdminRoleName)]
    public class LocationsController(
        ILocationService locationService,
        IAuthenticationService authenticationService,
        IJsonFieldsSerializer jsonFieldsSerializer) : BaseAuthenticatedController(authenticationService, jsonFieldsSerializer)
    {
        private readonly ILocationService _locationService = locationService;

        [HttpGet]
        public async Task<IActionResult> GetAllLocations(CancellationToken cancellationToken)
        {
            var result = await _locationService.GetAllAsync(cancellationToken);
            var apiResponse = new ApiResponse(true, "Locations retrieved successfully.", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpPost]
        public async Task<IActionResult> CreateLocation([FromBody] CreateLocationDto dto, CancellationToken cancellationToken)
        {
            var result = await _locationService.CreateAsync(dto, cancellationToken);
            var apiResponse = new ApiResponse(true, "Location created successfully.", StatusCodes.Status201Created, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }
        [HttpPut]
        public async Task<IActionResult> UpdateLocation([FromBody] UpdateLocationDto dto, CancellationToken cancellationToken)
        {
            await _locationService.UpdateAsync(dto, cancellationToken);
            var apiResponse = new ApiResponse(true, "Location updated successfully.", StatusCodes.Status200OK, null);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteLocation([FromBody] BaseDto<Guid> dto, CancellationToken cancellationToken)
        {
            await _locationService.DeleteAsync(dto.Id, cancellationToken);
            var apiResponse = new ApiResponse(true, "Location deleted successfully.", StatusCodes.Status200OK, null);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpPost] // Using POST for a filter with a body is a common practice
        public async Task<IActionResult> GetLocationsByFilter([FromBody] LocationFilterDto filter, CancellationToken cancellationToken)
        {
            var result = await _locationService.GetByFilterAsync(filter, cancellationToken);
            var apiResponse = new ApiResponse(true, "Locations filtered successfully.", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }
    }
}
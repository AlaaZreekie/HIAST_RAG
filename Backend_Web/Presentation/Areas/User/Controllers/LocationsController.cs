using Application.Dtos.LocationDtos;
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
    public class LocationsController : BaseGuestController
    {
        private readonly ILocationService _locationService;
        public LocationsController(ILocationService locationService, IAuthenticationService authenticationService, IJsonFieldsSerializer jsonFieldsSerializer)
            : base(authenticationService, jsonFieldsSerializer)
        {
            _locationService = locationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllLocations(CancellationToken cancellationToken)
        {
            var result = await _locationService.GetAllAsync(cancellationToken);
            var apiResponse = new ApiResponse(true, "Locations retrieved successfully", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpGet]
        public async Task<IActionResult> GetByFilter([FromQuery] LocationFilterDto filter, CancellationToken cancellationToken)
        {
            var result = await _locationService.GetByFilterAsync(filter, cancellationToken);
            var apiResponse = new ApiResponse(true, "Locations filtered successfully.", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }
    }
} 
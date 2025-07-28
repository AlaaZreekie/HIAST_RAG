using Application.Dtos.SlideDtos;
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
using Infrastructure.Services;

namespace Backend_Web.Presentation.Areas.User.Controllers
{
    [Area("User")]
    [Route("api/[area]/[controller]/[action]")]
    public class SlideController : BaseGuestController
    {
        private readonly ISliderService _slideService;
        public SlideController(ISliderService slideService, IAuthenticationService authenticationService, IJsonFieldsSerializer jsonFieldsSerializer)
            : base(authenticationService, jsonFieldsSerializer)
        {
            _slideService = slideService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSlides(CancellationToken cancellationToken)
        {
            var result = await _slideService.GetAllAsync(cancellationToken);
            var apiResponse = new ApiResponse(true, "Slides retrieved successfully", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpGet]
        public async Task<IActionResult> GetByFilter([FromQuery] SliderFilterDto filter, CancellationToken cancellationToken)
        {
            var result = await _slideService.GetByFilterAsync(filter, cancellationToken);
            var apiResponse = new ApiResponse(true, "Slides filtered successfully.", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }
    }
} 
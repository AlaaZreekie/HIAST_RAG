using Application.Dtos.MediaCategoryDtos;
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
    public class MediaCategoryController : BaseGuestController
    {
        private readonly IMediaCategoryService _mediaCategoryService;
        public MediaCategoryController(IMediaCategoryService mediaCategoryService, IAuthenticationService authenticationService, IJsonFieldsSerializer jsonFieldsSerializer)
            : base(authenticationService, jsonFieldsSerializer)
        {
            _mediaCategoryService = mediaCategoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMediaCategories(CancellationToken cancellationToken)
        {
            var result = await _mediaCategoryService.GetAllAsync(cancellationToken);
            var apiResponse = new ApiResponse(true, "Media categories retrieved successfully", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpGet]
        public async Task<IActionResult> GetByFilter([FromQuery] MediaCategoryFilterDto filter, CancellationToken cancellationToken)
        {
            var result = await _mediaCategoryService.GetByFilterAsync(filter, cancellationToken);
            var apiResponse = new ApiResponse(true, "Media categories filtered successfully.", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }
    }
} 
using Application.Dtos.MediaDtos;
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
    public class MediaController : BaseGuestController
    {
        private readonly IMediaService _mediaService;
        public MediaController(IMediaService mediaService, IAuthenticationService authenticationService, IJsonFieldsSerializer jsonFieldsSerializer)
            : base(authenticationService, jsonFieldsSerializer)
        {
            _mediaService = mediaService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllMedia(CancellationToken cancellationToken)
        {
            var result = await _mediaService.GetAllAsync(cancellationToken);
            var apiResponse = new ApiResponse(true, "Media retrieved successfully", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpGet]
        public async Task<IActionResult> GetByFilter([FromQuery] MediaFilterDto filter, CancellationToken cancellationToken)
        {
            var result = await _mediaService.GetByFilterAsync(filter, cancellationToken);
            var apiResponse = new ApiResponse(true, "Media filtered successfully.", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }
    }
} 
using Application.Dtos.PostDtos;
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
    public class PostsController : BaseGuestController
    {
        private readonly IPostService _postService;
        public PostsController(IPostService postService, IAuthenticationService authenticationService, IJsonFieldsSerializer jsonFieldsSerializer)
            : base(authenticationService, jsonFieldsSerializer)
        {
            _postService = postService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPosts(CancellationToken cancellationToken)
        {
            var result = await _postService.GetAllAsync(cancellationToken);
            var apiResponse = new ApiResponse(true, "Posts retrieved successfully", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpGet]
        public async Task<IActionResult> GetByFilter([FromQuery] PostFilterDto filter, CancellationToken cancellationToken)
        {
            var result = await _postService.GetByFilterAsync(filter, cancellationToken);
            var apiResponse = new ApiResponse(true, "Posts filtered successfully.", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }
    }
} 
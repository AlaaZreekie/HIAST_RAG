using Application.Dtos.PageDtos;
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
    public class PagesController : BaseGuestController
    {
        private readonly IPageService _pageService;
        public PagesController(IPageService pageService, IAuthenticationService authenticationService, IJsonFieldsSerializer jsonFieldsSerializer)
            : base(authenticationService, jsonFieldsSerializer)
        {
            _pageService = pageService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPages(CancellationToken cancellationToken)
        {
            var result = await _pageService.GetAllAsync(cancellationToken);
            var apiResponse = new ApiResponse(true, "Pages retrieved successfully", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpGet]
        public async Task<IActionResult> GetByFilter([FromQuery] PageFilterDto filter, CancellationToken cancellationToken)
        {
            var result = await _pageService.GetByFilterAsync(filter, cancellationToken);
            var apiResponse = new ApiResponse(true, "Pages filtered successfully.", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }
    }
} 
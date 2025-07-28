using Application.Dtos.CategoryDtos;
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
    public class CategoriesController : BaseGuestController
    {
        private readonly ICategoryService _categoryService;
        public CategoriesController(ICategoryService categoryService, IAuthenticationService authenticationService, IJsonFieldsSerializer jsonFieldsSerializer)
            : base(authenticationService, jsonFieldsSerializer)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCategories(CancellationToken cancellationToken)
        {
            var result = await _categoryService.GetAllAsync(cancellationToken);
            var apiResponse = new ApiResponse(true, "Categories retrieved successfully", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpGet]
        public async Task<IActionResult> GetByFilter([FromQuery] CategoryFilterDto filter, CancellationToken cancellationToken)
        {
            var result = await _categoryService.GetByFilterAsync(filter, cancellationToken);
            var apiResponse = new ApiResponse(true, "Categories filtered successfully.", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }
    }
} 
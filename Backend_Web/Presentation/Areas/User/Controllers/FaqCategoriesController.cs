using Application.Dtos.FaqCategoryDtos;
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
    public class FaqCategoriesController : BaseGuestController
    {
        private readonly IFaqCategoryService _faqCategoryService;
        public FaqCategoriesController(IFaqCategoryService faqCategoryService, IAuthenticationService authenticationService, IJsonFieldsSerializer jsonFieldsSerializer)
            : base(authenticationService, jsonFieldsSerializer)
        {
            _faqCategoryService = faqCategoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllFaqCategories(CancellationToken cancellationToken)
        {
            var result = await _faqCategoryService.GetAllAsync(cancellationToken);
            var apiResponse = new ApiResponse(true, "Faq categories retrieved successfully", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpGet]
        public async Task<IActionResult> GetByFilter([FromQuery] FaqCategoryFilterDto filter, CancellationToken cancellationToken)
        {
            var result = await _faqCategoryService.GetByFilterAsync(filter, cancellationToken);
            var apiResponse = new ApiResponse(true, "Faq categories filtered successfully.", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }
    }
} 
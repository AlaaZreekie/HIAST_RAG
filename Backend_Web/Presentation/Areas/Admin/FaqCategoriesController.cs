using API.Controllers;
using Application.Common;
using Application.DTO.CommonDTO;
using Application.Dtos.FaqCategoryDtos;
using Application.DTOs.Actions;
using Application.IApplicationServices.Authentication;
using Application.IServices;
using Application.Serializer;
using Domain.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace HIAST.API.Areas.Admin.Controllers
{
    [Area(DefaultSetting.AdminRoleName)]
    [Route("api/[area]/[controller]/[action]")]
    [Authorize(Roles = DefaultSetting.AdminRoleName)]
    public class FaqCategoriesController : BaseAuthenticatedController
    {
        private readonly IFaqCategoryService _faqCategoryService;

        public FaqCategoriesController(
            IFaqCategoryService faqCategoryService,
            IAuthenticationService authenticationService,
            IJsonFieldsSerializer jsonFieldsSerializer)
            : base(authenticationService, jsonFieldsSerializer)
        {
            _faqCategoryService = faqCategoryService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllFaqCategories(CancellationToken cancellationToken)
        {
            var result = await _faqCategoryService.GetAllAsync(cancellationToken);
            var apiResponse = new ApiResponse(true, "FAQ Categories retrieved successfully.", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpPost("Filter")]
        public async Task<IActionResult> GetFaqCategoriesByFilter([FromBody] FaqCategoryFilterDto filter, CancellationToken cancellationToken)
        {
            var result = await _faqCategoryService.GetByFilterAsync(filter, cancellationToken);
            var apiResponse = new ApiResponse(true, "FAQ Categories filtered successfully.", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpPost]
        public async Task<IActionResult> CreateFaqCategory([FromBody] CreateFaqCategoryDto dto, CancellationToken cancellationToken)
        {
            var result = await _faqCategoryService.CreateAsync(dto, cancellationToken);
            var apiResponse = new ApiResponse(true, "FAQ Category created successfully.", StatusCodes.Status201Created, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateFaqCategory([FromBody] UpdateFaqCategoryDto dto, CancellationToken cancellationToken)
        {
            await _faqCategoryService.UpdateAsync(dto, cancellationToken);
            var apiResponse = new ApiResponse(true, "FAQ Category updated successfully.", StatusCodes.Status200OK, null);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteFaqCategory([FromBody] BaseDto<Guid> dto, CancellationToken cancellationToken)
        {
            await _faqCategoryService.DeleteAsync(dto.Id, cancellationToken);
            var apiResponse = new ApiResponse(true, "FAQ Category deleted successfully.", StatusCodes.Status200OK, null);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }
    }
}
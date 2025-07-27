using API.Controllers;
using Application.Common;
using Application.DTO.CommonDTO;
using Application.Dtos.TrainingCourseCategoryDtos;
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
    public class TrainingCourseCategoriesController(
        ITrainingCourseCategoryService categoryService,
        IAuthenticationService authenticationService,
        IJsonFieldsSerializer jsonFieldsSerializer) : BaseAuthenticatedController(authenticationService, jsonFieldsSerializer)
    {
        private readonly ITrainingCourseCategoryService _categoryService = categoryService;

        [HttpGet]
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
        {
            var result = await _categoryService.GetAllAsync(cancellationToken);
            var apiResponse = new ApiResponse(true, "Categories retrieved successfully", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpPost]
        public async Task<IActionResult> GetByFilter([FromBody] TrainingCourseCategoryFilterDto filter, CancellationToken cancellationToken)
        {
            var result = await _categoryService.GetByFilterAsync(filter, cancellationToken);
            var apiResponse = new ApiResponse(true, "Categories filtered successfully", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTrainingCourseCategoryDto dto, CancellationToken cancellationToken)
        {
            var result = await _categoryService.CreateAsync(dto, cancellationToken);
            var apiResponse = new ApiResponse(true, "Category created successfully", StatusCodes.Status201Created, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateTrainingCourseCategoryDto dto, CancellationToken cancellationToken)
        {
            await _categoryService.UpdateAsync(dto, cancellationToken);
            var apiResponse = new ApiResponse(true, "Category updated successfully", StatusCodes.Status200OK, null);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] BaseDto<Guid> dto, CancellationToken cancellationToken)
        {
            await _categoryService.DeleteAsync(dto.Id, cancellationToken);
            var apiResponse = new ApiResponse(true, "Category deleted successfully", StatusCodes.Status200OK, null);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }
    }
}
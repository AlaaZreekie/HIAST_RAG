using API.Controllers;
using Application.Common;
using Application.DTO.CommonDTO;
using Application.Dtos.MediaCategoryDtos;
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

namespace HIAST.API.Areas.Admin.Controllers;

[Area(DefaultSetting.AdminRoleName)]
[Route("api/[area]/[controller]/[action]")]
[Authorize(Roles = DefaultSetting.AdminRoleName)]
public class MediaCategoriesController(
    IMediaCategoryService mediaCategoryService,
    IAuthenticationService authenticationService,
    IJsonFieldsSerializer jsonFieldsSerializer) : BaseAuthenticatedController(authenticationService, jsonFieldsSerializer)
{
    private readonly IMediaCategoryService _mediaCategoryService = mediaCategoryService;

    [HttpGet]
    public async Task<IActionResult> GetAllMediaCategories(CancellationToken cancellationToken)
    {
        var result = await _mediaCategoryService.GetAllAsync(cancellationToken);
        var apiResponse = new ApiResponse(true, "Media Categories retrieved successfully", StatusCodes.Status200OK, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPost]
    public async Task<IActionResult> CreateMediaCategory([FromBody] CreateMediaCategoryDto dto, CancellationToken cancellationToken)
    {
        var result = await _mediaCategoryService.CreateAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Media Category created successfully", StatusCodes.Status201Created, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPut]
    public async Task<IActionResult> UpdateMediaCategory([FromBody] UpdateMediaCategoryDto dto, CancellationToken cancellationToken)
    {
        await _mediaCategoryService.UpdateAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Media Category updated successfully.", StatusCodes.Status200OK, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteMediaCategory([FromBody] BaseDto<Guid> dto, CancellationToken cancellationToken)
    {
        await _mediaCategoryService.DeleteAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Media Category deleted successfully.", StatusCodes.Status200OK, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPost]
    public async Task<IActionResult> AddMediaCategoryTranslation([FromBody] AddMediaCategoryTranslationDto dto, CancellationToken cancellationToken)
    {
        await _mediaCategoryService.AddTranslationAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Media Category translation added successfully", StatusCodes.Status201Created, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpGet]
    public async Task<IActionResult> GetByFilter([FromQuery] MediaCategoryFilterDto filter, CancellationToken cancellationToken)
    {
        var result = await _mediaCategoryService.GetByFilterAsync(filter, cancellationToken);
        var apiResponse = new ApiResponse(true, "Media Categories filtered successfully.", StatusCodes.Status200OK, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }
}
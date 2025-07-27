using API.Controllers;
using Application.Common;
using Application.DTO.CommonDTO;
using Application.Dtos.PageDtos;
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
public class PagesController(
    IPageService pageService,
    IAuthenticationService authenticationService,
    IJsonFieldsSerializer jsonFieldsSerializer) : BaseAuthenticatedController(authenticationService, jsonFieldsSerializer)
{
    private readonly IPageService _pageService = pageService;

    [HttpGet]
    public async Task<IActionResult> GetAllPages(CancellationToken cancellationToken)
    {
        var result = await _pageService.GetAllAsync(cancellationToken);
        var apiResponse = new ApiResponse(true, "Pages retrieved successfully", StatusCodes.Status200OK, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPost]
    public async Task<IActionResult> CreatePage([FromBody] CreatePageDto dto, CancellationToken cancellationToken)
    {
        var result = await _pageService.CreateAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Page created successfully", StatusCodes.Status201Created, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPut]
    public async Task<IActionResult> UpdatePage([FromBody] UpdatePageDto dto, CancellationToken cancellationToken)
    {
        await _pageService.UpdateAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Page updated successfully.", StatusCodes.Status200OK, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpDelete]
    public async Task<IActionResult> DeletePage([FromBody] BaseDto<Guid> dto, CancellationToken cancellationToken)
    {
        await _pageService.DeleteAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Page deleted successfully.", StatusCodes.Status200OK, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPost]
    public async Task<IActionResult> AddPageTranslation([FromBody] AddPageTranslationDto dto, CancellationToken cancellationToken)
    {
        await _pageService.AddTranslationAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Page translation added successfully", StatusCodes.Status201Created, null);
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
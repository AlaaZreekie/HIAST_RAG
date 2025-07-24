using API.Controllers;
using Application.Common;
using Application.DTO.CommonDTO;
using Application.Dtos.CourseGroupDtos; 
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
public class CourseGroupsController(
    ICourseGroupService courseGroupService,
    IAuthenticationService authenticationService,
    IJsonFieldsSerializer jsonFieldsSerializer) : BaseAuthenticatedController(authenticationService, jsonFieldsSerializer)
{
    private readonly ICourseGroupService _courseGroupService = courseGroupService;

    [HttpGet]
    public async Task<IActionResult> GetAllCourseGroups(CancellationToken cancellationToken)
    {
        var result = await _courseGroupService.GetAllAsync(cancellationToken);
        var apiResponse = new ApiResponse(true, "Course Groups retrieved successfully", StatusCodes.Status200OK, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPost]
    public async Task<IActionResult> CreateCourseGroup([FromBody] CreateCourseGroupDto dto, CancellationToken cancellationToken)
    {
        var result = await _courseGroupService.CreateAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Course Group created successfully", StatusCodes.Status201Created, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPut]
    public async Task<IActionResult> UpdateCourseGroup([FromBody] UpdateCourseGroupDto dto, CancellationToken cancellationToken)
    {
        await _courseGroupService.UpdateAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Course Group updated successfully.", StatusCodes.Status200OK, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteCourseGroup([FromBody] BaseDto<Guid> dto, CancellationToken cancellationToken)
    {
        await _courseGroupService.DeleteAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Course Group deleted successfully.", StatusCodes.Status200OK, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPost]
    public async Task<IActionResult> AddCourseGroupTranslation([FromBody] AddCourseGroupTranslationDto dto, CancellationToken cancellationToken)
    {
        await _courseGroupService.AddTranslationAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Course Group translation added successfully", StatusCodes.Status201Created, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpGet]
    public async Task<IActionResult> GetByFilter([FromQuery] CourseGroupFilterDto filter, CancellationToken cancellationToken)
    {
        var result = await _courseGroupService.GetByFilterAsync(filter, cancellationToken);
        var apiResponse = new ApiResponse(true, "Course Groups filtered successfully.", StatusCodes.Status200OK, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }
}
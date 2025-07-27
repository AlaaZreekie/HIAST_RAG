using API.Controllers;
using Application.Common;
using Application.DTO.CommonDTO;
using Application.Dtos.CourseDtos;
using Application.DTOs.Actions;
using Application.IApplicationServices.Authentication;
using Application.IServices;
using Application.Serializer;
using Domain.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors.Infrastructure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Presentation.Areas.Admin;

[Area(DefaultSetting.AdminRoleName)]
[Route("api/[area]/[controller]/[action]")]
[Authorize(Roles = DefaultSetting.AdminRoleName)]
public class CoursesController(
    ICourseService courseService,
    IAuthenticationService authenticationService,
    IJsonFieldsSerializer jsonFieldsSerializer) : BaseAuthenticatedController(authenticationService, jsonFieldsSerializer)
{
    private readonly ICourseService _courseService = courseService;

    [HttpGet]
    public async Task<IActionResult> GetAllCourses(CancellationToken cancellationToken)
    {
        var result = await _courseService.GetAllAsync(cancellationToken);
        var apiResponse = new ApiResponse(true, "Courses retrieved successfully", StatusCodes.Status200OK, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPost]
    public async Task<IActionResult> CreateCourse([FromBody] CreateCourseDto dto, CancellationToken cancellationToken)
    {
        var result = await _courseService.CreateAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Course created successfully", StatusCodes.Status201Created, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPut]
    public async Task<IActionResult> UpdateCourse([FromBody] UpdateCourseDto dto, CancellationToken cancellationToken)
    {
        await _courseService.UpdateAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Course updated successfully.", StatusCodes.Status200OK, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteCourse([FromBody] BaseDto<Guid> dto, CancellationToken cancellationToken)
    {
        await _courseService.DeleteAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Course deleted successfully.", StatusCodes.Status200OK, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpGet]
    public async Task<IActionResult> GetByFilter([FromQuery] CourseFilterDto filter, CancellationToken cancellationToken)
    {
        var result = await _courseService.GetByFilterAsync(filter, cancellationToken);
        var apiResponse = new ApiResponse(true, "Courses filtered successfully.", StatusCodes.Status200OK, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPost]
    public async Task<IActionResult> AddCourseTranslation([FromBody] AddCourseTranslationDto dto, CancellationToken cancellationToken)
    {
        await _courseService.AddTranslationAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Course translation added successfully", StatusCodes.Status201Created, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }
}
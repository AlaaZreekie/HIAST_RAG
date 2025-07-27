using API.Controllers;
using Application.Common;
using Application.DTO.CommonDTO;
using Application.Dtos.CurriculumDtos;
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
public class CurriculumsController(
    ICurriculumService curriculumService,
    IAuthenticationService authenticationService,
    IJsonFieldsSerializer jsonFieldsSerializer) : BaseAuthenticatedController(authenticationService, jsonFieldsSerializer)
{
    private readonly ICurriculumService _curriculumService = curriculumService;

    [HttpGet]
    public async Task<IActionResult> GetAllCurriculums(CancellationToken cancellationToken)
    {
        var result = await _curriculumService.GetAllAsync(cancellationToken);
        var apiResponse = new ApiResponse(true, "Curriculum entries retrieved successfully", StatusCodes.Status200OK, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPost]
    public async Task<IActionResult> CreateCurriculum([FromBody] CreateCurriculumDto dto, CancellationToken cancellationToken)
    {
        var result = await _curriculumService.CreateAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Curriculum entry created successfully", StatusCodes.Status201Created, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPut]
    public async Task<IActionResult> UpdateCurriculum([FromBody] UpdateCurriculumDto dto, CancellationToken cancellationToken)
    {
        await _curriculumService.UpdateAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Curriculum entry updated successfully.", StatusCodes.Status200OK, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteCurriculum([FromBody] BaseDto<Guid> dto, CancellationToken cancellationToken)
    {
        await _curriculumService.DeleteAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Curriculum entry deleted successfully.", StatusCodes.Status200OK, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpGet]
    public async Task<IActionResult> GetByFilter([FromQuery] CurriculumFilterDto filter, CancellationToken cancellationToken)
    {
        var result = await _curriculumService.GetByFilterAsync(filter, cancellationToken);
        var apiResponse = new ApiResponse(true, "Curriculum entries filtered successfully.", StatusCodes.Status200OK, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }
}
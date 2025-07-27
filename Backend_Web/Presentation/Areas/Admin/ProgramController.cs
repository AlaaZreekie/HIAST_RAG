using API.Controllers;
using Application.Common;
using Application.DTO.CommonDTO;
using Application.Dtos.ProgramDtos;
using Application.DTOs.Actions;
using Application.IApplicationServices.Authentication;
using Application.IServices;
using Application.Serializer;
using Domain.Common;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HIAST.API.Areas.Admin.Controllers;

[Area(DefaultSetting.AdminRoleName)]
[Route("api/[area]/[controller]/[action]")]
[Authorize(Roles = DefaultSetting.AdminRoleName)]
public class ProgramsController(
    IProgramService programService,
    IAuthenticationService authenticationService,
    IJsonFieldsSerializer jsonFieldsSerializer) : BaseAuthenticatedController(authenticationService, jsonFieldsSerializer)
{
    private readonly IProgramService _programService = programService;

    [HttpGet]
    public async Task<IActionResult> GetAllPrograms(CancellationToken cancellationToken)
    {
        var result = await _programService.GetAllAsync(cancellationToken);
        var apiResponse = new ApiResponse(true, "Programs retrieved successfully", StatusCodes.Status200OK, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPost]
    public async Task<IActionResult> CreateProgram([FromBody] CreateProgramDto dto, CancellationToken cancellationToken)
    {
        var result = await _programService.CreateAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Program created successfully", StatusCodes.Status201Created, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPut]
    public async Task<IActionResult> UpdateProgram([FromBody] UpdateProgramDto dto, CancellationToken cancellationToken)
    {
        await _programService.UpdateAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Program updated successfully.", StatusCodes.Status200OK, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteProgram([FromBody] BaseDto<Guid> dto, CancellationToken cancellationToken)
    {
        await _programService.DeleteAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Program deleted successfully.", StatusCodes.Status200OK, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPost]
    public async Task<IActionResult> AddProgramTranslation([FromBody] AddProgramTranslationDto dto, CancellationToken cancellationToken)
    {
        await _programService.AddTranslationAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Program translation added successfully", StatusCodes.Status201Created, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpGet]
    public async Task<IActionResult> GetByFilter([FromQuery] ProgramFilterDto filter, CancellationToken cancellationToken)
    {
        var result = await _programService.GetByFilterAsync(filter, cancellationToken);
        var apiResponse = new ApiResponse(true, "Programs filtered successfully.", StatusCodes.Status200OK, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }
}
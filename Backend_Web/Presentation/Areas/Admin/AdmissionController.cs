using API.Controllers;
using Application.Common;
using Application.DTO.CommonDTO;
using Application.Dtos.AdmissionDtos;
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
public class AdmissionsController(
    IAdmissionService admissionService,
    IAuthenticationService authenticationService,
    IJsonFieldsSerializer jsonFieldsSerializer) : BaseAuthenticatedController(authenticationService, jsonFieldsSerializer)
{
    private readonly IAdmissionService _admissionService = admissionService;

    [HttpPost]
    public async Task<IActionResult> CreateAdmission([FromBody] CreateAdmissionDto dto, CancellationToken cancellationToken)
    {
        var result = await _admissionService.CreateAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Admission created successfully", StatusCodes.Status201Created, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPut]
    public async Task<IActionResult> UpdateAdmission([FromBody] UpdateAdmissionDto dto, CancellationToken cancellationToken)
    {
        await _admissionService.UpdateAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Admission updated successfully.", StatusCodes.Status200OK, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteAdmission([FromBody] BaseDto<Guid> dto, CancellationToken cancellationToken)
    {
        await _admissionService.DeleteAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Admission deleted successfully.", StatusCodes.Status200OK, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpGet]
    public async Task<IActionResult> GetAllAdmissions(CancellationToken cancellationToken)
    {
        var result = await _admissionService.GetAllAsync(cancellationToken);
        var apiResponse = new ApiResponse(true, "Admissions retrieved successfully", StatusCodes.Status200OK, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpGet]
    public async Task<IActionResult> GetByFilter([FromQuery] AdmissionFilterDto filter, CancellationToken cancellationToken)
    {
        var result = await _admissionService.GetByFilterAsync(filter, cancellationToken);
        var apiResponse = new ApiResponse(true, "Admissions filtered successfully.", StatusCodes.Status200OK, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }
}
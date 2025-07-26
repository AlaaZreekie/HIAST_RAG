using API.Controllers;
using Application.Common;
using Application.DTO.CommonDTO;
using Application.Dtos.AdmissionResultDtos;
using Application.DTOs.Actions;
using Application.IApplicationServices.Authentication;
using Application.IServices;
using Application.Serializer;
using Domain.Common;
using Infrastructure.Services;
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
public class AdmissionResultsController(
    IAdmissionResultService resultService,
    IAuthenticationService authenticationService,
    IJsonFieldsSerializer jsonFieldsSerializer,
    IFileService fileService,
    IMediaService mediaService) : BaseAuthenticatedController(authenticationService, jsonFieldsSerializer)
{
    private readonly IAdmissionResultService _resultService = resultService;
    private readonly IFileService _fileService = fileService;
    private readonly IMediaService _mediaService = mediaService;

    [HttpPost]
    public async Task<IActionResult> CreateResult([FromForm] CreateAdmissionResultWithFileDto dto, CancellationToken cancellationToken)
    {
        dto.CreateMedia.SavedFileDetails = await _fileService.SaveFileAsync(dto.CreateMedia.File);
        var result = await _resultService.CreateAsync(dto, (await _mediaService.CreateAsync(dto.CreateMedia, cancellationToken)).Id, cancellationToken);
        var apiResponse = new ApiResponse(true, "Admission result created successfully", StatusCodes.Status201Created, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPut]
    public async Task<IActionResult> UpdateResult([FromBody] UpdateAdmissionResultDto dto, CancellationToken cancellationToken)
    {
        await _resultService.UpdateAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Admission result updated successfully.", StatusCodes.Status200OK, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteResult([FromBody] BaseDto<Guid> dto, CancellationToken cancellationToken)
    {
        var mediaPathToDelete = await _resultService.DeleteAsync(dto, cancellationToken);
        _fileService.DeleteFile(mediaPathToDelete!);
        var apiResponse = new ApiResponse(true, "Admission result and associated file deleted successfully.", StatusCodes.Status200OK, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpGet]
    public async Task<IActionResult> GetAllResults(CancellationToken cancellationToken)
    {
        var result = await _resultService.GetAllAsync(cancellationToken);
        var apiResponse = new ApiResponse(true, "All admission results retrieved successfully", StatusCodes.Status200OK, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpGet]
    public async Task<IActionResult> GetByFilter([FromQuery] AdmissionResultFilterDto filter, CancellationToken cancellationToken)
    {
        var result = await _resultService.GetByFilterAsync(filter, cancellationToken);
        var apiResponse = new ApiResponse(true, "Admission results filtered successfully.", StatusCodes.Status200OK, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }
}
using API.Controllers;
using Application.Common;
using Application.DTO.CommonDTO;
using Application.Dtos.MediaDtos;
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
public class MediasController(
    IMediaService mediaService,
    IFileService fileService,
    IAuthenticationService authenticationService,
    IJsonFieldsSerializer jsonFieldsSerializer) : BaseAuthenticatedController(authenticationService, jsonFieldsSerializer)
{
    private readonly IMediaService _mediaService = mediaService;
    private readonly IFileService _fileService = fileService;

    [HttpPost]
    public async Task<IActionResult> CreateMedia([FromForm] CreateMediaDto dto, CancellationToken cancellationToken)
    {
        dto.SavedFileDetails = await _fileService.SaveFileAsync(dto.File);
        var result = await _mediaService.CreateAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Media file uploaded successfully", StatusCodes.Status201Created, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPut]
    public async Task<IActionResult> UpdateMedia([FromBody] UpdateMediaDto dto, CancellationToken cancellationToken)
    {
        await _mediaService.UpdateAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Media file updated successfully.", StatusCodes.Status200OK, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteMedia([FromBody] BaseDto<Guid> dto, CancellationToken cancellationToken)
    {
        var filePathToDelete = await _mediaService.DeleteAsync(dto, cancellationToken);        
        _fileService.DeleteFile(filePathToDelete!);
        var apiResponse = new ApiResponse(true, "Media file deleted successfully.", StatusCodes.Status200OK, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpGet]
    public async Task<IActionResult> GetByFilter([FromQuery] MediaFilterDto filter, CancellationToken cancellationToken)
    {
        var result = await _mediaService.GetByFilterAsync(filter, cancellationToken);
        var apiResponse = new ApiResponse(true, "Media files filtered successfully.", StatusCodes.Status200OK, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpGet]
    public async Task<IActionResult> GetAllMedias(CancellationToken cancellationToken)
    {
        var result = await _mediaService.GetAllAsync(cancellationToken);
        var apiResponse = new ApiResponse(true, "All media files retrieved successfully", StatusCodes.Status200OK, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }
}
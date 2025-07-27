using API.Controllers;
using Application.Common;
using Application.DTO.CommonDTO;
using Application.Dtos.SlideDtos;
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
public class SlidersController(
    ISliderService sliderService,
    IMediaService mediaService,
    IFileService fileService,
    IAuthenticationService authenticationService,
    IJsonFieldsSerializer jsonFieldsSerializer) : BaseAuthenticatedController(authenticationService, jsonFieldsSerializer)
{
    private readonly ISliderService _sliderService = sliderService;
    private readonly IMediaService _mediaService = mediaService;
    private readonly IFileService _fileService = fileService;

    [HttpPost]
    public async Task<IActionResult> CreateSlider([FromForm] CreateSliderWithFileDto dto, CancellationToken cancellationToken)
    {
        dto.CreateMedia.SavedFileDetails = await _fileService.SaveFileAsync(dto.CreateMedia.File);
        var createdMedia = await _mediaService.CreateAsync(dto.CreateMedia, cancellationToken);
        var newSliderId = await _sliderService.CreateAsync(dto, createdMedia.Id, cancellationToken);
        var apiResponse = new ApiResponse(true, "Slider created successfully", StatusCodes.Status201Created, new { Id = newSliderId });
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPut]
    public async Task<IActionResult> UpdateSlider([FromBody] UpdateSliderDto dto, CancellationToken cancellationToken)
    {
        await _sliderService.UpdateAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Slider updated successfully.", StatusCodes.Status200OK, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteSlider([FromBody] BaseDto<Guid> dto, CancellationToken cancellationToken)
    {
        var mediaPathToDelete = await _sliderService.DeleteAsync(dto, cancellationToken);        
        _fileService.DeleteFile(mediaPathToDelete??"");        
        var apiResponse = new ApiResponse(true, "Slider and associated file deleted successfully.", StatusCodes.Status200OK, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpGet]
    public async Task<IActionResult> GetAllSliders(CancellationToken cancellationToken)
    {
        var result = await _sliderService.GetAllAsync(cancellationToken);
        var apiResponse = new ApiResponse(true, "All sliders retrieved successfully", StatusCodes.Status200OK, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpGet]
    public async Task<IActionResult> GetByFilter([FromQuery] SliderFilterDto filter, CancellationToken cancellationToken)
    {
        var result = await _sliderService.GetByFilterAsync(filter, cancellationToken);
        var apiResponse = new ApiResponse(true, "Sliders filtered successfully.", StatusCodes.Status200OK, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }
}
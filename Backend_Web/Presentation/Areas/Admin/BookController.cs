using API.Controllers;
using Application.Common;
using Application.DTO.CommonDTO;
using Application.Dtos.BookDtos;
using Application.Dtos.MediaDtos;
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
public class BooksController(
    IBookService bookService,
    IMediaService mediaService,
    IFileService fileService,
    IAuthenticationService authenticationService,
    IJsonFieldsSerializer jsonFieldsSerializer) : BaseAuthenticatedController(authenticationService, jsonFieldsSerializer)
{
    private readonly IBookService _bookService = bookService;
    private readonly IMediaService _mediaService = mediaService;
    private readonly IFileService _fileService = fileService;

    [HttpGet]
    public async Task<IActionResult> GetAllBooks(CancellationToken cancellationToken)
    {
        var result = await _bookService.GetAllAsync(cancellationToken);
        var apiResponse = new ApiResponse(true, "Books retrieved successfully", StatusCodes.Status200OK, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPost]
    public async Task<IActionResult> CreateBook([FromForm] CreateBookWithFilesDto dto, CancellationToken cancellationToken)
    {
        var createdCoverMedia = await _mediaService.CreateAsync(new CreateMediaDto{SavedFileDetails = await _fileService.SaveFileAsync(dto.CreateCover.File), File = dto.CreateCover.File, MediaCategoryId = dto.CreateCover.MediaCategoryId }, cancellationToken);
        var createdBookFile = await _mediaService.CreateAsync(new CreateMediaDto { SavedFileDetails = await _fileService.SaveFileAsync(dto.CreateFile.File), File = dto.CreateFile.File, MediaCategoryId = dto.CreateFile.MediaCategoryId }, cancellationToken);
        var result = await _bookService.CreateAsync(dto, createdCoverMedia.Id, createdBookFile.Id, cancellationToken);
        var apiResponse = new ApiResponse(true, "Book created successfully", StatusCodes.Status201Created, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPut]
    public async Task<IActionResult> UpdateBook([FromBody] UpdateBookDto dto, CancellationToken cancellationToken)
    {
        await _bookService.UpdateAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Book updated successfully.", StatusCodes.Status200OK, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteBook([FromBody] BaseDto<Guid> dto, CancellationToken cancellationToken)
    {
        var (coverPath, isCoverSafeToDelete, filePath, isFileSafeToDelete) = await _bookService.DeleteAsync(dto, cancellationToken);
        if (isCoverSafeToDelete) _fileService.DeleteFile(coverPath!);  
        if (isFileSafeToDelete) _fileService.DeleteFile(filePath!);
        var apiResponse = new ApiResponse(true, "Book deleted successfully. Associated files were handled based on usage.", StatusCodes.Status200OK, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPost]
    public async Task<IActionResult> AddBookTranslation([FromBody] AddBookTranslationDto dto, CancellationToken cancellationToken)
    {
        await _bookService.AddTranslationAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Book translation added successfully", StatusCodes.Status201Created, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpGet]
    public async Task<IActionResult> GetByFilter([FromQuery] BookFilterDto filter, CancellationToken cancellationToken)
    {
        var result = await _bookService.GetByFilterAsync(filter, cancellationToken);
        var apiResponse = new ApiResponse(true, "Books filtered successfully.", StatusCodes.Status200OK, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }
}
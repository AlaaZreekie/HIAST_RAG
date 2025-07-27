using API.Controllers;
using Application.Common;
using Application.DTO.CommonDTO;
using Application.Dtos.PostDtos;
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
public class PostsController(
    IPostService postService,
    IAuthenticationService authenticationService,
    IJsonFieldsSerializer jsonFieldsSerializer) : BaseAuthenticatedController(authenticationService, jsonFieldsSerializer)
{
    private readonly IPostService _postService = postService;

    [HttpGet]
    public async Task<IActionResult> GetAllPosts(CancellationToken cancellationToken)
    {
        var result = await _postService.GetAllAsync(cancellationToken);
        var apiResponse = new ApiResponse(true, "Posts retrieved successfully", StatusCodes.Status200OK, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPost]
    public async Task<IActionResult> CreatePost([FromBody] CreatePostDto dto, CancellationToken cancellationToken)
    {
        var authorId = (await _authenticationService.GetAuthenticatedUser()).Id;
        var result = await _postService.CreateAsync(dto, authorId, cancellationToken);
        var apiResponse = new ApiResponse(true, "Post created successfully", StatusCodes.Status201Created, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPut]
    public async Task<IActionResult> UpdatePost([FromBody] UpdatePostDto dto, CancellationToken cancellationToken)
    {
        await _postService.UpdateAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Post updated successfully.", StatusCodes.Status200OK, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpDelete]
    public async Task<IActionResult> DeletePost([FromBody] BaseDto<Guid> dto, CancellationToken cancellationToken)
    {
        await _postService.DeleteAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Post deleted successfully.", StatusCodes.Status200OK, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPost]
    public async Task<IActionResult> AddPostTranslation([FromBody] AddPostTranslationDto dto, CancellationToken cancellationToken)
    {
        await _postService.AddTranslationAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Post translation added successfully", StatusCodes.Status201Created, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpGet]
    public async Task<IActionResult> GetByFilter([FromQuery] PostFilterDto filter, CancellationToken cancellationToken)
    {
        var result = await _postService.GetByFilterAsync(filter, cancellationToken);
        var apiResponse = new ApiResponse(true, "Posts filtered successfully.", StatusCodes.Status200OK, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }
}
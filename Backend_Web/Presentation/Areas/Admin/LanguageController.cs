using API.Controllers;
using Application.Common;
using Application.DTOs.Actions;
using Application.Dtos.LanguageDtos;
using Application.Serializer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;
using Application.IServices;
using Application.IApplicationServices.Authentication;
using Microsoft.AspNetCore.Authorization;
using Domain.Common;
using Application.DTO.CommonDTO;

// Change: Update the namespace to reflect the new folder structure
namespace HIAST.API.Areas.Admin.Controllers;

// Change: Add the [Area("Admin")] attribute
[Area(DefaultSetting.AdminRoleName)]
// Change: Use convention-based routing that includes the area and controller name
[Route("api/[area]/[controller]/[action]")]
[Authorize(Roles = DefaultSetting.AdminRoleName)]
public class LanguagesController : BaseAuthenticatedController
{
    private readonly ILanguageService _languageService;

    public LanguagesController(ILanguageService languageService,IAuthenticationService authenticationService, IJsonFieldsSerializer jsonFieldsSerializer) : base(authenticationService, jsonFieldsSerializer)
    {
        _languageService = languageService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllLanguages(CancellationToken cancellationToken)
    {
        var result = await _languageService.GetAllAsync(cancellationToken);
        var apiResponse = new ApiResponse(true, "Languages retrieved successfully", StatusCodes.Status200OK, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPost]
    public async Task<IActionResult> CreateLanguage([FromBody] CreateLanguageDto dto, CancellationToken cancellationToken)
    {
        var result = await _languageService.CreateAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Language created successfully", StatusCodes.Status201Created, result);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpPut]
    public async Task<IActionResult> UpdateLanguage([FromBody] UpdateLanguageDto dto, CancellationToken cancellationToken)
    {        
        await _languageService.UpdateAsync(dto, cancellationToken);
        var apiResponse = new ApiResponse(true, "Language updated successfully", StatusCodes.Status200OK, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

    [HttpDelete]
    public async Task<IActionResult> DeleteLanguage([FromBody]BaseDto<Guid> dto, CancellationToken cancellationToken)
    {
        await _languageService.DeleteAsync(dto.Id, cancellationToken);
        var apiResponse = new ApiResponse(true, "Language deleted successfully", StatusCodes.Status200OK, null);
        return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
    }

}
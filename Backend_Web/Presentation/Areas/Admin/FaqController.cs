using API.Controllers;
using Application.Common;
using Application.DTO.CommonDTO;
using Application.Dtos.FaqDtos;
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

namespace HIAST.API.Areas.Admin.Controllers
{
    [Area(DefaultSetting.AdminRoleName)]
    [Route("api/[area]/[controller]/[action]")]
    [Authorize(Roles = DefaultSetting.AdminRoleName)]
    public class FaqsController : BaseAuthenticatedController
    {
        private readonly IFaqService _faqService;

        public FaqsController(
            IFaqService faqService,
            IAuthenticationService authenticationService,
            IJsonFieldsSerializer jsonFieldsSerializer)
            : base(authenticationService, jsonFieldsSerializer)
        {
            _faqService = faqService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllFaqs(CancellationToken cancellationToken)
        {
            var result = await _faqService.GetAllAsync(cancellationToken);
            var apiResponse = new ApiResponse(true, "FAQs retrieved successfully.", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpPost]
        public async Task<IActionResult> CreateFaq([FromBody] CreateFaqDto dto, CancellationToken cancellationToken)
        {
            var result = await _faqService.CreateAsync(dto, cancellationToken);
            var apiResponse = new ApiResponse(true, "FAQ created successfully.", StatusCodes.Status201Created, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpPost]
        public async Task<IActionResult> GetFaqsByFilter([FromBody] FaqFilterDto filter, CancellationToken cancellationToken)
        {
            var result = await _faqService.GetByFilterAsync(filter, cancellationToken);
            var apiResponse = new ApiResponse(true, "FAQs filtered successfully.", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateFaq([FromBody] UpdateFaqDto dto, CancellationToken cancellationToken)
        {
            await _faqService.UpdateAsync(dto, cancellationToken);
            var apiResponse = new ApiResponse(true, "FAQ updated successfully.", StatusCodes.Status200OK, null);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteFaq([FromBody] BaseDto<Guid> dto, CancellationToken cancellationToken)
        {
            await _faqService.DeleteAsync(dto.Id, cancellationToken);
            var apiResponse = new ApiResponse(true, "FAQ deleted successfully.", StatusCodes.Status200OK, null);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }
    }
}
using Application.Dtos.FaqDtos;
using Application.IServices;
using Application.Common;
using Application.DTOs.Actions;
using Application.Serializer;
using Application.IApplicationServices.Authentication;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using System.Threading.Tasks;
using API.Controllers;

namespace Backend_Web.Presentation.Areas.User.Controllers
{
    [Area("User")]
    [Route("api/[area]/[controller]/[action]")]
    public class FaqController : BaseGuestController
    {
        private readonly IFaqService _faqService;
        public FaqController(IFaqService faqService, IAuthenticationService authenticationService, IJsonFieldsSerializer jsonFieldsSerializer)
            : base(authenticationService, jsonFieldsSerializer)
        {
            _faqService = faqService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllFaqs(CancellationToken cancellationToken)
        {
            var result = await _faqService.GetAllAsync(cancellationToken);
            var apiResponse = new ApiResponse(true, "Faqs retrieved successfully", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpGet]
        public async Task<IActionResult> GetByFilter([FromQuery] FaqFilterDto filter, CancellationToken cancellationToken)
        {
            var result = await _faqService.GetByFilterAsync(filter, cancellationToken);
            var apiResponse = new ApiResponse(true, "Faqs filtered successfully.", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }
    }
} 
using Application.Dtos.AdmissionDtos;
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
    public class AdmissionsController : BaseGuestController
    {
        private readonly IAdmissionService _admissionService;
        public AdmissionsController(IAdmissionService admissionService, IAuthenticationService authenticationService, IJsonFieldsSerializer jsonFieldsSerializer)
            : base(authenticationService, jsonFieldsSerializer)
        {
            _admissionService = admissionService;
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
} 
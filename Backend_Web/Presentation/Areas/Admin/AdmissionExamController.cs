using API.Controllers;
using Application.Common;
using Application.DTO.CommonDTO;
using Application.Dtos.AdmissionExamDtos;
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
    public class AdmissionExamsController(
        IAdmissionExamService admissionExamService,
        IAuthenticationService authenticationService,
        IJsonFieldsSerializer jsonFieldsSerializer) : BaseAuthenticatedController(authenticationService, jsonFieldsSerializer)
    {
        private readonly IAdmissionExamService _admissionExamService = admissionExamService;

        [HttpGet]
        public async Task<IActionResult> GetAllAdmissionExams(CancellationToken cancellationToken)
        {
            var result = await _admissionExamService.GetAllAsync(cancellationToken);
            var apiResponse = new ApiResponse(true, "Admission exams retrieved successfully", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpGet]
        public async Task<IActionResult> GetByFilter([FromQuery] AdmissionExamFilterDto filter, CancellationToken cancellationToken)
        {
            var result = await _admissionExamService.GetByFilterAsync(filter, cancellationToken);
            var apiResponse = new ApiResponse(true, "Admission exams filtered successfully.", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpPost]
        public async Task<IActionResult> CreateAdmissionExam([FromBody] CreateAdmissionExamDto dto, CancellationToken cancellationToken)
        {
            var result = await _admissionExamService.CreateAsync(dto, cancellationToken);
            var apiResponse = new ApiResponse(true, "Admission exam created successfully", StatusCodes.Status201Created, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateAdmissionExam([FromBody] UpdateAdmissionExamDto dto, CancellationToken cancellationToken)
        {
            await _admissionExamService.UpdateAsync(dto, cancellationToken);
            var apiResponse = new ApiResponse(true, "Admission exam updated successfully.", StatusCodes.Status200OK, null);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteAdmissionExam([FromBody] BaseDto<Guid> dto, CancellationToken cancellationToken)
        {
            await _admissionExamService.DeleteAsync(dto.Id, cancellationToken);
            var apiResponse = new ApiResponse(true, "Admission exam deleted successfully.", StatusCodes.Status200OK, null);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }
    }
}
using API.Controllers;
using Application.Common;
using Application.DTO.CommonDTO;
using Application.Dtos.TrainingCourseDtos;
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
    public class TrainingCoursesController(
        ITrainingCourseService courseService,
        IAuthenticationService authenticationService,
        IJsonFieldsSerializer jsonFieldsSerializer) : BaseAuthenticatedController(authenticationService, jsonFieldsSerializer)
    {
        private readonly ITrainingCourseService _courseService = courseService;

        [HttpGet]
        public async Task<IActionResult> GetAll(CancellationToken cancellationToken)
        {
            var result = await _courseService.GetAllAsync(cancellationToken);
            var apiResponse = new ApiResponse(true, "Courses retrieved successfully", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpPost]
        public async Task<IActionResult> GetByFilter([FromBody] TrainingCourseFilterDto filter, CancellationToken cancellationToken)
        {
            var result = await _courseService.GetByFilterAsync(filter, cancellationToken);
            var apiResponse = new ApiResponse(true, "Courses filtered successfully", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateTrainingCourseDto dto, CancellationToken cancellationToken)
        {
            var result = await _courseService.CreateAsync(dto, cancellationToken);
            var apiResponse = new ApiResponse(true, "Course created successfully", StatusCodes.Status201Created, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpPut]
        public async Task<IActionResult> Update([FromBody] UpdateTrainingCourseDto dto, CancellationToken cancellationToken)
        {
            await _courseService.UpdateAsync(dto, cancellationToken);
            var apiResponse = new ApiResponse(true, "Course updated successfully", StatusCodes.Status200OK, null);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpDelete]
        public async Task<IActionResult> Delete([FromBody] BaseDto<Guid> dto, CancellationToken cancellationToken)
        {
            await _courseService.DeleteAsync(dto.Id, cancellationToken);
            var apiResponse = new ApiResponse(true, "Course deleted successfully", StatusCodes.Status200OK, null);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }
    }
}
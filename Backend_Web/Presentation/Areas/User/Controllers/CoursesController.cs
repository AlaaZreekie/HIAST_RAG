using Application.Dtos.CourseDtos;
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
    public class CoursesController : BaseGuestController
    {
        private readonly ICourseService _courseService;
        public CoursesController(ICourseService courseService, IAuthenticationService authenticationService, IJsonFieldsSerializer jsonFieldsSerializer)
            : base(authenticationService, jsonFieldsSerializer)
        {
            _courseService = courseService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCourses(CancellationToken cancellationToken)
        {
            var result = await _courseService.GetAllAsync(cancellationToken);
            var apiResponse = new ApiResponse(true, "Courses retrieved successfully", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpGet]
        public async Task<IActionResult> GetByFilter([FromQuery] CourseFilterDto filter, CancellationToken cancellationToken)
        {
            var result = await _courseService.GetByFilterAsync(filter, cancellationToken);
            var apiResponse = new ApiResponse(true, "Courses filtered successfully.", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }
    }
} 
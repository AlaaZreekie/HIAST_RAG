using API.Controllers;
using Application.Common;
using Application.DTO.CommonDTO;
using Application.Dtos.MediaDtos;
using Application.Dtos.TestimonialDtos;
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
    public class TestimonialsController(
        ITestimonialService testimonialService,
        IMediaService mediaService,
        IFileService fileService,
        IAuthenticationService authenticationService,
        IJsonFieldsSerializer jsonFieldsSerializer) : BaseAuthenticatedController(authenticationService, jsonFieldsSerializer)
    {
        private readonly ITestimonialService _testimonialService = testimonialService;
        private readonly IMediaService _mediaService = mediaService;
        private readonly IFileService _fileService = fileService;

        [HttpGet]
        public async Task<IActionResult> GetAllTestimonials(CancellationToken cancellationToken)
        {
            var result = await _testimonialService.GetAllAsync(cancellationToken);
            var apiResponse = new ApiResponse(true, "Testimonials retrieved successfully", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpGet]
        public async Task<IActionResult> GetByFilter([FromQuery] TestimonialFilterDto filter, CancellationToken cancellationToken)
        {
            var result = await _testimonialService.GetByFilterAsync(filter, cancellationToken);
            var apiResponse = new ApiResponse(true, "Testimonials filtered successfully.", StatusCodes.Status200OK, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpPost]
        public async Task<IActionResult> CreateTestimonial([FromForm] CreateTestimonialWithFileDto dto, CancellationToken cancellationToken)
        {
            var savedFileDetails = await _fileService.SaveFileAsync(dto.CreateMedia.File);
            var createMediaDto = new CreateMediaDto
            {
                SavedFileDetails = savedFileDetails,
                File = dto.CreateMedia.File,
                MediaCategoryId = dto.CreateMedia.MediaCategoryId
            };
            var createdMedia = await _mediaService.CreateAsync(createMediaDto, cancellationToken);

            var result = await _testimonialService.CreateAsync(dto, createdMedia.Id, cancellationToken);

            var apiResponse = new ApiResponse(true, "Testimonial created successfully", StatusCodes.Status201Created, result);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpPut]
        public async Task<IActionResult> UpdateTestimonial([FromBody] UpdateTestimonialDto dto, CancellationToken cancellationToken)
        {
            await _testimonialService.UpdateAsync(dto, cancellationToken);
            var apiResponse = new ApiResponse(true, "Testimonial updated successfully.", StatusCodes.Status200OK, null);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteTestimonial([FromBody] BaseDto<Guid> dto, CancellationToken cancellationToken)
        {
            var mediaPath = await _testimonialService.DeleteAsync(dto, cancellationToken);
            _fileService.DeleteFile(mediaPath!);
            var apiResponse = new ApiResponse(true, "Testimonial deleted successfully. Associated photo was handled based on usage.", StatusCodes.Status200OK, null);
            return new RawJsonActionResult(_jsonFieldsSerializer.Serialize(apiResponse, string.Empty));
        }
    }
}
using Application.Dtos.MediaDtos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Application.Dtos.TestimonialDtos
{
    /// <summary>
    /// Represents the data for creating a testimonial along with its required photo upload.
    /// This is designed to be bound from a multipart/form-data request.
    /// </summary>
    public class CreateTestimonialWithFileDto
    {
        [Required]
        public string GraduateName { get; set; }

        [Required]
        [Range(1900, 9999, ErrorMessage = "Graduate year must be a valid 4-digit year.")]
        public int GraduateYear { get; set; }

        [Required]
        public CreateMediaDto CreateMedia { get; set; }

        [Required]
        [MinLength(1, ErrorMessage = "At least one translation (quote) is required.")]
        public IList<CreateTestimonialTranslationDto> Translations { get; set; }
    }
}
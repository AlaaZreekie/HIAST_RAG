using Domain.Ennum;
using System.ComponentModel.DataAnnotations;

namespace Application.Dtos.TestimonialDtos
{
    public class CreateTestimonialTranslationDto
    {
        [Required]
        public LanguageCodeEnum LanguageCode { get; set; }

        [Required]
        public string Quote { get; set; }
    }
}
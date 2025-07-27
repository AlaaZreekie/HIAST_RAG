using Application.DTO.CommonDTO;

namespace Application.Dtos.TestimonialDtos
{
    public class UpdateTestimonialTranslationDto : BaseDto<Guid>
    {
        public string? Quote { get; set; }
    }
}
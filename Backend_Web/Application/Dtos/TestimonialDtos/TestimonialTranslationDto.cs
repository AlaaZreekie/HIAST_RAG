using Application.DTO.CommonDTO;
using Domain.Ennum;

namespace Application.Dtos.TestimonialDtos
{
    public class TestimonialTranslationDto : BaseDto<Guid>
    {
        public string LanguageName { get; set; }
        public LanguageCodeEnum LanguageCode { get; set; }
        public string Quote { get; set; }
    }
}
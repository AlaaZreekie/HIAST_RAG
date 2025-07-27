using Application.DTO.CommonDTO;
using Domain.Ennum;

namespace Application.Dtos.SlideDtos
{
    /// <summary>
    /// Represents a language-specific title for a slider.
    /// </summary>
    public class SliderTranslationDto : BaseDto<Guid>
    {
        public LanguageCodeEnum LanguageCode { get; set; }
        public string LanguageName { get; set; }
        public string Title { get; set; }
    }
}
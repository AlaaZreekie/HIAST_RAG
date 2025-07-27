using Domain.Ennum;
using System.ComponentModel.DataAnnotations;

namespace Application.Dtos.SlideDtos
{
    /// <summary>
    /// DTO for providing a translation during slider creation.
    /// </summary>
    public class CreateSliderTranslationDto
    {
        [Required]
        public LanguageCodeEnum LanguageCode { get; set; }

        [Required]
        public string Title { get; set; }
    }
}
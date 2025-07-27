using Application.DTO.CommonDTO;
using System.ComponentModel.DataAnnotations;

namespace Application.Dtos.SlideDtos
{
    /// <summary>
    /// DTO for updating a specific translation of a slider.
    /// </summary>
    public class UpdateSliderTranslationDto : BaseDto<Guid>
    {
        [Required]
        public string Title { get; set; }
    }
}
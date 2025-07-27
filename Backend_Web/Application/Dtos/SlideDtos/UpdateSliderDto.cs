using Application.DTO.CommonDTO;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.SlideDtos
{
    /// <summary>
    /// DTO for updating an existing slider.
    /// </summary>
    public class UpdateSliderDto : BaseDto<Guid>
    {
        [Url(ErrorMessage = "Please enter a valid URL.")]
        public string? LinkURL { get; set; }

        // Note: To update the image, one would typically delete and recreate the slider.
        // Or, you could create a separate endpoint specifically for updating the image.

        public IList<UpdateSliderTranslationDto>? Translations { get; set; }
    }
}

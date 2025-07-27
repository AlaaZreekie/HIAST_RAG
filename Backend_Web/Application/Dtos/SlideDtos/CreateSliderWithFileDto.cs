using Application.Dtos.MediaDtos;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.SlideDtos
{
    /// DTO for creating a new slider, including the banner image and translations.
    /// Designed for multipart/form-data requests.
    /// </summary>
    public class CreateSliderWithFileDto
    {
        [Required]
        [Url(ErrorMessage = "Please enter a valid URL.")]
        public string LinkURL { get; set; }

        [Required]
        public CreateMediaDto CreateMedia { get; set; }

        [Required]
        [MinLength(1, ErrorMessage = "At least one translation is required.")]
        public IList<CreateSliderTranslationDto> Translations { get; set; }
    }
}

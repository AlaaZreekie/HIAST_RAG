using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.MediaCategoryDtos
{
    public class CreateMediaCategoryDto
    {
        [Required]
        [MinLength(1, ErrorMessage = "At least one translation is required to create a media category.")]
        public IList<CreateMediaCategoryTranslationDto> Translations { get; set; }
    }
}

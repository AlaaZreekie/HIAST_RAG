using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.CategoryDtos
{
    public class CreateCategoryDto
    {
        [MinLength(1, ErrorMessage = "At least one translation is required to create a category.")]
        public required IList<CreateCategoryTranslationDto> Translations { get; set; }
    }
}

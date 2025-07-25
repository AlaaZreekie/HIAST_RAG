using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.PageDtos
{
    public class CreatePageDto
    {
        [MinLength(1, ErrorMessage = "At least one translation is required.")]
        public required IList<CreatePageTranslationDto> Translations { get; set; }
    }
}

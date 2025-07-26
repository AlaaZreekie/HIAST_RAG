using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.PostDtos
{
    public class CreatePostDto
    {
        [Required]
        public Guid CategoryId { get; set; }

        [Required]
        [MinLength(1, ErrorMessage = "At least one translation is required.")]
        public IList<CreatePostTranslationDto> Translations { get; set; }
    }
}

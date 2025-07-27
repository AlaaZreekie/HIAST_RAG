using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.BookDtos
{
    public class CreateBookDto
    {
        [Required]
        public string Author { get; set; }

        [Required]
        [Range(1000, 9999, ErrorMessage = "Publication year must be a valid 4-digit year.")]
        public int PublicationYear { get; set; }

        [Required]
        public string ISBN { get; set; }

        [Required]
        public Guid CoverImageMediaId { get; set; }

        [Required]
        public Guid FileMediaId { get; set; }

        [Required]
        [MinLength(1, ErrorMessage = "At least one translation is required.")]
        public IList<CreateBookTranslationDto> Translations { get; set; }
    }
}

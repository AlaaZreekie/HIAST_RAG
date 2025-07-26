using Application.DTO.CommonDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.BookDtos
{
    public class UpdateBookDto : BaseDto<Guid>
    {
        public string? Author { get; set; }
        public int? PublicationYear { get; set; }
        public string? ISBN { get; set; }
        public Guid? CoverImageMediaId { get; set; }
        public Guid? FileMediaId { get; set; }
        public IList<UpdateBookTranslationDto>? Translations { get; set; }
    }
}

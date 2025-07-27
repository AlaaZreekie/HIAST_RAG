using Application.DTO.CommonDTO;
using Application.Dtos.MediaDtos;
using System;
using System.Collections.Generic;

namespace Application.Dtos.BookDtos
{
    public class BookDto : BaseDto<Guid>
    {
        public string Author { get; set; }
        public int PublicationYear { get; set; }
        public string ISBN { get; set; }
        public MediaDto CoverImage { get; set; }
        public MediaDto BookFile { get; set; }
        public IList<BookTranslationDto>? Translations { get; set; }
    }
}
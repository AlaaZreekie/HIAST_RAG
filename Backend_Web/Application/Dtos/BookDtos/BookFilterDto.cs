using Domain.Ennum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.BookDtos
{
    public class BookFilterDto
    {
        public Guid? Id { get; set; }
        public string? Author { get; set; }
        public int? PublicationYear { get; set; }
        public string? ISBN { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public LanguageCodeEnum? LanguageCode { get; set; }
    }
}

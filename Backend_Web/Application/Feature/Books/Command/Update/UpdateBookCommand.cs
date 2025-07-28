using Application.Dtos.BookDtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Books.Command.Update
{
    public class UpdateBookCommand : IRequest
    {
        public Guid Id { get; set; }
        public string? Author { get; set; }
        public int? PublicationYear { get; set; }
        public string? ISBN { get; set; }
        public Guid? CoverImageMediaId { get; set; }
        public Guid? FileMediaId { get; set; }
        public IList<UpdateBookTranslationDto>? Translations { get; set; }
        public bool Save { get; set; } = true;
    }
}

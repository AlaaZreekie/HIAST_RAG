using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Books.Command.Create
{
    public class AddBookTranslationCommand : IRequest
    {
        public Guid BookId { get; set; }
        public Guid LanguageId { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
    }
}

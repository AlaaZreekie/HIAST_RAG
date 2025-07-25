using Domain.Ennum;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Pages.Command.Create
{
    public class AddPageTranslationCommand : IRequest
    {
        public Guid PageId { get; set; }
        public Guid LanguageId { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
        public LanguageCodeEnum LanguageCode { get; set; } 
    }
}

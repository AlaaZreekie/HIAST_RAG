using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Posts.Command.Create
{
    public class AddPostTranslationCommand : IRequest
    {
        public Guid PostId { get; set; }
        public Guid LanguageId { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
    }
}

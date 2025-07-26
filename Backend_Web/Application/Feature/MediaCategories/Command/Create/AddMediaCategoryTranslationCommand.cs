using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.MediaCategories.Command.Create
{
    public class AddMediaCategoryTranslationCommand : IRequest
    {
        public Guid MediaCategoryId { get; set; }
        public Guid LanguageId { get; set; }
        public required string Name { get; set; }
    }
}

using Domain.Ennum;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature._1.Command.Create
{
    public class AddCategoryTranslationCommand : IRequest
    {
        public Guid CategoryId { get; set; }
        public Guid LanguageId { get; set; }
        public LanguageCodeEnum LanguageCode { get; set; }
        public required string Name { get; set; }
    }
}

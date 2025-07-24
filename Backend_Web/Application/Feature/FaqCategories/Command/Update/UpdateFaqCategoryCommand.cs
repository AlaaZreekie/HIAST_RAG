using Application.Dtos.FaqCategoryDtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.FaqCategories.Command.Delete
{
    public class UpdateFaqCategoryCommand : IRequest
    {
        public Guid Id { get; set; }
        public IList<UpdateFaqCategoryTranslationDto>? Translations { get; set; }
    }
}

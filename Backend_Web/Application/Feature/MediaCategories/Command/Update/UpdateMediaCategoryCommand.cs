using Application.Dtos.MediaCategoryDtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.MediaCategories.Command.Update
{

    public class UpdateMediaCategoryCommand : IRequest
    {
        public Guid Id { get; set; }
        public IList<UpdateMediaCategoryTranslationDto>? Translations { get; set; }
        public bool Save { get; set; } = true;
    }

}

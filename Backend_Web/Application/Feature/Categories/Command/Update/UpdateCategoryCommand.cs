using Application.Dtos.CategoryDtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature._1.Command.Delete
{
    public class UpdateCategoryCommand : IRequest
    {
        public Guid Id { get; set; }
        public IList<UpdateCategoryTranslationDto>? Translations { get; set; }
    }
}

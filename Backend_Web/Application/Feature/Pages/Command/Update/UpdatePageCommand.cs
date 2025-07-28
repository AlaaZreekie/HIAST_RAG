using Application.Dtos.PageDtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Pages.Command.Update
{
    public class UpdatePageCommand : IRequest
    {
        public Guid Id { get; set; }
        public IList<UpdatePageTranslationDto>? Translations { get; set; }
        public bool Save { get; set; } = true;
    }
}

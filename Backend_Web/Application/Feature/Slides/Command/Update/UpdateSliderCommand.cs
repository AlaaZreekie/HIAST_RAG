using Application.Dtos.SlideDtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Slides.Command.Update
{
    public class UpdateSliderCommand : IRequest
    {
        public Guid Id { get; set; }
        public string? LinkURL { get; set; }
        public IList<UpdateSliderTranslationDto>? Translations { get; set; }
    }
}

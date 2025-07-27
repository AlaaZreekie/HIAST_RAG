using Application.Dtos.SlideDtos;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Slides.Query
{
    public record GetSlidersByFilterQuery(SliderFilterDto Filter) : IRequest<IEnumerable<Slider>>;
}

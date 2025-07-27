using Application.Dtos.LocationDtos;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Locations.Query
{
    public record GetLocationsByFilterQuery(LocationFilterDto Filter) : IRequest<IEnumerable<Location>>;
}

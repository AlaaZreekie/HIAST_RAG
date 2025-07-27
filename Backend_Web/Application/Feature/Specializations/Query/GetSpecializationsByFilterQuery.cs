using Application.Dtos.SpecializationDtos;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Specializations.Query
{
    public record GetSpecializationsByFilterQuery(SpecializationFilterDto Filter) : IRequest<IEnumerable<Specialization>>;
}

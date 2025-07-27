using Application.Dtos.ProgramDtos;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Programs.Query
{
    public record GetProgramsByFilterQuery(ProgramFilterDto Filter) : IRequest<IEnumerable<Program>>;
}

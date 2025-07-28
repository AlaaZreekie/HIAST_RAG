using Application.Dtos.ProgramDtos;
using Application.Dtos.SpecializationDtos;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Programs.Command.Create
{
    public record CreateProgramCommand(Program Program, bool Save = true) : IRequest<Guid>;

}

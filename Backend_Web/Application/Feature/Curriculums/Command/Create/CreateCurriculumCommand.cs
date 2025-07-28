using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Curriculums.Command.Create
{
    public record CreateCurriculumCommand(Curriculum Curriculum, bool Save = true) : IRequest<Guid>;
}

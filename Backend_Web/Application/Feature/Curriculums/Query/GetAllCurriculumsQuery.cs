using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Curriculums.Query
{
    public record GetAllCurriculumsQuery : IRequest<IEnumerable<Curriculum>>;
}

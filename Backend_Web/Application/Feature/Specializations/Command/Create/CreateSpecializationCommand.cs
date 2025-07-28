using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Specializations.Command.Create
{
    public record CreateSpecializationCommand(Specialization Specialization, bool Save = true) : IRequest<Guid>;
}

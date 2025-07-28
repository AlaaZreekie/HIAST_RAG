using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Admissions.Command.Create
{
    /// <summary>
    /// Command to create a new Admission entity.
    /// </summary>
    public record CreateAdmissionCommand(Admission Admission, bool Save = true) : IRequest<Guid>;
}

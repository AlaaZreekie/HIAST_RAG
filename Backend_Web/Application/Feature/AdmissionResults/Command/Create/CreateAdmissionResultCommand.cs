using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.AdmissionResults.Command.Create
{
    /// <summary>
    /// Command to create a new AdmissionResult entity.
    /// </summary>
    public record CreateAdmissionResultCommand(AdmissionResult AdmissionResult, bool Save = true) : IRequest<Guid>;
}

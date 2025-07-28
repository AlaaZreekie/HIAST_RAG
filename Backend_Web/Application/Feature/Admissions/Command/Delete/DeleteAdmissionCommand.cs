using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Admissions.Command.Delete
{
    /// <summary>
    /// Command to delete an Admission entity by its ID.
    /// </summary>
    public record DeleteAdmissionCommand(Guid Id, bool save = true) : IRequest;
}

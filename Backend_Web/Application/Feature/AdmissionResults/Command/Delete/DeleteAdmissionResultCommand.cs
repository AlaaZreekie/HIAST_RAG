using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.AdmissionResults.Command.Delete
{
    /// <summary>
    /// Command to delete an AdmissionResult entity.
    /// It returns the file path of the associated media file for physical deletion.
    /// </summary>
    public record DeleteAdmissionResultCommand(Guid Id) : IRequest<Media?>;
}

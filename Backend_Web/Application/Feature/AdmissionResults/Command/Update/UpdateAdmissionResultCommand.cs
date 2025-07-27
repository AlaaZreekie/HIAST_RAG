using Domain.Ennum;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.AdmissionResults.Command.Update
{
    /// <summary>
    /// Command to update an existing AdmissionResult entity.
    /// </summary>
    public class UpdateAdmissionResultCommand : IRequest
    {
        public Guid Id { get; set; }
        public AdmissionResultTypeEnum ResultType { get; set; }
    }
}

using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Admissions.Query
{
    /// <summary>
    /// Query to retrieve all Admission entities.
    /// </summary>
    public record GetAllAdmissionsQuery : IRequest<IEnumerable<Admission>>;
}

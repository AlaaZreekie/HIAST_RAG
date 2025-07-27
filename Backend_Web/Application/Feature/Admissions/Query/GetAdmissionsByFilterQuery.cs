using Application.Dtos.AdmissionDtos;
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
    /// Query to retrieve a list of Admission entities based on filter criteria.
    /// </summary>
    public record GetAdmissionsByFilterQuery(AdmissionFilterDto Filter) : IRequest<IEnumerable<Admission>>;
}

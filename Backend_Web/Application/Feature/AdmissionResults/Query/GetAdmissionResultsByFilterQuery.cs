using Application.Dtos.AdmissionResultDtos;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.AdmissionResults.Query
{
    /// <summary>
    /// Query to retrieve a list of AdmissionResult entities based on filter criteria.
    /// </summary>
    public record GetAdmissionResultsByFilterQuery(AdmissionResultFilterDto Filter) : IRequest<IEnumerable<AdmissionResult>>;
}

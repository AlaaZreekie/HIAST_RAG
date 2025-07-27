using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.AdmissionResults.Query
{
    public class GetAdmissionResultsByFilterQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetAdmissionResultsByFilterQuery, IEnumerable<AdmissionResult>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<AdmissionResult>> Handle(GetAdmissionResultsByFilterQuery request, CancellationToken cancellationToken)
        {
            var query = _unitOfWork.Repository<AdmissionResult>().Find(a => true, asNoTracking: true,
                a => a.Admission,
                a => a.Admission.Program,
                a => a.Admission.Program.Translations,
                a => a.Admission.Location,
                a => a.Admission.Location.Translations,
                a => a.Media
                );

            if (request.Filter.Id.HasValue)
                query = query.Where(ar => ar.Id == request.Filter.Id.Value);

            if (request.Filter.AdmissionId.HasValue)
                query = query.Where(ar => ar.AdmissionId == request.Filter.AdmissionId.Value);

            if (request.Filter.ResultType.HasValue)
                query = query.Where(ar => ar.ResultType == request.Filter.ResultType.Value);

            return await query.ToListAsync(cancellationToken);
        }
    }
}

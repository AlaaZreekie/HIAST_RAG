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
            Func<IQueryable<AdmissionResult>, IQueryable<AdmissionResult>> includeExpression = q =>
                q.Include(ar => ar.Media).ThenInclude(m => m.MediaCategory);

            var query = _unitOfWork.Repository<AdmissionResult>()
                .FindWithComplexIncludes(ar => true, includeExpression, asNoTracking: true);

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

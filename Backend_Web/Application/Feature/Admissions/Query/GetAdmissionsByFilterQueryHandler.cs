using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Admissions.Query
{
    public class GetAdmissionsByFilterQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetAdmissionsByFilterQuery, IEnumerable<Admission>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<Admission>> Handle(GetAdmissionsByFilterQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<Admission>, IQueryable<Admission>> includeExpression = q =>
                q.Include(a => a.Program).ThenInclude(p => p.Translations).ThenInclude(t => t.Language)
                 .Include(a => a.Location).ThenInclude(p => p.Translations).ThenInclude(t => t.Language);

            var query = _unitOfWork.Repository<Admission>()
                .FindWithComplexIncludes(a => true, includeExpression, true);

            if (request.Filter.Id.HasValue)
                query = query.Where(a => a.Id == request.Filter.Id.Value);

            if (!string.IsNullOrWhiteSpace(request.Filter.AcademicYear))
                query = query.Where(a => a.AcademicYear.Contains(request.Filter.AcademicYear));

            if (request.Filter.ProgramId.HasValue)
                query = query.Where(a => a.ProgramId == request.Filter.ProgramId.Value);

            if (request.Filter.LocationId.HasValue)
                query = query.Where(a => a.LocationId == request.Filter.LocationId.Value);

            if (request.Filter.DeadlineFrom.HasValue)
                query = query.Where(a => a.Deadline >= request.Filter.DeadlineFrom.Value);

            if (request.Filter.DeadlineTo.HasValue)
                query = query.Where(a => a.Deadline <= request.Filter.DeadlineTo.Value);

            return await query.ToListAsync(cancellationToken);
        }
    }
}
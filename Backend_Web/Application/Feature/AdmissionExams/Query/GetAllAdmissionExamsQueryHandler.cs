using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.AdmissionExams.Query
{
    public class GetAllAdmissionExamsQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetAllAdmissionExamsQuery, IEnumerable<AdmissionExam>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<AdmissionExam>> Handle(GetAllAdmissionExamsQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<AdmissionExam>, IQueryable<AdmissionExam>> includeExpression = query =>
                query.Include(ae => ae.Translations).ThenInclude(t => t.Language)
                     .Include(ae => ae.Admission);

            var exams = await _unitOfWork.Repository<AdmissionExam>()
                .FindWithComplexIncludes(
                    predicate: ae => true,
                    includeExpression: includeExpression,
                    asNoTracking: true)
                .ToListAsync(cancellationToken);

            return exams;
        }
    }
}
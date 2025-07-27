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
    public class GetAdmissionExamsByFilterQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetAdmissionExamsByFilterQuery, IEnumerable<AdmissionExam>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<AdmissionExam>> Handle(GetAdmissionExamsByFilterQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<AdmissionExam>, IQueryable<AdmissionExam>> includeExpression = query =>
                query.Include(ae => ae.Translations).ThenInclude(t => t.Language)
                     .Include(ae => ae.Admission);

            var query = _unitOfWork.Repository<AdmissionExam>()
                .FindWithComplexIncludes(
                    predicate: ae => true,
                    includeExpression: includeExpression,
                    asNoTracking: true);

            if (request.Filter.Id.HasValue)
                query = query.Where(ae => ae.Id == request.Filter.Id.Value);

            if (request.Filter.AdmissionId.HasValue)
                query = query.Where(ae => ae.AdmissionId == request.Filter.AdmissionId.Value);

            if (request.Filter.ExamDate.HasValue)
                query = query.Where(ae => ae.ExamDateTime.Date == request.Filter.ExamDate.Value.Date);

            if (!string.IsNullOrWhiteSpace(request.Filter.ExamName))
                query = query.Where(ae => ae.Translations.Any(t => t.ExamName.ToLower().Contains(request.Filter.ExamName.Trim().ToLower())));

            if (request.Filter.LanguageCode.HasValue)
                query = query.Where(ae => ae.Translations.Any(t => t.Language!.Code == request.Filter.LanguageCode.Value));

            return await query.ToListAsync(cancellationToken);
        }
    }
}
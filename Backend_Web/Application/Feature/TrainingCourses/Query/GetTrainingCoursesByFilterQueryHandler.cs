using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.TrainingCourses.Query
{
    public class GetTrainingCoursesByFilterQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetTrainingCoursesByFilterQuery, IEnumerable<TrainingCourse>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<TrainingCourse>> Handle(GetTrainingCoursesByFilterQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<TrainingCourse>, IQueryable<TrainingCourse>> includeExpression = query =>
                query.Include(tc => tc.Translations).ThenInclude(t => t.Language)
                     .Include(tc => tc.TrainingCourseCategory)
                        .ThenInclude(c => c.Translations)
                            .ThenInclude(ct => ct.Language);

            var query = _unitOfWork.Repository<TrainingCourse>()
                .FindWithComplexIncludes(
                    predicate: tc => true,
                    includeExpression: includeExpression,
                    asNoTracking: true);

            if (request.Filter.Id.HasValue)
                query = query.Where(tc => tc.Id == request.Filter.Id.Value);

            if (request.Filter.TrainingCourseCategoryId.HasValue)
                query = query.Where(tc => tc.TrainingCourseCategoryId == request.Filter.TrainingCourseCategoryId.Value);

            if (!string.IsNullOrWhiteSpace(request.Filter.CourseCode))
                query = query.Where(tc => tc.CourseCode.ToLower().Contains(request.Filter.CourseCode.Trim().ToLower()));

            if (request.Filter.Year.HasValue)
                query = query.Where(tc => tc.Year == request.Filter.Year.Value);

            if (!string.IsNullOrWhiteSpace(request.Filter.Title))
                query = query.Where(tc => tc.Translations.Any(t => t.Title.ToLower().Contains(request.Filter.Title.Trim().ToLower())));

            if (!string.IsNullOrWhiteSpace(request.Filter.TargetAudience))
                query = query.Where(tc => tc.TargetAudience.ToLower().Contains(request.Filter.TargetAudience.Trim().ToLower()));

            return await query.ToListAsync(cancellationToken);
        }
    }
}
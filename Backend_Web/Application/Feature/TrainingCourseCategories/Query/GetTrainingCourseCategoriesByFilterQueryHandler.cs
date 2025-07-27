using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.TrainingCourseCategories.Query
{
    public class GetTrainingCourseCategoriesByFilterQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetTrainingCourseCategoriesByFilterQuery, IEnumerable<TrainingCourseCategory>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<TrainingCourseCategory>> Handle(GetTrainingCourseCategoriesByFilterQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<TrainingCourseCategory>, IQueryable<TrainingCourseCategory>> includeExpression = query =>
                query.Include(c => c.Translations).ThenInclude(t => t.Language);

            var query = _unitOfWork.Repository<TrainingCourseCategory>()
                .FindWithComplexIncludes(
                    predicate: c => true,
                    includeExpression: includeExpression,
                    asNoTracking: true);

            if (request.Filter.Id.HasValue)
                query = query.Where(c => c.Id == request.Filter.Id.Value);

            if (!string.IsNullOrWhiteSpace(request.Filter.Name))
                query = query.Where(c => c.Translations.Any(t => t.Name.ToLower().Contains(request.Filter.Name.Trim().ToLower())));

            return await query.ToListAsync(cancellationToken);
        }
    }
}
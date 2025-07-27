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
    public class GetAllTrainingCourseCategoriesQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetAllTrainingCourseCategoriesQuery, IEnumerable<TrainingCourseCategory>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<TrainingCourseCategory>> Handle(GetAllTrainingCourseCategoriesQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<TrainingCourseCategory>, IQueryable<TrainingCourseCategory>> includeExpression = query =>
                query.Include(c => c.Translations).ThenInclude(t => t.Language);

            var categories = await _unitOfWork.Repository<TrainingCourseCategory>()
                .FindWithComplexIncludes(
                    predicate: c => true,
                    includeExpression: includeExpression,
                    asNoTracking: true)
                .ToListAsync(cancellationToken);

            return categories;
        }
    }
}
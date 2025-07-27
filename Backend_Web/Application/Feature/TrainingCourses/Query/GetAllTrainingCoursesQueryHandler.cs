using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.TrainingCourses.Query
{
    public record GetAllTrainingCoursesQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetTrainingCoursesByFilterQuery, IEnumerable<TrainingCourse>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<TrainingCourse>> Handle(GetTrainingCoursesByFilterQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<TrainingCourse>, IQueryable<TrainingCourse>> includeExpression = query =>
                query.Include(tc => tc.Translations).ThenInclude(t => t.Language)
                     .Include(tc => tc.TrainingCourseCategory)
                        .ThenInclude(c => c.Translations)
                            .ThenInclude(ct => ct.Language);

            return await _unitOfWork.Repository<TrainingCourse>()
                .FindWithComplexIncludes(
                    predicate: tc => true,
                    includeExpression: includeExpression,
                    asNoTracking: true).ToListAsync(cancellationToken);
        }

    }
}

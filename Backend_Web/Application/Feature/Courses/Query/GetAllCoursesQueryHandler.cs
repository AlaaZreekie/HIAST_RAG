using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Courses.Query
{
    public class GetAllCoursesQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetAllCoursesQuery, IEnumerable<Course>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<Course>> Handle(GetAllCoursesQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<Course>, IQueryable<Course>> includeExpression = query =>
                query.Include(c => c.Translations)
                     .ThenInclude(t => t.Language)
                     .Include(c => c.CourseGroup)
                     .Include(c => c.CourseGroup.Translations)
                     .ThenInclude(cbt => cbt.Language);


            var courses = await _unitOfWork.Repository<Course>()
                .FindWithComplexIncludes(
                    predicate: c => true,
                    includeExpression: includeExpression,
                    asNoTracking: true)
                .ToListAsync(cancellationToken);

            return courses;
        }
    }
}
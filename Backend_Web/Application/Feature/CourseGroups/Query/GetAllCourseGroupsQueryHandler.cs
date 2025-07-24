using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.CourseGroups.Query
{
    public class GetAllCourseGroupsQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetAllCourseGroupsQuery, IEnumerable<CourseGroup>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<CourseGroup>> Handle(GetAllCourseGroupsQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<CourseGroup>, IQueryable<CourseGroup>> includeExpression = query =>
                query.Include(cg => cg.Translations)
                     .ThenInclude(t => t.Language);

            var courseGroups = await _unitOfWork.Repository<CourseGroup>()
                .FindWithComplexIncludes(
                    predicate: cg => true,
                    includeExpression: includeExpression,
                    asNoTracking: true)
                .ToListAsync(cancellationToken);

            return courseGroups;
        }
    }
}
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
    public class GetCoursesByFilterQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetCoursesByFilterQuery, IEnumerable<Course>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<Course>> Handle(GetCoursesByFilterQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<Course>, IQueryable<Course>> includeExpression = query =>
                query.Include(c => c.Translations)
                     .ThenInclude(t => t.Language)
                     .Include(c => c.CourseGroup)
                     .Include(c => c.CourseGroup.Translations)
                     .ThenInclude(cbt => cbt.Language);

            var query = _unitOfWork.Repository<Course>()
                .FindWithComplexIncludes(
                    predicate: c => true,
                    includeExpression: includeExpression,
                    asNoTracking: true);

            if (request.Filter.Id is not null)
                query = query.Where(c => c.Id == request.Filter.Id);

            if (!string.IsNullOrWhiteSpace(request.Filter.CourseCode))
                query = query.Where(c => c.CourseCode.ToLower().Contains(request.Filter.CourseCode.Trim().ToLower()));

            if (request.Filter.CourseGroupId is not null)
                query = query.Where(c => c.CourseGroupId == request.Filter.CourseGroupId);

            if (!string.IsNullOrWhiteSpace(request.Filter.Name))
                query = query.Where(c => c.Translations.Any(t => t.Name.ToLower().Contains(request.Filter.Name.Trim().ToLower())));

            if (!string.IsNullOrWhiteSpace(request.Filter.Description))
                query = query.Where(c => c.Translations.Any(t => t.Description.Contains(request.Filter.Description)));

            if (request.Filter.LanguageCode.HasValue)
                query = query.Where(c => c.Translations.Any(t => t.Language!.Code == request.Filter.LanguageCode.Value));

            return await query.ToListAsync(cancellationToken);
        }
    }
}
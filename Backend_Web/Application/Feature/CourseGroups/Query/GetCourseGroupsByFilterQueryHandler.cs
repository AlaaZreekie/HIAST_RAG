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
    public class GetCourseGroupsByFilterQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetCourseGroupsByFilterQuery, IEnumerable<CourseGroup>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<CourseGroup>> Handle(GetCourseGroupsByFilterQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<CourseGroup>, IQueryable<CourseGroup>> includeExpression = query =>
                query.Include(cg => cg.Translations)
                     .ThenInclude(t => t.Language);

            var query = _unitOfWork.Repository<CourseGroup>()
                .FindWithComplexIncludes(
                    predicate: p => true,
                    includeExpression: includeExpression,
                    asNoTracking: true);

            if (request.Filter.Id is not null)
                query = query.Where(cg => cg.Id == request.Filter.Id);

            if (request.Filter.CourseGroupCode is not null)
                query = query.Where(cg => cg.CourseGroupCode == request.Filter.CourseGroupCode);

            if (!string.IsNullOrWhiteSpace(request.Filter.Name))
                query = query.Where(cg => cg.Translations.Any(t => t.Name.ToLower().Contains(request.Filter.Name.Trim().ToLower())));

            if (request.Filter.LanguageCode.HasValue)
                query = query.Where(cg => cg.Translations.Any(t => t.Language!.Code == request.Filter.LanguageCode.Value));

            return await query.ToListAsync(cancellationToken);
        }
    }
}
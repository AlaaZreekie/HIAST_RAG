using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Curriculums.Query
{
    public class GetCurriculumsByFilterQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetCurriculumsByFilterQuery, IEnumerable<Curriculum>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<Curriculum>> Handle(GetCurriculumsByFilterQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<Curriculum>, IQueryable<Curriculum>> includeExpression = query =>
                query.Include(c => c.Course).ThenInclude(course => course.Translations).ThenInclude(t => t.Language)
                     .Include(c => c.Specialization).ThenInclude(spec => spec.Translations).ThenInclude(t => t.Language);

            var query = _unitOfWork.Repository<Curriculum>()
                .FindWithComplexIncludes(
                    predicate: c => true,
                    includeExpression: includeExpression,
                    asNoTracking: true);

            if (request.Filter.Id.HasValue)
                query = query.Where(c => c.Id == request.Filter.Id.Value);

            if (request.Filter.AcademicYear.HasValue)
                query = query.Where(c => c.AcademicYear == request.Filter.AcademicYear.Value);

            if (request.Filter.Semester.HasValue)
                query = query.Where(c => c.Semester == request.Filter.Semester.Value);

            if (request.Filter.CourseType.HasValue)
                query = query.Where(c => c.CourseType == request.Filter.CourseType.Value);

            if (request.Filter.SpecializationId.HasValue)
                query = query.Where(c => c.SpecializationId == request.Filter.SpecializationId.Value);

            if (request.Filter.CourseId.HasValue)
                query = query.Where(c => c.CourseId == request.Filter.CourseId.Value);

            return await query.ToListAsync(cancellationToken);
        }
    }
}
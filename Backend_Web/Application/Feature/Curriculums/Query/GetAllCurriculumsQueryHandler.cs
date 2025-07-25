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
    public class GetAllCurriculumsQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetAllCurriculumsQuery, IEnumerable<Curriculum>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<Curriculum>> Handle(GetAllCurriculumsQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<Curriculum>, IQueryable<Curriculum>> includeExpression = query =>
                query.Include(c => c.Course).ThenInclude(course => course.Translations).ThenInclude(t => t.Language)
                     .Include(c => c.Specialization).ThenInclude(spec => spec.Translations).ThenInclude(t => t.Language);

            var curriculums = await _unitOfWork.Repository<Curriculum>()
                .FindWithComplexIncludes(
                    predicate: c => true,
                    includeExpression: includeExpression,
                    asNoTracking: true)
                .ToListAsync(cancellationToken);

            return curriculums;
        }
    }
}
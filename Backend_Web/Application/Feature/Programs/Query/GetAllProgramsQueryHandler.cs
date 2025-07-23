using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Programs.Query
{
    public class GetAllProgramsQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetAllProgramsQuery, IEnumerable<Program>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<Program>> Handle(GetAllProgramsQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<Program>, IQueryable<Program>> includeExpression = query =>
            query.Include(p => p.Translations)
                 .ThenInclude(t => t.Language);

            var programs = await _unitOfWork.Repository<Program>()
                .FindWithComplexIncludes(
                    predicate: p => true,
                    includeExpression: includeExpression,
                    asNoTracking: true)
                .ToListAsync(cancellationToken);

            return programs;
        }
    }
}

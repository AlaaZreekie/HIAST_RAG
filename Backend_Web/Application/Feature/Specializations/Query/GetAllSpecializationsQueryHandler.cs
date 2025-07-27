using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Specializations.Query
{
    public class GetAllSpecializationsQueryHandler : IRequestHandler<GetAllSpecializationsQuery, IEnumerable<Specialization>>
    {
        private readonly IAppUnitOfWork _unitOfWork;

        public GetAllSpecializationsQueryHandler(IAppUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Specialization>> Handle(GetAllSpecializationsQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<Specialization>, IQueryable<Specialization>> includeExpression = query =>
               query.Include(p => p.Translations)
                    .ThenInclude(t => t.Language)
                    .Include(s => s.Program)
                    .Include(s => s.Program.Translations);

            var programs = await _unitOfWork.Repository<Specialization>()
                .FindWithComplexIncludes(
                    predicate: p => true,
                    includeExpression: includeExpression,
                    asNoTracking: true)
                .ToListAsync(cancellationToken);

            return programs;
        }
    }
}

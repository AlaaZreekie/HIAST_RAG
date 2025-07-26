using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Admissions.Query
{
    public class GetAllAdmissionsQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetAllAdmissionsQuery, IEnumerable<Admission>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<Admission>> Handle(GetAllAdmissionsQuery request, CancellationToken cancellationToken)
        {
            // Eagerly load related entities to fully populate the DTO.
            Func<IQueryable<Admission>, IQueryable<Admission>> includeExpression = query =>
                query.Include(a => a.Program).ThenInclude(p => p.Translations).ThenInclude(t => t.Language)
                     .Include(a => a.Location).ThenInclude(p => p.Translations).ThenInclude(t => t.Language);

            var admissions = await _unitOfWork.Repository<Admission>()
                .FindWithComplexIncludes(
                    predicate: a => true,
                    includeExpression: includeExpression,
                    asNoTracking: true)
                .ToListAsync(cancellationToken);

            return admissions;
        }
    }
}
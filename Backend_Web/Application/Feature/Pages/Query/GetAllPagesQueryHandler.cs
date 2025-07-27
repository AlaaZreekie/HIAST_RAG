using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Pages.Query
{
    public class GetAllPagesQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetAllPagesQuery, IEnumerable<Page>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<Page>> Handle(GetAllPagesQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<Page>, IQueryable<Page>> includeExpression = query =>
                query.Include(p => p.Translations)
                     .ThenInclude(t => t.Language);

            var pages = await _unitOfWork.Repository<Page>()
                .FindWithComplexIncludes(
                    predicate: p => true,
                    includeExpression: includeExpression,
                    asNoTracking: true)
                .ToListAsync(cancellationToken);

            return pages;
        }
    }
}
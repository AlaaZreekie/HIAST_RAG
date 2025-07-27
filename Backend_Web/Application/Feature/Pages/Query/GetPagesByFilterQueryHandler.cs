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
    public class GetPagesByFilterQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetPagesByFilterQuery, IEnumerable<Page>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<Page>> Handle(GetPagesByFilterQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<Page>, IQueryable<Page>> includeExpression = query =>
                query.Include(p => p.Translations)
                     .ThenInclude(t => t.Language);

            var query = _unitOfWork.Repository<Page>()
                .FindWithComplexIncludes(
                    predicate: p => true,
                    includeExpression: includeExpression,
                    asNoTracking: true);

            if (request.Filter.Id.HasValue)
                query = query.Where(p => p.Id == request.Filter.Id.Value);

            if (!string.IsNullOrWhiteSpace(request.Filter.Title))
                query = query.Where(p => p.Translations.Any(t => t.Title.ToLower().Contains(request.Filter.Title.Trim().ToLower())));

            if (!string.IsNullOrWhiteSpace(request.Filter.Slug))
            {
                var slug = request.Filter.Slug.Trim().ToLower();
                query = query.Where(p => p.Translations.Any(t => t.Slug == slug));
            }

            if (request.Filter.LanguageCode.HasValue)
                query = query.Where(p => p.Translations.Any(t => t.Language!.Code == request.Filter.LanguageCode.Value));

            return await query.ToListAsync(cancellationToken);
        }
    }
}
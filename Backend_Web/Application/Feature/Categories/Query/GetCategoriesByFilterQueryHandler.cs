using Application.Feature._1.Query;
using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Categories.Query
{
    public class GetCategoriesByFilterQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetCategoriesByFilterQuery, IEnumerable<Category>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<Category>> Handle(GetCategoriesByFilterQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<Category>, IQueryable<Category>> includeExpression = query =>
                query.Include(c => c.Translations)
                     .ThenInclude(t => t.Language);

            var query = _unitOfWork.Repository<Category>()
                .FindWithComplexIncludes(
                    predicate: p => true,
                    includeExpression: includeExpression,
                    asNoTracking: true);

            if (request.Filter.Id.HasValue)
                query = query.Where(p => p.Id == request.Filter.Id.Value);

            if (!string.IsNullOrWhiteSpace(request.Filter.Name))
                query = query.Where(p => p.Translations.Any(t => t.Name.ToLower().Contains(request.Filter.Name.Trim().ToLower())));

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
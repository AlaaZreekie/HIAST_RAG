using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.MediaCategories.Query
{
    public class GetMediaCategoriesByFilterQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetMediaCategoriesByFilterQuery, IEnumerable<MediaCategory>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<MediaCategory>> Handle(GetMediaCategoriesByFilterQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<MediaCategory>, IQueryable<MediaCategory>> includeExpression = query =>
                query.Include(mc => mc.Translations)
                     .ThenInclude(t => t.Language)
                     .Include(mc => mc.Media);

            var query = _unitOfWork.Repository<MediaCategory>()
                .FindWithComplexIncludes(
                    predicate: mc => true,
                    includeExpression: includeExpression,
                    asNoTracking: true);

            if (request.Filter.Id.HasValue)
                query = query.Where(mc => mc.Id == request.Filter.Id.Value);

            if (!string.IsNullOrWhiteSpace(request.Filter.Name))
                query = query.Where(mc => mc.Translations.Any(t => t.Name.ToLower().Contains(request.Filter.Name.Trim().ToLower())));

            if (request.Filter.LanguageCode.HasValue)
                query = query.Where(mc => mc.Translations.Any(t => t.Language!.Code == request.Filter.LanguageCode.Value));

            return await query.ToListAsync(cancellationToken);
        }
    }
}
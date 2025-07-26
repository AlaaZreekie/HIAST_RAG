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
    public class GetAllMediaCategoriesQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetAllMediaCategoriesQuery, IEnumerable<MediaCategory>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<MediaCategory>> Handle(GetAllMediaCategoriesQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<MediaCategory>, IQueryable<MediaCategory>> includeExpression = query =>
                query.Include(mc => mc.Translations)
                     .ThenInclude(t => t.Language)
                     .Include(mc => mc.Media);

            var categories = await _unitOfWork.Repository<MediaCategory>()
                .FindWithComplexIncludes(
                    predicate: mc => true,
                    includeExpression: includeExpression,
                    asNoTracking: true)
                .ToListAsync(cancellationToken);

            return categories;
        }
    }
}
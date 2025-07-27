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
    public class GetAllCategoriesQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetAllCategoriesQuery, IEnumerable<Category>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<Category>> Handle(GetAllCategoriesQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<Category>, IQueryable<Category>> includeExpression = query =>
                query.Include(c => c.Translations)
                     .ThenInclude(t => t.Language);

            var categories = await _unitOfWork.Repository<Category>()
                .FindWithComplexIncludes(
                    predicate: c => true,
                    includeExpression: includeExpression,
                    asNoTracking: true)
                .ToListAsync(cancellationToken);

            return categories;
        }
    }
}
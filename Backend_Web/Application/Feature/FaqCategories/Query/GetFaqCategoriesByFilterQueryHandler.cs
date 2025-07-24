using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.FaqCategories.Query
{
    public class GetFaqCategoriesByFilterQueryHandler : IRequestHandler<GetFaqCategoriesByFilterQuery, IEnumerable<FaqCategory>>
    {
        private readonly IAppUnitOfWork _unitOfWork;

        public GetFaqCategoriesByFilterQueryHandler(IAppUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<FaqCategory>> Handle(GetFaqCategoriesByFilterQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<FaqCategory>, IQueryable<FaqCategory>> includeExpression = query =>
                query.Include(p => p.Translations)
                     .ThenInclude(t => t.Language);

            var query = _unitOfWork.Repository<FaqCategory>()
                .FindWithComplexIncludes(
                    predicate: p => true,
                    includeExpression: includeExpression,
                    asNoTracking: true);

            if (!string.IsNullOrWhiteSpace(request.Filter.Name))            
                query = query.Where(fc => fc.Translations.Any(t => t.Name.Trim().ToLower().Contains(request.Filter.Name.Trim().ToLower())));
            
            if (request.Filter.Id.HasValue)            
                query = query.Where(fc => fc.Translations.Any(t => t.Id == request.Filter.Id.Value));
            
            return await query.ToListAsync(cancellationToken);
        }
    }
}

using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Faqs.Query
{
    public class GetAllFaqsQueryHandler : IRequestHandler<GetAllFaqsQuery, IEnumerable<Faq>>
    {
        private readonly IAppUnitOfWork _unitOfWork;

        public GetAllFaqsQueryHandler(IAppUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Faq>> Handle(GetAllFaqsQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<Faq>, IQueryable<Faq>> includeExpression = query =>
             query.Include(p => p.Translations)
                  .ThenInclude(t => t.Language)
                  .Include(p => p.FaqCategory)
                  .Include(p => p.FaqCategory.Translations);

            var programs = await _unitOfWork.Repository<Faq>()
                .FindWithComplexIncludes(
                    predicate: p => true,
                    includeExpression: includeExpression,
                    asNoTracking: true)
                .OrderBy(f => f.DisplayOrder)
                .ToListAsync(cancellationToken);

            return programs;
        }
    }
}

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
    public class GetFaqsByFilterQueryHandler : IRequestHandler<GetFaqsByFilterQuery, IEnumerable<Faq>>
    {
        private readonly IAppUnitOfWork _unitOfWork;

        public GetFaqsByFilterQueryHandler(IAppUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Faq>> Handle(GetFaqsByFilterQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<Faq>, IQueryable<Faq>> includeExpression = query =>
            query.Include(p => p.Translations)
                 .ThenInclude(t => t.Language);

            var query = _unitOfWork.Repository<Faq>()
                .FindWithComplexIncludes(
                    predicate: p => true,
                    includeExpression: includeExpression,
                    asNoTracking: true);

            if (request.Filter.Id.HasValue)
                query = query.Where(f => f.Id == request.Filter.Id.Value);

            if (request.Filter.FaqCategoryId.HasValue)            
                query = query.Where(f => f.FaqCategoryId == request.Filter.FaqCategoryId.Value);
            
            if (!string.IsNullOrWhiteSpace(request.Filter.Question))            
                query = query.Where(f => f.Translations.Any(t => t.Question.Contains(request.Filter.Question)));
            
            if (!string.IsNullOrWhiteSpace(request.Filter.Answer))            
                query = query.Where(f => f.Translations.Any(t => t.Answer.Contains(request.Filter.Answer)));
            
            return await query.OrderBy(f => f.DisplayOrder).ToListAsync(cancellationToken);
        }
    }
}

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
    public class GetAllFaqCategoriesQueryHandler : IRequestHandler<GetAllFaqCategoriesQuery, IEnumerable<FaqCategory>>
    {
        private readonly IAppUnitOfWork _unitOfWork;

        public GetAllFaqCategoriesQueryHandler(IAppUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<FaqCategory>> Handle(GetAllFaqCategoriesQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<FaqCategory>, IQueryable<FaqCategory>> includeExpression = query =>
            query.Include(p => p.Translations)
                 .ThenInclude(t => t.Language);

            var programs = await _unitOfWork.Repository<FaqCategory>()
                .FindWithComplexIncludes(
                    predicate: p => true,
                    includeExpression: includeExpression,
                    asNoTracking: true)
                .ToListAsync(cancellationToken);

            return programs;
        }
    }
}

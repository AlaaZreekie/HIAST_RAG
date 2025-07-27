using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Programs.Query
{
    public class GetProgramsByFilterQueryHandler : IRequestHandler<GetProgramsByFilterQuery, IEnumerable<Program>>
    {
        private readonly IAppUnitOfWork _unitOfWork;

        public GetProgramsByFilterQueryHandler(IAppUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Program>> Handle(GetProgramsByFilterQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<Program>, IQueryable<Program>> includeExpression = query =>
             query.Include(p => p.Translations)
                  .ThenInclude(t => t.Language);

            var query = _unitOfWork.Repository<Program>()
                .FindWithComplexIncludes(
                    predicate: p => true,
                    includeExpression: includeExpression,
                    asNoTracking: true);
            if (request.Filter.Id is not null)
                query = query.Where(p => p.Id == request.Filter.Id);

            if (!string.IsNullOrWhiteSpace(request.Filter.Duration))
                query = query.Where(p => p.Duration.Contains(request.Filter.Duration));
            
            if (!string.IsNullOrWhiteSpace(request.Filter.Name))
                query = query.Where(p => p.Translations.Any(t => t.Name.ToLower().Contains(request.Filter.Name.Trim().ToLower())));
            
            if (!string.IsNullOrWhiteSpace(request.Filter.Description))
                query = query.Where(p => p.Translations.Any(t => t.Description.Contains(request.Filter.Description)));
            
            if (request.Filter.LanguageCode.HasValue)
                query = query.Where(p => p.Translations.Any(t => t.Language!.Code == request.Filter.LanguageCode.Value));
           
            return await query.ToListAsync(cancellationToken);
        }
    }
}

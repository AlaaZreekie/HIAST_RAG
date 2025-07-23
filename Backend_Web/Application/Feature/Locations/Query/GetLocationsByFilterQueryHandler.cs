using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Locations.Query
{
    public class GetLocationsByFilterQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetLocationsByFilterQuery, IEnumerable<Location>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<Location>> Handle(GetLocationsByFilterQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<Location>, IQueryable<Location>> includeExpression = query =>
             query.Include(p => p.Translations)
                  .ThenInclude(t => t.Language);

            var query = _unitOfWork.Repository<Location>()
                .FindWithComplexIncludes(
                    predicate: p => true,
                    includeExpression: includeExpression,
                    asNoTracking: true);

            if(request.Filter.Id is not null)
                query = query.Where(l => l.Id == request.Filter.Id);

            if (request.Filter.LocationCode.HasValue)            
                query = query.Where(l => l.LocationCode == request.Filter.LocationCode.Value);
            
            if (!string.IsNullOrWhiteSpace(request.Filter.Name))            
               query = query.Where(l => l.Translations.Any(t => t.Name.Trim().ToLower().Contains(request.Filter.Name.Trim().ToLower())));
            
            if (!string.IsNullOrWhiteSpace(request.Filter.Address))            
               query = query.Where(l => l.Translations.Any(t => t.Address!.Trim().ToLower().Contains(request.Filter.Address.Trim().ToLower())));
            
            return await query.ToListAsync(cancellationToken);
        }
    }
}

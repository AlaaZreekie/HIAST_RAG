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
    public class GetAllLocationsQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetAllLocationsQuery, IEnumerable<Location>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<Location>> Handle(GetAllLocationsQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<Location>, IQueryable<Location>> includeExpression = query =>
             query.Include(p => p.Translations)
                  .ThenInclude(t => t.Language);

            var locations =await _unitOfWork.Repository<Location>()
                .FindWithComplexIncludes(
                    predicate: p => true,
                    includeExpression: includeExpression,
                    asNoTracking: true)              
                .ToListAsync(cancellationToken);

            return locations;
        }
    }
}

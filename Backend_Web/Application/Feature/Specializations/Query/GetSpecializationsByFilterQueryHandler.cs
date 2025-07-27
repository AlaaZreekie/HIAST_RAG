using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Specializations.Query
{
    public class GetSpecializationsByFilterQueryHandler : IRequestHandler<GetSpecializationsByFilterQuery, IEnumerable<Specialization>>
    {
        private readonly IAppUnitOfWork _unitOfWork;

        public GetSpecializationsByFilterQueryHandler(IAppUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Specialization>> Handle(GetSpecializationsByFilterQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<Specialization>, IQueryable<Specialization>> includeExpression = query =>
               query.Include(s => s.Translations)
                    .ThenInclude(t => t.Language)
                    .Include(s => s.Program)
                    .Include(s => s.Program.Translations);

            var query = _unitOfWork.Repository<Specialization>()
                .FindWithComplexIncludes(
                    predicate: p => true,
                    includeExpression: includeExpression,
                    asNoTracking: true);

            if (request.Filter.Id.HasValue)
                query = query.Where(s => s.Id == request.Filter.Id.Value);

            if (request.Filter.ProgramId.HasValue)            
                query = query.Where(s => s.ProgramId == request.Filter.ProgramId.Value);
            
            if (request.Filter.LocationId.HasValue)            
                query = query.Where(s => s.LocationId == request.Filter.LocationId.Value);
            
            if (request.Filter.DegreeType.HasValue)            
                query = query.Where(s => s.DegreeType == request.Filter.DegreeType.Value);
            
            if (!string.IsNullOrWhiteSpace(request.Filter.Name))            
                query = query.Where(s => s.Translations.Any(t => t.Name.Contains(request.Filter.Name) && request.Filter.Name.Trim().ToLower().Equals(t.Name.ToLower().Trim())));            

            return await query.ToListAsync(cancellationToken);
        }
    }
}

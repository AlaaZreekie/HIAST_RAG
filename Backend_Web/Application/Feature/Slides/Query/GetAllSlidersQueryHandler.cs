using Application.Feature.Slides.Query;
using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Sliders.Query
{
    public class GetAllSlidersQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetAllSlidersQuery, IEnumerable<Slider>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<Slider>> Handle(GetAllSlidersQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<Slider>, IQueryable<Slider>> includeExpression = query =>
                query.Include(s => s.Translations).ThenInclude(t => t.Language)
                     .Include(s => s.Media)
                     .Include(s => s.Media.MediaCategory)
                     .Include(s => s.Media.MediaCategory.Translations).ThenInclude(t => t.Language);

            return await _unitOfWork.Repository<Slider>()
                .FindWithComplexIncludes(s => true, includeExpression, asNoTracking: true)
                .ToListAsync(cancellationToken);
        }
    }
}
using Application.Feature.Slides.Query;
using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Sliders.Query
{
    public class GetSlidersByFilterQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetSlidersByFilterQuery, IEnumerable<Slider>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<Slider>> Handle(GetSlidersByFilterQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<Slider>, IQueryable<Slider>> includeExpression = query =>
                query.Include(s => s.Translations).ThenInclude(t => t.Language)
                     .Include(s => s.Media)
                     .Include(s => s.Media.MediaCategory)
                     .Include(s => s.Media.MediaCategory.Translations).ThenInclude(t => t.Language);


            var query = _unitOfWork.Repository<Slider>()
                .FindWithComplexIncludes(s => true, includeExpression, asNoTracking: true);

            if (request.Filter.Id.HasValue)
                query = query.Where(s => s.Id == request.Filter.Id.Value);

            if (!string.IsNullOrWhiteSpace(request.Filter.LinkURL))
                query = query.Where(s => s.LinkURL.Contains(request.Filter.LinkURL));

            if (!string.IsNullOrWhiteSpace(request.Filter.Title))
                query = query.Where(s => s.Translations.Any(t => t.Title.Trim().ToLower().Contains(request.Filter.Title.Trim().ToLower())));

            if (request.Filter.LanguageCode.HasValue)
                query = query.Where(s => s.Translations.Any(t => t.Language!.Code == request.Filter.LanguageCode.Value));

            return await query.ToListAsync(cancellationToken);
        }
    }
}
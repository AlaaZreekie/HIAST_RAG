using Application.Feature.Medias.Query;
using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Medias.Query
{
    public class GetMediaByFilterQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetMediaByFilterQuery, IEnumerable<Media>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<Media>> Handle(GetMediaByFilterQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<Media>, IQueryable<Media>> include = q =>
                q.Include(m => m.MediaCategory).ThenInclude(mc => mc.Translations).ThenInclude(t => t.Language );

            var query = _unitOfWork.Repository<Media>().FindWithComplexIncludes(m => true, include, true);
            if (request.Filter.Id.HasValue)
                query = query.Where(m => m.Id == request.Filter.Id.Value);

            if (!string.IsNullOrWhiteSpace(request.Filter.FileName))
                query = query.Where(m => m.FileName.ToLower().Contains(request.Filter.FileName.Trim().ToLower()));

            if (request.Filter.MediaCategoryId.HasValue)
                query = query.Where(m => m.MediaCategoryId == request.Filter.MediaCategoryId.Value);

            if (!string.IsNullOrWhiteSpace(request.Filter.FileType))
                query = query.Where(m => m.FileType.ToLower().Contains(request.Filter.FileType.Trim().ToLower()));

            return await query.ToListAsync(cancellationToken);
        }
    }
}
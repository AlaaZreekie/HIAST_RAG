using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Medias.Query
{
    public class GetAllMediaQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetAllMediaQuery, IEnumerable<Media>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<Media>> Handle(GetAllMediaQuery request, CancellationToken cancellationToken)
        {
            // Eagerly load the related MediaCategory and its translations to fully populate the DTO.
            Func<IQueryable<Media>, IQueryable<Media>> includeExpression = query =>
                query.Include(m => m.MediaCategory)
                     .ThenInclude(mc => mc.Translations)
                     .ThenInclude(t => t.Language);

            var mediaFiles = await _unitOfWork.Repository<Media>()
                .FindWithComplexIncludes(
                    predicate: m => true,
                    includeExpression: includeExpression,
                    asNoTracking: true)
                .ToListAsync(cancellationToken);

            return mediaFiles;
        }
    }
}

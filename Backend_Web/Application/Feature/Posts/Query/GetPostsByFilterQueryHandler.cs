using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Posts.Query
{
    public class GetPostsByFilterQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetPostsByFilterQuery, IEnumerable<Post>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<Post>> Handle(GetPostsByFilterQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<Post>, IQueryable<Post>> includeExpression = query =>
                query.Include(p => p.Translations).ThenInclude(t => t.Language)
                     .Include(p => p.Category).ThenInclude(c => c.Translations).ThenInclude(t => t.Language)
                     .Include(p => p.Author);

            var query = _unitOfWork.Repository<Post>()
                .FindWithComplexIncludes(
                    predicate: p => true,
                    includeExpression: includeExpression,
                    asNoTracking: true);

            if (request.Filter.Id.HasValue)
                query = query.Where(p => p.Id == request.Filter.Id.Value);

            if (request.Filter.AuthorId.HasValue)
                query = query.Where(p => p.AuthorId == request.Filter.AuthorId.Value);

            if (request.Filter.CategoryId.HasValue)
                query = query.Where(p => p.CategoryId == request.Filter.CategoryId.Value);

            if (!string.IsNullOrWhiteSpace(request.Filter.Title))
                query = query.Where(p => p.Translations.Any(t => t.Title.ToLower().Contains(request.Filter.Title.Trim().ToLower())));

            if (request.Filter.LanguageCode.HasValue)
                query = query.Where(p => p.Translations.Any(t => t.Language!.Code == request.Filter.LanguageCode.Value));

            if (request.Filter.PublicationDateFrom.HasValue)
                query = query.Where(p => p.PublicationDate >= request.Filter.PublicationDateFrom.Value);

            if (request.Filter.PublicationDateTo.HasValue)
                query = query.Where(p => p.PublicationDate <= request.Filter.PublicationDateTo.Value);

            return await query.ToListAsync(cancellationToken);
        }
    }
}
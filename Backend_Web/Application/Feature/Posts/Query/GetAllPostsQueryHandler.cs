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
    public class GetAllPostsQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetAllPostsQuery, IEnumerable<Post>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<Post>> Handle(GetAllPostsQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<Post>, IQueryable<Post>> includeExpression = query =>
                query.Include(p => p.Translations).ThenInclude(t => t.Language)
                     .Include(p => p.Category).ThenInclude(c => c.Translations).ThenInclude(t => t.Language)
                     .Include(p => p.Author);

            var posts = await _unitOfWork.Repository<Post>()
                .FindWithComplexIncludes(
                    predicate: c => true,
                    includeExpression: includeExpression,
                    asNoTracking: true)
                .ToListAsync(cancellationToken);

            return posts;
        }
    }
}
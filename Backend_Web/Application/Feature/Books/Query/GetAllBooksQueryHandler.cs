using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Books.Query
{
    public class GetAllBooksQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetAllBooksQuery, IEnumerable<Book>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<Book>> Handle(GetAllBooksQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<Book>, IQueryable<Book>> includeExpression = query =>
                query.Include(b => b.Translations).ThenInclude(t => t.Language)
                     .Include(b => b.CoverImage)
                     .Include(b => b.BookFile);

            var books = await _unitOfWork.Repository<Book>()
                .FindWithComplexIncludes(
                    predicate: b => true,
                    includeExpression: includeExpression,
                    asNoTracking: true)
                .ToListAsync(cancellationToken);

            return books;
        }
    }
}
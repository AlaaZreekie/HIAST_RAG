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
    public class GetBooksByFilterQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetBooksByFilterQuery, IEnumerable<Book>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<Book>> Handle(GetBooksByFilterQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<Book>, IQueryable<Book>> includeExpression = query =>
                query.Include(b => b.Translations).ThenInclude(t => t.Language)
                     .Include(b => b.CoverImage)
                     .Include(b => b.BookFile);

            var query = _unitOfWork.Repository<Book>()
                .FindWithComplexIncludes(
                    predicate: b => true,
                    includeExpression: includeExpression,
                    asNoTracking: true);

            if (request.Filter.Id.HasValue)
                query = query.Where(b => b.Id == request.Filter.Id.Value);

            if (!string.IsNullOrWhiteSpace(request.Filter.Author))
                query = query.Where(b => b.Author.ToLower().Contains(request.Filter.Author.Trim().ToLower()));

            if (request.Filter.PublicationYear.HasValue)
                query = query.Where(b => b.PublicationYear == request.Filter.PublicationYear.Value);

            if (!string.IsNullOrWhiteSpace(request.Filter.ISBN))
                query = query.Where(b => b.ISBN.ToLower().Contains(request.Filter.ISBN.Trim().ToLower()));

            if (!string.IsNullOrWhiteSpace(request.Filter.Title))
                query = query.Where(b => b.Translations.Any(t => t.Title.ToLower().Contains(request.Filter.Title.Trim().ToLower())));

            if (!string.IsNullOrWhiteSpace(request.Filter.Description))
                query = query.Where(b => b.Translations.Any(t => t.Description.Contains(request.Filter.Description.Trim())));

            if (request.Filter.LanguageCode.HasValue)
                query = query.Where(b => b.Translations.Any(t => t.Language!.Code == request.Filter.LanguageCode.Value));

            return await query.ToListAsync(cancellationToken);
        }
    }
}
using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Testimonials.Query
{
    public class GetTestimonialsByFilterQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetTestimonialsByFilterQuery, IEnumerable<Testimonial>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<Testimonial>> Handle(GetTestimonialsByFilterQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<Testimonial>, IQueryable<Testimonial>> includeExpression = query =>
                query.Include(t => t.Media).Include(t => t.Media.MediaCategory)
                     .Include(t => t.Translations).ThenInclude(t => t.Language);

            var query = _unitOfWork.Repository<Testimonial>()
                .FindWithComplexIncludes(
                    predicate: t => true,
                    includeExpression: includeExpression,
                    asNoTracking: true);

            if (request.Filter.Id.HasValue)
                query = query.Where(t => t.Id == request.Filter.Id.Value);

            if (!string.IsNullOrWhiteSpace(request.Filter.GraduateName))
                query = query.Where(t => t.GraduateName.ToLower().Contains(request.Filter.GraduateName.Trim().ToLower()));

            if (request.Filter.GraduateYear.HasValue)
                query = query.Where(t => t.GraduateYear == request.Filter.GraduateYear.Value);

            if (!string.IsNullOrWhiteSpace(request.Filter.Quote))
                query = query.Where(t => t.Translations.Any(tr => tr.Quote.ToLower().Contains(request.Filter.Quote.Trim().ToLower())));

            if (request.Filter.LanguageCode.HasValue)
                query = query.Where(t => t.Translations.Any(tr => tr.Language!.Code == request.Filter.LanguageCode.Value));

            return await query.ToListAsync(cancellationToken);
        }
    }
}
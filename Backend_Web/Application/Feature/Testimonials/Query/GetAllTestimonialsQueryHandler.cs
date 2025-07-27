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
    public class GetAllTestimonialsQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetAllTestimonialsQuery, IEnumerable<Testimonial>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<Testimonial>> Handle(GetAllTestimonialsQuery request, CancellationToken cancellationToken)
        {
            Func<IQueryable<Testimonial>, IQueryable<Testimonial>> includeExpression = query =>
                query.Include(t => t.Media).Include(t => t.Media.MediaCategory)
                     .Include(t => t.Translations).ThenInclude(t => t.Language);

            var testimonials = await _unitOfWork.Repository<Testimonial>()
                .FindWithComplexIncludes(
                    predicate: t => true,
                    includeExpression: includeExpression,
                    asNoTracking: true)
                .ToListAsync(cancellationToken);

            return testimonials;
        }
    }
}
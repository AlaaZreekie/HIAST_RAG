using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Languages.Query
{
    public class GetLanguageByFilterQueryHandler : IRequestHandler<GetLanguageByFilterQuery, IEnumerable<Language>>
    {
        private readonly IAppUnitOfWork _unitOfWork;

        public GetLanguageByFilterQueryHandler(IAppUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Language>> Handle(GetLanguageByFilterQuery request, CancellationToken cancellationToken)
        {
            Expression<Func<Language, bool>> predicate = l =>
                (!request.Filter.Id.HasValue || l.Id == request.Filter.Id.Value) &&
                (string.IsNullOrEmpty(request.Filter.Name) || l.Name.Contains(request.Filter.Name)) &&
                (!request.Filter.Code.HasValue || l.Code == request.Filter.Code.Value);

            var languages = await _unitOfWork.Repository<Language>().FindAsync(predicate);
            return languages;
        }
    }
}

using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Prges.Query
{
    public class GetAllLanguagesQueryHandler : IRequestHandler<GetAllLanguagesQuery, IEnumerable<Language>>
    {
        private readonly IAppUnitOfWork _unitOfWork;

        public GetAllLanguagesQueryHandler(IAppUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<IEnumerable<Language>> Handle(GetAllLanguagesQuery request, CancellationToken cancellationToken)
        {
            return await _unitOfWork.Repository<Language>().GetAllAsync(asNoTracking: true);
        }
    }
}

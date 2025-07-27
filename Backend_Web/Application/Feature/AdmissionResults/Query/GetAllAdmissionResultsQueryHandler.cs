using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.AdmissionResults.Query
{
    public class GetAllAdmissionResultsQueryHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<GetAllAdmissionResultsQuery, IEnumerable<AdmissionResult>>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<IEnumerable<AdmissionResult>> Handle(GetAllAdmissionResultsQuery request, CancellationToken cancellationToken)
        {
            return await _unitOfWork.Repository<AdmissionResult>().Find(a => true,asNoTracking: true,
                a => a.Admission,
                a => a.Admission.Program,
                a => a.Admission.Program.Translations,
                a => a.Admission.Location,
                a => a.Admission.Location.Translations,
                a => a.Media
                ).ToListAsync(cancellationToken);
        }
    }
}

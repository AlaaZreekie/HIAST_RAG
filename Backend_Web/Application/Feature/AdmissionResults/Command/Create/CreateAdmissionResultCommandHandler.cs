using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.AdmissionResults.Command.Create
{
    public class CreateAdmissionResultCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<CreateAdmissionResultCommand, Guid>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<Guid> Handle(CreateAdmissionResultCommand request, CancellationToken cancellationToken)
        {
            await _unitOfWork.Repository<AdmissionResult>().InsertAsync(request.AdmissionResult);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            return request.AdmissionResult.Id;
        }
    }
}

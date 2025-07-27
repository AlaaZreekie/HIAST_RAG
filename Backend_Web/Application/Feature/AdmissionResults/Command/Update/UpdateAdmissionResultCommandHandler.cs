using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.AdmissionResults.Command.Update
{
    public class UpdateAdmissionResultCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<UpdateAdmissionResultCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(UpdateAdmissionResultCommand request, CancellationToken cancellationToken)
        {
            var result = await _unitOfWork.Repository<AdmissionResult>()
                .Find(ar => ar.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (result is null)
                throw new KeyNotFoundException("Admission Result not found.");

            if (result.ResultType != request.ResultType)
                result.ResultType = request.ResultType;

            _unitOfWork.Repository<AdmissionResult>().Update(result);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}

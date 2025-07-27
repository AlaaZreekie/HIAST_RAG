using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Admissions.Command.Create
{
    public class CreateAdmissionCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<CreateAdmissionCommand, Guid>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<Guid> Handle(CreateAdmissionCommand request, CancellationToken cancellationToken)
        {
            await _unitOfWork.Repository<Admission>().InsertAsync(request.Admission);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            return request.Admission.Id;
        }
    }
}
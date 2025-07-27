using Application.IUnitOfWork;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.AdmissionExams.Command.Create
{
    public class CreateAdmissionExamCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<CreateAdmissionExamCommand, Guid>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<Guid> Handle(CreateAdmissionExamCommand request, CancellationToken cancellationToken)
        {
            await _unitOfWork.Repository<Domain.Entity.ApplicationEntity.AdmissionExam>().InsertAsync(request.AdmissionExam);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            return request.AdmissionExam.Id;
        }
    }
}
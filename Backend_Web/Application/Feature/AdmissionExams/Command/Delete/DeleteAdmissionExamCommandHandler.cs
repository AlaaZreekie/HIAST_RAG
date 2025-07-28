using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.AdmissionExams.Command.Delete
{
    public class DeleteAdmissionExamCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<DeleteAdmissionExamCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(DeleteAdmissionExamCommand request, CancellationToken cancellationToken)
        {
            var examToDelete = await _unitOfWork.Repository<AdmissionExam>()
                .Find(b => b.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (examToDelete is null)
                throw new KeyNotFoundException("Admission exam not found.");

            _unitOfWork.Repository<AdmissionExam>().Remove(examToDelete);
            if(request.save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}
using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Admissions.Command.Delete
{
    public class DeleteAdmissionCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<DeleteAdmissionCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(DeleteAdmissionCommand request, CancellationToken cancellationToken)
        {
            var admission = await _unitOfWork.Repository<Admission>()
                .Find(a => a.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (admission is null)
                throw new KeyNotFoundException("Admission not found.");

            _unitOfWork.Repository<Admission>().Remove(admission);
            if(request.save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}
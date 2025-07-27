using Application.Feature.Programs.Command.Delete;
using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Specializations.Command.Delete
{
    public class DeleteSpecializationCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<DeleteSpecializationCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(DeleteSpecializationCommand request, CancellationToken cancellationToken)
        {
            var specializationToDelete = await _unitOfWork.Repository<Specialization>()
                .Find(p => p.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (specializationToDelete is null)
                throw new KeyNotFoundException("Specialization not found.");

            _unitOfWork.Repository<Specialization>().Remove(specializationToDelete);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}

using Application.IUnitOfWork;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Programs.Command.Delete
{
    public class DeleteProgramCommandHandler : IRequestHandler<DeleteProgramCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork;

        public DeleteProgramCommandHandler(IAppUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task Handle(DeleteProgramCommand request, CancellationToken cancellationToken)
        {
            var programToDelete = await _unitOfWork.Repository<Domain.Entity.ApplicationEntity.Program>()
                .Find(p => p.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (programToDelete is null)
                throw new Exception("Program not found.");
            
            _unitOfWork.Repository<Domain.Entity.ApplicationEntity.Program>().Remove(programToDelete);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}

using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Programs.Command.Delete
{
    public class DeleteProgramCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<DeleteProgramCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(DeleteProgramCommand request, CancellationToken cancellationToken)
        {
            var programToDelete = await _unitOfWork.Repository<Program>()
                .Find(p => p.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (programToDelete is null)
                throw new KeyNotFoundException("Program not found.");
            
            _unitOfWork.Repository<Program>().Remove(programToDelete);
            if(request.save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}

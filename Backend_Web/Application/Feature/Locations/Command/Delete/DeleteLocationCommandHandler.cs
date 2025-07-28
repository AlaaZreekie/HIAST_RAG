using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Locations.Command.Delete
{
    public class DeleteLocationCommandHandler : IRequestHandler<DeleteLocationCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork;

        public DeleteLocationCommandHandler(IAppUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task Handle(DeleteLocationCommand request, CancellationToken cancellationToken)
        {
            var locationToDelete = await _unitOfWork.Repository<Location>()
                .Find(l => l.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (locationToDelete is null)
            {
                throw new Exception("Location not found.");
            }

            _unitOfWork.Repository<Location>().Remove(locationToDelete);
            if(request.save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}

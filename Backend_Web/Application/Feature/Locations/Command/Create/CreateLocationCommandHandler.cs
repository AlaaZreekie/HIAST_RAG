using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Locations.Command.Create
{
    public class CreateLocationCommandHandler : IRequestHandler<CreateLocationCommand, Guid>
    {
        private readonly IAppUnitOfWork _unitOfWork;

        public CreateLocationCommandHandler(IAppUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Guid> Handle(CreateLocationCommand request, CancellationToken cancellationToken)
        {
            await _unitOfWork.Repository<Location>().InsertAsync(request.Location);
            if(request.Save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
            return request.Location.Id;
        }
    }
}

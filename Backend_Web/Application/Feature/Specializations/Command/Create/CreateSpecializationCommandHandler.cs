using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Specializations.Command.Create
{
    public class CreateSpecializationCommandHandler : IRequestHandler<CreateSpecializationCommand, Guid>
    {
        private readonly IAppUnitOfWork _unitOfWork;

        public CreateSpecializationCommandHandler(IAppUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task<Guid> Handle(CreateSpecializationCommand request, CancellationToken cancellationToken)
        {
            await _unitOfWork.Repository<Specialization>().InsertAsync(request.Specialization);
            if(request.Save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
            return request.Specialization.Id;
        }
    }
}

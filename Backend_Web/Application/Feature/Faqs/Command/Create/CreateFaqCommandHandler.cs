using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Faqs.Command.Create
{
    public class CreateFaqCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<CreateFaqCommand, Guid>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<Guid> Handle(CreateFaqCommand request, CancellationToken cancellationToken)
        {
            await _unitOfWork.Repository<Faq>().InsertAsync(request.Faq);
            if(request.Save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
            return request.Faq.Id;
        }
    }
}

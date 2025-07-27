using Application.IUnitOfWork;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Pages.Command.Create
{
    public class CreatePageCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<CreatePageCommand, Guid>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<Guid> Handle(CreatePageCommand request, CancellationToken cancellationToken)
        {
            await _unitOfWork.Repository<Domain.Entity.ApplicationEntity.Page>().InsertAsync(request.Page);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            return request.Page.Id;
        }
    }
}
using Application.IUnitOfWork;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.MediaCategories.Command.Create
{
    public class CreateMediaCategoryCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<CreateMediaCategoryCommand, Guid>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<Guid> Handle(CreateMediaCategoryCommand request, CancellationToken cancellationToken)
        {
            await _unitOfWork.Repository<Domain.Entity.ApplicationEntity.MediaCategory>().InsertAsync(request.Category);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            return request.Category.Id;
        }
    }
}
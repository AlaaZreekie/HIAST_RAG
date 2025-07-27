using Application.Feature._1.Command.Create;
using Application.IUnitOfWork;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Categories.Command.Create
{
    public class CreateCategoryCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<CreateCategoryCommand, Guid>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<Guid> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
        {
            await _unitOfWork.Repository<Domain.Entity.ApplicationEntity.Category>().InsertAsync(request.Category);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            return request.Category.Id;
        }
    }
}
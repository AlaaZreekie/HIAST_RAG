using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.FaqCategories.Command.Create
{
    public class CreateFaqCategoryCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<CreateFaqCategoryCommand, Guid>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<Guid> Handle(CreateFaqCategoryCommand request, CancellationToken cancellationToken)
        {
            await _unitOfWork.Repository<FaqCategory>().InsertAsync(request.FaqCategory);
            if(request.Save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
            return request.FaqCategory.Id;
        }
    }
}

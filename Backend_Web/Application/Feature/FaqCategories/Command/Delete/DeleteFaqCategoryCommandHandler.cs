using Application.IUnitOfWork;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.FaqCategories.Command.Delete
{
    public class DeleteFaqCategoryCommandHandler : IRequestHandler<DeleteFaqCategoryCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork;

        public DeleteFaqCategoryCommandHandler(IAppUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task Handle(DeleteFaqCategoryCommand request, CancellationToken cancellationToken)
        {
            var faqCategoryToDelete = await _unitOfWork.Repository<Domain.Entity.ApplicationEntity.FaqCategory>()
                .Find(fc => fc.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (faqCategoryToDelete is null)            
                throw new Exception("FaqCategory not found.");            

            _unitOfWork.Repository<Domain.Entity.ApplicationEntity.FaqCategory>().Remove(faqCategoryToDelete);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}

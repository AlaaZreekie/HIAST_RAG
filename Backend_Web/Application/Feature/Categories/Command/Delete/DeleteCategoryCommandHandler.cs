using Application.Feature._1.Command.Update;
using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Categories.Command.Delete
{
    public class DeleteCategoryCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<DeleteCategoryCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _unitOfWork.Repository<Category>()
                .Find(c => c.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (category is null)
                throw new KeyNotFoundException("Category not found.");
            _unitOfWork.Repository<Category>().Remove(category);
            if(request.save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
            
        }
    }
}
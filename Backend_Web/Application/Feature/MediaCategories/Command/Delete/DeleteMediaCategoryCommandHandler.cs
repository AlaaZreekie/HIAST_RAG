using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.MediaCategories.Command.Delete
{
    public class DeleteMediaCategoryCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<DeleteMediaCategoryCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(DeleteMediaCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _unitOfWork.Repository<MediaCategory>()
                .Find(c => c.Id == request.Id,navigationProperties: c => c.Media )
                .FirstOrDefaultAsync(cancellationToken);
;
            if (category is null)
                throw new KeyNotFoundException("");

            if (category.Media is not null && category.Media.Any())
                throw new Exception("This media category cannot be deleted because it is currently in use by one or more media files.");
            
            _unitOfWork.Repository<MediaCategory>().Remove(category);
            await _unitOfWork.SaveChangesAsync(cancellationToken);            
        }
    }
}
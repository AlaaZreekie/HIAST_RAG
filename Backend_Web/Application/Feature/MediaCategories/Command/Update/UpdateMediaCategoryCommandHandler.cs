using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.MediaCategories.Command.Update
{
    public class UpdateMediaCategoryCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<UpdateMediaCategoryCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(UpdateMediaCategoryCommand request, CancellationToken cancellationToken)
        {
            var category = await _unitOfWork.Repository<MediaCategory>()
                .Find(c => c.Id == request.Id, navigationProperties: c => c.Translations)
                .FirstOrDefaultAsync(cancellationToken);

            if (category is null)
                throw new Exception("Media Category not found.");

            if (request.Translations != null)
            {
                foreach (var transUpdate in request.Translations)
                {
                    var existingTranslation = category.Translations.FirstOrDefault(t => t.Id == transUpdate.Id);
                    if (existingTranslation != null)
                    {
                        if (!string.IsNullOrWhiteSpace(transUpdate.Name) && existingTranslation.Name != transUpdate.Name)
                            existingTranslation.Name = transUpdate.Name;
                        
                    }
                }
            }

            _unitOfWork.Repository<MediaCategory>().Update(category);
            if(request.Save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}
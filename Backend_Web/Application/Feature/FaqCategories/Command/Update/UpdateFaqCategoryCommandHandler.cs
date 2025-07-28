using Application.Feature.FaqCategories.Command.Delete;
using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.FaqCategories.Command.Update
{
    public class UpdateFaqCategoryCommandHandler : IRequestHandler<UpdateFaqCategoryCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork;

        public UpdateFaqCategoryCommandHandler(IAppUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task Handle(UpdateFaqCategoryCommand request, CancellationToken cancellationToken)
        {
            var faqCategory = await _unitOfWork.Repository<FaqCategory>()
                .Find(fc => fc.Id == request.Id, navigationProperties: fc => fc.Translations)
                .FirstOrDefaultAsync(cancellationToken);

            if (faqCategory is null)            
                throw new KeyNotFoundException("FaqCategory not found.");            

            if (request.Translations != null)
            {
                foreach (var transDto in request.Translations)
                {
                    var translationToUpdate = faqCategory.Translations.FirstOrDefault(t => t.Id == transDto.Id);
                    if (translationToUpdate != null)
                    {
                        if (!string.IsNullOrWhiteSpace(transDto.Name) && (translationToUpdate.Name != transDto.Name))                        
                            translationToUpdate.Name = transDto.Name;                        
                    }
                }
            }

            _unitOfWork.Repository<FaqCategory>().Update(faqCategory);
            if(request.Save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}

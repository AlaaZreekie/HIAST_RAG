using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Faqs.Command.Update
{
    public class UpdateFaqCommandHandler : IRequestHandler<UpdateFaqCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork;

        public UpdateFaqCommandHandler(IAppUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task Handle(UpdateFaqCommand request, CancellationToken cancellationToken)
        {
            var faq = await _unitOfWork.Repository<Faq>()
                .Find(f => f.Id == request.Id, navigationProperties: f => f.Translations)
                .FirstOrDefaultAsync(cancellationToken);

            if (faq is null)            
                throw new KeyNotFoundException("FAQ not found.");
            
            if (request.DisplayOrder.HasValue && faq.DisplayOrder != request.DisplayOrder.Value)            
                faq.DisplayOrder = request.DisplayOrder.Value;
            
            if (request.FaqCategoryId.HasValue && faq.FaqCategoryId != request.FaqCategoryId.Value)            
                faq.FaqCategoryId = request.FaqCategoryId.Value;
            
            if (request.Translations != null && request.Translations.Any())
            {
                foreach (var transDto in request.Translations)
                {
                    var translationToUpdate = faq.Translations.FirstOrDefault(t => t.Id == transDto.Id);
                    if (translationToUpdate != null)
                    {
                        if (!string.IsNullOrWhiteSpace(transDto.Question) && translationToUpdate.Question.Trim().ToLower() != transDto.Question.Trim().ToLower())                        
                            translationToUpdate.Question = transDto.Question;
                        
                        if (transDto.Answer is not null && translationToUpdate.Answer.Trim().ToLower() != transDto.Answer.Trim().ToLower())                        
                            translationToUpdate.Answer = transDto.Answer;                        
                    }
                }
            }

            _unitOfWork.Repository<Faq>().Update(faq);
            if(request.Save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}

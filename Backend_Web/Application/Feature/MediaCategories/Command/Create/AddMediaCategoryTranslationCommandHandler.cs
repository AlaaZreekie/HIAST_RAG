using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.MediaCategories.Command.Create
{
    public class AddMediaCategoryTranslationCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<AddMediaCategoryTranslationCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(AddMediaCategoryTranslationCommand request, CancellationToken cancellationToken)
        {
            var category = await _unitOfWork.Repository<MediaCategory>()
                .Find(c => c.Id == request.MediaCategoryId, navigationProperties: c => c.Translations)
                .FirstOrDefaultAsync(cancellationToken);

            if (category is null)
                throw new Exception("Media Category not found.");

            var translationExists = category.Translations.Any(t => t.LanguageId == request.LanguageId);
            if (translationExists)
                throw new Exception("A translation for this language already exists for the specified category.");

            var newTranslation = new MediaCategoryTranslation
            {
                LanguageId = request.LanguageId,
                Name = request.Name,
            };

            category.Translations.Add(newTranslation);
            _unitOfWork.Repository<MediaCategory>().Update(category);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}
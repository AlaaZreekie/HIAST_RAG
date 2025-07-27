using Application.Common.Utilities;
using Application.Feature._1.Command.Create;
using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Categories.Command.Create
{
    public class AddCategoryTranslationCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<AddCategoryTranslationCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(AddCategoryTranslationCommand request, CancellationToken cancellationToken)
        {
            var category = await _unitOfWork.Repository<Category>()
                .Find(c => c.Id == request.CategoryId, navigationProperties: c => c.Translations)
                .FirstOrDefaultAsync(cancellationToken);

            if (category is null)
                throw new Exception("Category not found.");

            var translationExists = category.Translations.Any(t => t.LanguageId == request.LanguageId);
            if (translationExists)
                throw new Exception("A translation for this language already exists for the specified category.");

            var newTranslation = new CategoryTranslation
            {
                LanguageId = request.LanguageId,
                Name = request.Name,
                Slug = SlugGenerator.Slugify(request.Name)
            };

            category.Translations.Add(newTranslation);
            _unitOfWork.Repository<Category>().Update(category);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}
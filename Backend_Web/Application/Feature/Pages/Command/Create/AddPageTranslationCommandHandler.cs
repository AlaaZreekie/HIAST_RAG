using Application.Common.Utilities;
using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Text.RegularExpressions; // For slug generation
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Pages.Command.Create
{
    public class AddPageTranslationCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<AddPageTranslationCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(AddPageTranslationCommand request, CancellationToken cancellationToken)
        {
            var page = await _unitOfWork.Repository<Page>()
                .Find(p => p.Id == request.PageId, navigationProperties: p => p.Translations)
                .FirstOrDefaultAsync(cancellationToken);

            if (page is null)
                throw new Exception("Page not found.");

            var translationExists = page.Translations.Any(t => t.LanguageId == request.LanguageId);
            if (translationExists)
                throw new Exception("A translation for this language already exists for the specified page.");

            var slug = SlugGenerator.Generate(request.Title, request.LanguageCode);
            var newTranslation = new PageTranslation
            {
                LanguageId = request.LanguageId,
                Title = request.Title,
                Content = request.Content,
                Slug = slug
            };

            page.Translations.Add(newTranslation);
            _unitOfWork.Repository<Page>().Update(page);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}
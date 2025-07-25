using Application.Common.Utilities;
using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Pages.Command.Update
{
    public class UpdatePageCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<UpdatePageCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(UpdatePageCommand request, CancellationToken cancellationToken)
        {
            var page = await _unitOfWork.Repository<Page>()
                .Find(p => p.Id == request.Id, navigationProperties: p => p.Translations)
                .FirstOrDefaultAsync(cancellationToken);

            if (page is null)
                throw new KeyNotFoundException("Page not found.");           

            if (request.Translations != null)
            {
                foreach (var transUpdate in request.Translations)
                {
                    var existingTranslation = page.Translations.FirstOrDefault(t => t.Id == transUpdate.Id);
                    if (existingTranslation != null)
                    {
                        if (!string.IsNullOrWhiteSpace(transUpdate.Title) && existingTranslation.Title != transUpdate.Title)
                        {
                            existingTranslation.Title = transUpdate.Title;

                            int lastSlashIndex = existingTranslation.Slug.LastIndexOf('/');
                            if (lastSlashIndex >= 0)
                            {
                                string langPrefix = existingTranslation.Slug.Substring(0, lastSlashIndex + 1);
                                string newTitleSlug = SlugGenerator.Slugify(transUpdate.Title);
                                existingTranslation.Slug = langPrefix + newTitleSlug;
                            }
                            else
                            {
                                existingTranslation.Slug = SlugGenerator.Slugify(transUpdate.Title);
                            }
                        }

                        if (transUpdate.Content != null && existingTranslation.Content != transUpdate.Content)
                            existingTranslation.Content = transUpdate.Content;
                    }
                }
            }

            _unitOfWork.Repository<Page>().Update(page);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}
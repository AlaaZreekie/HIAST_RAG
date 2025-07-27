using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Posts.Command.Create
{
    public class AddPostTranslationCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<AddPostTranslationCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(AddPostTranslationCommand request, CancellationToken cancellationToken)
        {
            var post = await _unitOfWork.Repository<Post>()
                .Find(c => c.Id == request.PostId, navigationProperties: c => c.Translations)
                .FirstOrDefaultAsync(cancellationToken);

            if (post is null)
                throw new Exception("Post not found.");

            var translationExists = post.Translations.Any(t => t.LanguageId == request.LanguageId);
            if (translationExists)
                throw new Exception("A translation for this language already exists for the specified post.");

            var newTranslation = new PostTranslation
            {
                LanguageId = request.LanguageId,
                Title = request.Title,
                Content = request.Content
            };

            post.Translations.Add(newTranslation);
            _unitOfWork.Repository<Post>().Update(post);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}
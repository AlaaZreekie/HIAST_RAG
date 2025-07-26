using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Posts.Command.Update
{
    public class UpdatePostCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<UpdatePostCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(UpdatePostCommand request, CancellationToken cancellationToken)
        {
            var post = await _unitOfWork.Repository<Post>()
                .Find(c => c.Id == request.Id, navigationProperties: c => c.Translations)
                .FirstOrDefaultAsync(cancellationToken);

            if (post is null)
                throw new Exception("Post not found.");

            if (request.PublicationDate.HasValue && post.PublicationDate != request.PublicationDate.Value)
                post.PublicationDate = request.PublicationDate.Value;

            if (request.CategoryId.HasValue && post.CategoryId != request.CategoryId.Value)
                post.CategoryId = request.CategoryId.Value;

            if (request.Translations != null)
            {
                foreach (var transUpdate in request.Translations)
                {
                    var existingTranslation = post.Translations.FirstOrDefault(t => t.Id == transUpdate.Id);
                    if (existingTranslation != null)
                    {
                        if (!string.IsNullOrWhiteSpace(transUpdate.Title) && existingTranslation.Title.Trim().ToLower() != transUpdate.Title.Trim().ToLower())
                            existingTranslation.Title = transUpdate.Title;

                        if (transUpdate.Content != null && existingTranslation.Content.Trim().ToLower() != transUpdate.Content.Trim().ToLower())
                            existingTranslation.Content = transUpdate.Content;
                    }
                }
            }

            _unitOfWork.Repository<Post>().Update(post);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}
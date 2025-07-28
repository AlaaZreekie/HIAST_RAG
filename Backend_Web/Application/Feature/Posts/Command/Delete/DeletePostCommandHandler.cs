using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Posts.Command.Delete
{
    public class DeletePostCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<DeletePostCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(DeletePostCommand request, CancellationToken cancellationToken)
        {
            var post = await _unitOfWork.Repository<Post>()
                .Find(c => c.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (post is not null)
            {
                _unitOfWork.Repository<Post>().Remove(post);
                if(request.save)
                    await _unitOfWork.SaveChangesAsync(cancellationToken);
            }
        }
    }
}
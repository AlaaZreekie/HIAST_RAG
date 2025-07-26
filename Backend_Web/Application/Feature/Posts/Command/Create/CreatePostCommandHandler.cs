using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Posts.Command.Create
{
    public class CreatePostCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<CreatePostCommand, Guid>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<Guid> Handle(CreatePostCommand request, CancellationToken cancellationToken)
        {
            await _unitOfWork.Repository<Post>().InsertAsync(request.Post);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            return request.Post.Id;
        }
    }
}
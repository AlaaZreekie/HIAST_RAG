using Application.Feature.Medias.Command.Create;
using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Medias.Command.Create
{
    public class CreateMediaCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<CreateMediaCommand, Guid>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<Guid> Handle(CreateMediaCommand request, CancellationToken cancellationToken)
        {
            await _unitOfWork.Repository<Media>().InsertAsync(request.Media);
            if(request.Save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
            return request.Media.Id;
        }
    }
}
using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Medias.Command.Delete
{
    public class DeleteMediaCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<DeleteMediaCommand, string?>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<string?> Handle(DeleteMediaCommand request, CancellationToken cancellationToken)
        {
            var media = await _unitOfWork.Repository<Media>()
                .Find(m => m.Id == request.Id, asNoTracking: true)
                .FirstOrDefaultAsync(cancellationToken);

            if (media is null)            
                throw new KeyNotFoundException("Media not found.");
            
            var filePathToDelete = media.FilePath;
            _unitOfWork.Repository<Media>().Remove(media);
            if(request.save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
            return filePathToDelete;
        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Medias.Command.Delete
{
    using Application.IUnitOfWork;
    using Domain.Entity.ApplicationEntity;
    using global::Application.IUnitOfWork;
    using MediatR;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Threading;
    using System.Threading.Tasks;

    namespace Application.Feature.Medias.Command.Delete
    {
        // The handler's signature is updated to return a nullable string.
        public class DeleteMediaCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<DeleteMediaCommand, string?>
        {
            private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

            public async Task<string?> Handle(DeleteMediaCommand request, CancellationToken cancellationToken)
            {
                // We use AsNoTracking here for a slight performance gain, as we only need to read
                // the FilePath before deleting the entity by reference.
                var media = await _unitOfWork.Repository<Media>()
                    .Find(m => m.Id == request.Id, asNoTracking: true)
                    .FirstOrDefaultAsync(cancellationToken);

                // If the media record doesn't exist, return null.
                if (media is null)
                {
                    return null;
                }

                // Store the file path before deleting the record.
                var filePathToDelete = media.FilePath;

                // Delete the database record. We can pass the entity object directly to Remove.
                _unitOfWork.Repository<Media>().Remove(media);
                await _unitOfWork.SaveChangesAsync(cancellationToken);

                // Return the stored file path to the caller (the service layer).
                return filePathToDelete;
            }
        }
    }
}

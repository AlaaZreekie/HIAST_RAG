using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Medias.Command.Update
{
    public class UpdateMediaCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<UpdateMediaCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(UpdateMediaCommand request, CancellationToken cancellationToken)
        {
            var media = await _unitOfWork.Repository<Media>()
                .Find(m => m.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (media is null)
                throw new Exception("Media file not found.");

            if (media.MediaCategoryId != request.MediaCategoryId)
                media.MediaCategoryId = request.MediaCategoryId;

            _unitOfWork.Repository<Media>().Update(media);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}

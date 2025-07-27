using Application.Feature.Slides.Command.Delete;
using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Sliders.Command.Delete
{
    public class DeleteSliderCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<DeleteSliderCommand, Guid?>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<Guid?> Handle(DeleteSliderCommand request, CancellationToken cancellationToken)
        {
            var sliderToDelete = await _unitOfWork.Repository<Slider>()
                .Find(s => s.Id == request.Id)
                .FirstOrDefaultAsync(cancellationToken);

            if (sliderToDelete is null) return null;

            var fileId = sliderToDelete.MediaId;

            _unitOfWork.Repository<Slider>().Remove(sliderToDelete);

            await _unitOfWork.SaveChangesAsync(cancellationToken);

            return fileId;
        }
    }
}
using Application.Feature.Slides.Command.Create;
using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Sliders.Command.Create
{
    public class CreateSliderCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<CreateSliderCommand, Guid>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<Guid> Handle(CreateSliderCommand request, CancellationToken cancellationToken)
        {
            await _unitOfWork.Repository<Slider>().InsertAsync(request.Slider);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
            return request.Slider.Id;
        }
    }
}
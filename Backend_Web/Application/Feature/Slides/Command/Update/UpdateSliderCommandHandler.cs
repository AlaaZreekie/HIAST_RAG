using Application.Feature.Slides.Command.Update;
using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Sliders.Command.Update
{
    public class UpdateSliderCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<UpdateSliderCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(UpdateSliderCommand request, CancellationToken cancellationToken)
        {
            var slider = await _unitOfWork.Repository<Slider>()
                .Find(s => s.Id == request.Id, navigationProperties: s => s.Translations)
                .FirstOrDefaultAsync(cancellationToken);

            if (slider is null)
                throw new KeyNotFoundException("Slider not found.");

            if (!string.IsNullOrWhiteSpace(request.LinkURL))
                slider.LinkURL = request.LinkURL;

            if (request.Translations != null)
            {
                foreach (var transUpdate in request.Translations)
                {
                    var existingTranslation = slider.Translations.FirstOrDefault(t => t.Id == transUpdate.Id);
                    if (existingTranslation != null)                    
                        existingTranslation.Title = transUpdate.Title;                    
                }
            }

            _unitOfWork.Repository<Slider>().Update(slider);
            if(request.Save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}
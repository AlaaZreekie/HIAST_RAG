using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Testimonials.Command.Update
{
    public class UpdateTestimonialCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<UpdateTestimonialCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(UpdateTestimonialCommand request, CancellationToken cancellationToken)
        {
            var testimonial = await _unitOfWork.Repository<Testimonial>()
                .Find(t => t.Id == request.Id, navigationProperties: t => t.Translations)
                .FirstOrDefaultAsync(cancellationToken);

            if (testimonial is null)
                throw new KeyNotFoundException("Testimonial not found.");

            if (!string.IsNullOrWhiteSpace(request.GraduateName) && testimonial.GraduateName != request.GraduateName)
                testimonial.GraduateName = request.GraduateName;

            if (request.GraduateYear.HasValue && testimonial.GraduateYear != request.GraduateYear.Value)
                testimonial.GraduateYear = request.GraduateYear.Value;

            if (request.MediaId.HasValue && testimonial.MediaId != request.MediaId.Value)
                testimonial.MediaId = request.MediaId.Value;

            if (request.Translations != null)
            {
                foreach (var transUpdate in request.Translations)
                {
                    var existingTranslation = testimonial.Translations.FirstOrDefault(t => t.Id == transUpdate.Id);
                    if (existingTranslation != null)
                    {
                        if (!string.IsNullOrWhiteSpace(transUpdate.Quote) && existingTranslation.Quote.Trim().ToLower() != transUpdate.Quote.Trim().ToLower())
                            existingTranslation.Quote = transUpdate.Quote;
                    }
                }
            }

            _unitOfWork.Repository<Testimonial>().Update(testimonial);
            if(request.Save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}
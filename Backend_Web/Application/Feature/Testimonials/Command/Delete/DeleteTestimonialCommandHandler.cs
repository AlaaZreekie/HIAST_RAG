using Application.Dtos.MediaDtos;
using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Testimonials.Command.Delete
{
    public class DeleteTestimonialCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<DeleteTestimonialCommand, MediaToDeleteDto>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<MediaToDeleteDto> Handle(DeleteTestimonialCommand request, CancellationToken cancellationToken)
        {
            var testimonialToDelete = await _unitOfWork.Repository<Testimonial>()
                .Find(t => t.Id == request.Id, asNoTracking: true)
                .FirstOrDefaultAsync(cancellationToken);

            if (testimonialToDelete is null)
                return null!;

            var otherTestimonialsUsingPhoto = await _unitOfWork.Repository<Testimonial>()
                .Find(t => t.Id != testimonialToDelete.Id && t.MediaId == testimonialToDelete.MediaId)
                .AnyAsync(cancellationToken);
                
            bool isPhotoSafeToDelete = !otherTestimonialsUsingPhoto;

            var photoMediaId = testimonialToDelete.MediaId;
            _unitOfWork.Repository<Testimonial>().Remove(testimonialToDelete);
            if(request.save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);

            return new MediaToDeleteDto() { MediaId = photoMediaId, FilePath = "" , IsSafeToDelete = isPhotoSafeToDelete};
        }
    }
}
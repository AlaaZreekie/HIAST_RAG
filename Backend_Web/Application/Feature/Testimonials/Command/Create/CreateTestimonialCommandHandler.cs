using Application.IUnitOfWork;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Testimonials.Command.Create
{
    public class CreateTestimonialCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<CreateTestimonialCommand, Guid>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task<Guid> Handle(CreateTestimonialCommand request, CancellationToken cancellationToken)
        {
            await _unitOfWork.Repository<Domain.Entity.ApplicationEntity.Testimonial>().InsertAsync(request.Testimonial);
            if(request.Save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
            return request.Testimonial.Id;
        }
    }
}
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Testimonials.Command.Create
{
    public record CreateTestimonialCommand(Testimonial Testimonial) : IRequest<Guid>;

}

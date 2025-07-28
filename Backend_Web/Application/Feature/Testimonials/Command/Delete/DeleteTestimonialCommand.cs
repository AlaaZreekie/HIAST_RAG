using Application.Dtos.MediaDtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Testimonials.Command.Delete
{
    public record DeleteTestimonialCommand(Guid Id, bool save = true) : IRequest<MediaToDeleteDto>;
}

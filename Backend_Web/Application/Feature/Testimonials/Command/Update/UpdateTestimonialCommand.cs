using Application.Dtos.TestimonialDtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Testimonials.Command.Update
{
    public class UpdateTestimonialCommand : IRequest
    {
        public Guid Id { get; set; }
        public string? GraduateName { get; set; }
        public int? GraduateYear { get; set; }
        public Guid? MediaId { get; set; }
        public IList<UpdateTestimonialTranslationDto>? Translations { get; set; }
    }
}

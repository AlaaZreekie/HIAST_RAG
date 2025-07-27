using Domain.Ennum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.TestimonialDtos
{
    public class TestimonialFilterDto
    {
        public Guid? Id { get; set; }
        public string? GraduateName { get; set; }
        public int? GraduateYear { get; set; }
        public string? Quote { get; set; }
        public LanguageCodeEnum? LanguageCode { get; set; }
    }
}

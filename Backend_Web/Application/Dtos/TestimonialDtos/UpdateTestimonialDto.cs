using Application.DTO.CommonDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.TestimonialDtos
{
    public class UpdateTestimonialDto : BaseDto<Guid>
    {
        public string? GraduateName { get; set; }
        public int? GraduateYear { get; set; }
        public Guid? MediaId { get; set; }
        public IList<UpdateTestimonialTranslationDto>? Translations { get; set; }
    }
}

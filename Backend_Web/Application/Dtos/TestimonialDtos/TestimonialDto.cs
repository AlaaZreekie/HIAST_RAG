using Application.DTO.CommonDTO;
using Application.Dtos.MediaDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.TestimonialDtos
{
    public class TestimonialDto : BaseDto<Guid>
    {
        public string GraduateName { get; set; }
        public int GraduateYear { get; set; }
        public MediaDto Media { get; set; }
        public IList<TestimonialTranslationDto>? Translations { get; set; }
    }
}

using Application.DTO.CommonDTO;
using Application.Dtos.CourseGroupDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.CourseDtos
{
    public class CourseDto : BaseDto<Guid>
    {
        public string CourseCode { get; set; }
        public decimal Credits { get; set; }
        public int TheoreticalHours { get; set; }
        public int PracticalHours { get; set; }
        public CourseGroupDto? CourseGroup { get; set; }
        public IList<CourseTranslationDto>? Translations { get; set; }
    }
}

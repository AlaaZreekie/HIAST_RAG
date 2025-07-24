using Application.DTO.CommonDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.CourseDtos
{
    public class UpdateCourseDto : BaseDto<Guid>
    {
        public string? CourseCode { get; set; }
        public decimal? Credits { get; set; }
        public int? TheoreticalHours { get; set; }
        public int? PracticalHours { get; set; }
        public Guid? CourseGroupId { get; set; }
        public IList<UpdateCourseTranslationDto>? Translations { get; set; }
    }
}

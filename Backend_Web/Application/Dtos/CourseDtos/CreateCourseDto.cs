using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.CourseDtos
{
    public class CreateCourseDto
    {
        public required string CourseCode { get; set; }
        public required decimal Credits { get; set; }
        public required int TheoreticalHours { get; set; }
        public required int PracticalHours { get; set; }
        public required Guid CourseGroupId { get; set; }
        public IList<CreateCourseTranslationDto>? Translations { get; set; }
    }
}

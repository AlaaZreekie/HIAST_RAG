using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.TrainingCourseDtos
{
    public class TrainingCourseFilterDto
    {
        public Guid? Id { get; set; }
        public Guid? TrainingCourseCategoryId { get; set; }
        public string? CourseCode { get; set; }
        public int? Year { get; set; }
        public string? Title { get; set; }
        public string? TargetAudience { get; set; }
    }
}

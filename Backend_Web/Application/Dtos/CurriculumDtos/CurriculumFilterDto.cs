using Domain.Ennum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.CurriculumDtos
{
    public class CurriculumFilterDto
    {
        public Guid? Id { get; set; }
        public int? AcademicYear { get; set; }
        public int? Semester { get; set; }
        public CourseTypeEnum? CourseType { get; set; }
        public Guid? SpecializationId { get; set; }
        public Guid? CourseId { get; set; }
    }
}

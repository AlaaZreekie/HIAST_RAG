using Domain.Ennum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.CurriculumDtos
{
    public class CreateCurriculumDto
    {
        public required int AcademicYear { get; set; }
        public required int Semester { get; set; }
        public required CourseTypeEnum CourseType { get; set; }
        public required Guid SpecializationId { get; set; }
        public required Guid CourseId { get; set; }
    }
}

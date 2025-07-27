using Application.DTO.CommonDTO;
using Application.Dtos.CourseDtos;
using Application.Dtos.SpecializationDtos;
using Domain.Ennum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.CurriculumDtos
{
    public class CurriculumDto : BaseDto<Guid>
    {
        public int AcademicYear { get; set; }
        public int Semester { get; set; }
        public CourseTypeEnum CourseType { get; set; }

        public SpecializationDto Specialization { get; set; }
        public CourseDto Course { get; set; }
    }
}

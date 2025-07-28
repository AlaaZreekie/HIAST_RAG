using Domain.Ennum;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Curriculums.Command.Update
{
    public class UpdateCurriculumCommand : IRequest
    {
        public Guid Id { get; set; }
        public int? AcademicYear { get; set; }
        public int? Semester { get; set; }
        public CourseTypeEnum? CourseType { get; set; }
        public Guid? SpecializationId { get; set; }
        public Guid? CourseId { get; set; }
        public bool Save { get; set; } = true;
    }
}

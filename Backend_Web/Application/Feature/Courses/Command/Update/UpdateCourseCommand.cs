using Application.Dtos.CourseDtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Courses.Command.Update
{
    public class UpdateCourseCommand : IRequest
    {
        public Guid Id { get; set; }
        public string? CourseCode { get; set; }
        public decimal? Credits { get; set; }
        public int? TheoreticalHours { get; set; }
        public int? PracticalHours { get; set; }
        public Guid? CourseGroupId { get; set; }
        public IList<UpdateCourseTranslationDto>? Translations { get; set; }
    }
}

using Application.Dtos.TrainingCourseDtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.TrainingCourses.Command.Update
{
    public class UpdateTrainingCourseCommand : IRequest
    {
        public Guid Id { get; set; }
        public string? CourseCode { get; set; }
        public int? DurationHours { get; set; }
        public int? NumberOfSessions { get; set; }
        public string? TargetAudience { get; set; }
        public int? Year { get; set; }
        public Guid? TrainingCourseCategoryId { get; set; }
        public IList<UpdateTrainingCourseTranslationDto>? Translations { get; set; }
        public bool Save { get; set; } = true;
    }
}

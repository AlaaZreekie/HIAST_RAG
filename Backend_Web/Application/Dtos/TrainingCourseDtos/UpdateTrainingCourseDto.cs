using Application.DTO.CommonDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.TrainingCourseDtos
{
    public class UpdateTrainingCourseDto : BaseDto<Guid>
    {
        public string? CourseCode { get; set; }
        public int? DurationHours { get; set; }
        public int? NumberOfSessions { get; set; }
        public string? TargetAudience { get; set; }
        public int? Year { get; set; }
        public Guid? TrainingCourseCategoryId { get; set; }
        public IList<UpdateTrainingCourseTranslationDto>? Translations { get; set; }
    }
}

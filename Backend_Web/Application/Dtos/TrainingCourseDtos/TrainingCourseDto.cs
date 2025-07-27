using Application.DTO.CommonDTO;
using Application.Dtos.TrainingCourseCategoryDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.TrainingCourseDtos
{
    public class TrainingCourseDto : BaseDto<Guid>
    {
        public string CourseCode { get; set; }
        public int DurationHours { get; set; }
        public int NumberOfSessions { get; set; }
        public string TargetAudience { get; set; }
        public int Year { get; set; }
        public TrainingCourseCategoryDto TrainingCourseCategory { get; set; }
        public IList<TrainingCourseTranslationDto>? Translations { get; set; }
    }
}

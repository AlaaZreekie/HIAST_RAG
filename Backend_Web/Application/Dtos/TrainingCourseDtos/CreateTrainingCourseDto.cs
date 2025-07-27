using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.TrainingCourseDtos
{
    public class CreateTrainingCourseDto
    {
        [Required]
        public string CourseCode { get; set; }
        [Required]
        public int DurationHours { get; set; }
        [Required]
        public int NumberOfSessions { get; set; }
        [Required]
        public string TargetAudience { get; set; }
        [Required]
        public int Year { get; set; }
        [Required]
        public Guid TrainingCourseCategoryId { get; set; }
        [Required]
        [MinLength(1)]
        public IList<CreateTrainingCourseTranslationDto> Translations { get; set; }
    }
}

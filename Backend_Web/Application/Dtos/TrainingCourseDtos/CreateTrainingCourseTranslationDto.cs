using Domain.Ennum;
using System.ComponentModel.DataAnnotations;

namespace Application.Dtos.TrainingCourseDtos
{
    public class CreateTrainingCourseTranslationDto
    {
        [Required]
        public LanguageCodeEnum LanguageCode { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Content { get; set; }
    }
}
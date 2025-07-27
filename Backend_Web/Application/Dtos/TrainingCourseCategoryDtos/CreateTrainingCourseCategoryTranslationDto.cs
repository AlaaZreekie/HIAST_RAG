using Domain.Ennum;
using System.ComponentModel.DataAnnotations;

namespace Application.Dtos.TrainingCourseCategoryDtos
{
    public class CreateTrainingCourseCategoryTranslationDto
    {
        [Required]
        public LanguageCodeEnum LanguageCode { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
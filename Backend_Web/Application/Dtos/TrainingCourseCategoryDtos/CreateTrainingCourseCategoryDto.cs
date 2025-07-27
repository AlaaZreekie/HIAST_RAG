using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.TrainingCourseCategoryDtos
{
    public class CreateTrainingCourseCategoryDto
    {
        [Required]
        [MinLength(1)]
        public IList<CreateTrainingCourseCategoryTranslationDto> Translations { get; set; }
    }
}

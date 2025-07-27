using Application.DTO.CommonDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.TrainingCourseCategoryDtos
{
    public class UpdateTrainingCourseCategoryDto : BaseDto<Guid>
    {
        public IList<UpdateTrainingCourseCategoryTranslationDto>? Translations { get; set; }
    }
}

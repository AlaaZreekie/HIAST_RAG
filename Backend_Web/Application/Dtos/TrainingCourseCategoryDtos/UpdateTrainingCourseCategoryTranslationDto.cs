using Application.DTO.CommonDTO;

namespace Application.Dtos.TrainingCourseCategoryDtos
{
    public class UpdateTrainingCourseCategoryTranslationDto : BaseDto<Guid>
    {
        public string? Name { get; set; }
    }
}
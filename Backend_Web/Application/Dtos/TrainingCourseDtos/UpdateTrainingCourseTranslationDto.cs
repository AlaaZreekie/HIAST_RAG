using Application.DTO.CommonDTO;

namespace Application.Dtos.TrainingCourseDtos
{
    public class UpdateTrainingCourseTranslationDto : BaseDto<Guid>
    {
        public string? Title { get; set; }
        public string? Content { get; set; }
    }
}
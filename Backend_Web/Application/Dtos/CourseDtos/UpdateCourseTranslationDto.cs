using Application.DTO.CommonDTO;

namespace Application.Dtos.CourseDtos
{
    public class UpdateCourseTranslationDto : BaseDto<Guid>
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
    }
}
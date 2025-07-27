using Application.DTO.CommonDTO;

namespace Application.Dtos.CourseGroupDtos
{
    public class UpdateCourseGroupTranslationDto : BaseDto<Guid>
    {
        public string? Name { get; set; }
    }
}
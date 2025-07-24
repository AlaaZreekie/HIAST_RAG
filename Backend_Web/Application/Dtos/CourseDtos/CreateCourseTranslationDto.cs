using Application.DTO.CommonDTO;
using Domain.Ennum;

namespace Application.Dtos.CourseDtos
{
    public class AddCourseTranslationDto : BaseDto<Guid>
    {
        public required LanguageCodeEnum LanguageCode { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
    }

    public class CreateCourseTranslationDto
    {
        public required LanguageCodeEnum LanguageCode { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
    }
}
using Application.DTO.CommonDTO;
using Domain.Ennum;

namespace Application.Dtos.CourseDtos
{
    public class CourseTranslationDto : BaseDto<Guid>
    {
        public string LanguageName { get; set; }
        public LanguageCodeEnum LanguageCode { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}
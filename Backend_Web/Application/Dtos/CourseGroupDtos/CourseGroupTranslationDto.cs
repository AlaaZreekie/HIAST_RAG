using Application.DTO.CommonDTO;
using Domain.Ennum;

namespace Application.Dtos.CourseGroupDtos
{
    public class CourseGroupTranslationDto : BaseDto<Guid>
    {
        public string LanguageName { get; set; }
        public LanguageCodeEnum LanguageCode { get; set; }
        public string Name { get; set; }
    }
}
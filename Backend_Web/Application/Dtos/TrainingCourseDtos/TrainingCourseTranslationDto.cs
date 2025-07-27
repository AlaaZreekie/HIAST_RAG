using Application.DTO.CommonDTO;
using Domain.Ennum;

namespace Application.Dtos.TrainingCourseDtos
{
    public class TrainingCourseTranslationDto : BaseDto<Guid>
    {
        public string LanguageName { get; set; }
        public LanguageCodeEnum LanguageCode { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}
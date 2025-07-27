using Application.DTO.CommonDTO;
using Domain.Ennum;

namespace Application.Dtos.AdmissionExamDtos
{
    public class AdmissionExamTranslationDto : BaseDto<Guid>
    {
        public string LanguageName { get; set; }
        public LanguageCodeEnum LanguageCode { get; set; }
        public string ExamName { get; set; }
        public string Notes { get; set; }
    }
}
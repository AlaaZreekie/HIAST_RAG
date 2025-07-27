using Application.DTO.CommonDTO;

namespace Application.Dtos.AdmissionExamDtos
{
    public class UpdateAdmissionExamTranslationDto : BaseDto<Guid>
    {
        public string? ExamName { get; set; }
        public string? Notes { get; set; }
    }
}
using Domain.Ennum;
using System.ComponentModel.DataAnnotations;

namespace Application.Dtos.AdmissionExamDtos
{
    public class CreateAdmissionExamTranslationDto
    {
        [Required]
        public LanguageCodeEnum LanguageCode { get; set; }

        [Required]
        public string ExamName { get; set; }
        public string? Notes { get; set; }
    }
}
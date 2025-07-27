using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.AdmissionExamDtos
{
    public class CreateAdmissionExamDto
    {
        [Required]
        public DateTime ExamDateTime { get; set; }

        [Required]
        public Guid AdmissionId { get; set; }

        [Required]
        [MinLength(1, ErrorMessage = "At least one translation is required.")]
        public IList<CreateAdmissionExamTranslationDto> Translations { get; set; }
    }
}

using Domain.Ennum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.AdmissionExamDtos
{
    public class AdmissionExamFilterDto
    {
        public Guid? Id { get; set; }
        public Guid? AdmissionId { get; set; }
        public DateTime? ExamDate { get; set; }
        public string? ExamName { get; set; }
        public LanguageCodeEnum? LanguageCode { get; set; }
    }
}

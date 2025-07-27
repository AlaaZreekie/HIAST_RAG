using Application.DTO.CommonDTO;
using Application.Dtos.AdmissionDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.AdmissionExamDtos
{
    public class AdmissionExamDto : BaseDto<Guid>
    {
        public DateTime ExamDateTime { get; set; }
        public AdmissionDto Admission {  get; set; }
        public IList<AdmissionExamTranslationDto>? Translations { get; set; }
    }
}

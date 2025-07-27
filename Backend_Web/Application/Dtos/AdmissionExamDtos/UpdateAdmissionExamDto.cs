using Application.DTO.CommonDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.AdmissionExamDtos
{
    public class UpdateAdmissionExamDto : BaseDto<Guid>
    {
        public DateTime? ExamDateTime { get; set; }
        public IList<UpdateAdmissionExamTranslationDto>? Translations { get; set; }
    }
}

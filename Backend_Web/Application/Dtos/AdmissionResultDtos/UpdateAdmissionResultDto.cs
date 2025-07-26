using Application.DTO.CommonDTO;
using Domain.Ennum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.AdmissionResultDtos
{
    public class UpdateAdmissionResultDto : BaseDto<Guid>
    {
        [Required]
        public AdmissionResultTypeEnum ResultType { get; set; }
    }
}

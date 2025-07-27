using Application.DTO.CommonDTO;
using Application.Dtos.AdmissionDtos;
using Application.Dtos.MediaDtos;
using Domain.Ennum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.AdmissionResultDtos
{
    /// <summary>
    /// Represents a detailed view of an admission result file.
    /// </summary>
    public class AdmissionResultDto : BaseDto<Guid>
    {
        public AdmissionResultTypeEnum ResultType { get; set; }
        public AdmissionDto Admission { get; set; }
        public MediaDto Media { get; set; }
    }
}

using Application.DTO.CommonDTO;
using Application.Dtos.LocationDtos;
using Application.Dtos.ProgramDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.AdmissionDtos
{
    public class AdmissionDto : BaseDto<Guid>
    {
        public string AcademicYear { get; set; }
        public DateTime AnnouncementDate { get; set; }
        public DateTime Deadline { get; set; }
        public ProgramDto Program { get; set; }
        public LocationDto Location { get; set; }
    }
}

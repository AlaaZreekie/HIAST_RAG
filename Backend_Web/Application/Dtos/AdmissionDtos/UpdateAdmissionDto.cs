using Application.DTO.CommonDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.AdmissionDtos
{
    /// <summary>
    /// DTO for updating an existing admission cycle. All fields are optional.
    /// </summary>
    public class UpdateAdmissionDto : BaseDto<Guid>
    {
        public string? AcademicYear { get; set; }
        public DateTime? AnnouncementDate { get; set; }
        public DateTime? Deadline { get; set; }
        public Guid? ProgramId { get; set; }
        public Guid? LocationId { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.AdmissionDtos
{
    /// <summary>
    /// DTO containing filter criteria for querying admission cycles.
    /// </summary>
    public class AdmissionFilterDto
    {
        public Guid? Id { get; set; }
        public string? AcademicYear { get; set; }
        public Guid? ProgramId { get; set; }
        public Guid? LocationId { get; set; }
        public DateTime? DeadlineFrom { get; set; }
        public DateTime? DeadlineTo { get; set; }
    }
}

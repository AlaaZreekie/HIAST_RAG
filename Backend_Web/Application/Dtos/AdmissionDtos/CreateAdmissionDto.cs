using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.AdmissionDtos
{
    /// <summary>
    /// DTO for creating a new admission cycle.
    /// </summary>
    public class CreateAdmissionDto
    {
        [Required(ErrorMessage = "Academic Year is required.")]
        public string AcademicYear { get; set; }

        [Required(ErrorMessage = "Announcement Date is required.")]
        public DateTime AnnouncementDate { get; set; }

        [Required(ErrorMessage = "Application Deadline is required.")]
        public DateTime Deadline { get; set; }

        [Required(ErrorMessage = "Program ID is required.")]
        public Guid ProgramId { get; set; }

        [Required(ErrorMessage = "Location ID is required.")]
        public Guid LocationId { get; set; }
    }
}

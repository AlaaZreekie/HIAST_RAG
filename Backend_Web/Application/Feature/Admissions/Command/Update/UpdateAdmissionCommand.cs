using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Admissions.Command.Update
{
    /// <summary>
    /// Command to update an existing Admission entity.
    /// </summary>
    public class UpdateAdmissionCommand : IRequest
    {
        public Guid Id { get; set; }
        public string? AcademicYear { get; set; }
        public DateTime? AnnouncementDate { get; set; }
        public DateTime? Deadline { get; set; }
        public Guid? ProgramId { get; set; }
        public Guid? LocationId { get; set; }
    }
}

using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Represents a specific admission cycle for an academic year and program.
    /// </summary>
    public class Admission : BaseEntity<Guid>
    {
        /// <summary>
        /// The academic year for this admission cycle (e.g., "2024-2025").
        /// </summary>
        public string AcademicYear { get; set; }
        /// <summary>
        /// The date the admission was announced.
        /// </summary>
        public DateTime AnnouncementDate { get; set; }
        /// <summary>
        /// The deadline for applications.
        /// </summary>
        public DateTime Deadline { get; set; }
        /// <summary>
        /// Foreign key to the Program this admission cycle is for.
        /// </summary>
        public Guid ProgramId { get; set; }
        /// <summary>
        /// Navigation property to the Program.
        /// </summary>
        public virtual Program Program { get; set; }
        /// <summary>
        /// Foreign key to the Location this admission cycle is for.
        /// </summary>
        public Guid LocationId { get; set; }
        /// <summary>
        /// Navigation property to the Location.
        /// </summary>
        public virtual Location Location { get; set; }
        /// <summary>
        /// Collection of entrance exams scheduled for this admission cycle.
        /// </summary>
        public virtual ICollection<AdmissionExam> AdmissionExams { get; set; } = new List<AdmissionExam>();
        /// <summary>
        /// Collection of result files for this admission cycle.
        /// </summary>
        public virtual ICollection<AdmissionResult> AdmissionResults { get; set; } = new List<AdmissionResult>();
    }
}

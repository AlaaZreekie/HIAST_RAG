using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Schedules an entrance exam for a specific admission cycle.
    /// </summary>
    public class AdmissionExam : BaseEntity<Guid>
    {
        /// <summary>
        /// The date and time of the entrance exam.
        /// </summary>
        public DateTime ExamDateTime { get; set; }
        /// <summary>
        /// Foreign key to the Admission cycle this exam belongs to.
        /// </summary>
        public Guid AdmissionId { get; set; }
        /// <summary>
        /// Navigation property to the parent Admission.
        /// </summary>
        public virtual Admission Admission { get; set; }
        /// <summary>
        /// The translated names and notes for this exam.
        /// </summary>
        public virtual ICollection<AdmissionExamTranslation> Translations { get; set; } = new List<AdmissionExamTranslation>();
    }
}

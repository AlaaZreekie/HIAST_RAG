using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Stores the language-specific name and notes for an AdmissionExam.
    /// </summary>
    public class AdmissionExamTranslation : BaseTranslationEntity
    {
        /// <summary>
        /// The name of the exam (e.g., "Preliminary Admission Exam").
        /// </summary>
        public string ExamName { get; set; }
        /// <summary>
        /// Any additional notes about the exam.
        /// </summary>
        public string Notes { get; set; }
        /// <summary>
        /// Foreign key to the AdmissionExam table.
        /// </summary>
        public Guid AdmissionExamId { get; set; }
        /// <summary>
        /// Navigation property to the parent AdmissionExam.
        /// </summary>
        public virtual AdmissionExam AdmissionExam { get; set; }
    }
}

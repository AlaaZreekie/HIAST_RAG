using Domain.Ennum;
using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Links an admission cycle to an uploaded file containing the list of admitted students.
    /// </summary>
    public class AdmissionResult : BaseEntity<Guid>
    {
        /// <summary>
        /// The type of result (e.g., "Initial List", "Final Admitted").
        /// </summary>
        public AdmissionResultTypeEnum ResultType { get; set; }
        /// <summary>
        /// Foreign key to the Admission cycle this result belongs to.
        /// </summary>
        public Guid AdmissionId { get; set; }
        /// <summary>
        /// Navigation property to the parent Admission.
        /// </summary>
        public virtual Admission Admission { get; set; }
        /// <summary>
        /// Foreign key to the Media table for the PDF file of results.
        /// </summary>
        public Guid MediaId { get; set; }
        /// <summary>
        /// Navigation property to the Media file.
        /// </summary>
        public virtual Media Media { get; set; }
    }
}

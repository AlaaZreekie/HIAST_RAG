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
    /// A linking entity that defines the study plan by connecting Courses to Specializations for a specific year and semester.
    /// </summary>
    public class Curriculum : BaseEntity<Guid>
    {
        /// <summary>
        /// The academic year in which the course is taught (e.g., 1, 2, 3).
        /// </summary>
        public int AcademicYear { get; set; }
        /// <summary>
        /// The semester in which the course is taught (e.g., 1 or 2).
        /// </summary>
        public int Semester { get; set; }
        /// <summary>
        /// The type of course within the curriculum (e.g., "Core", "Specialized").
        /// </summary>
        public CourseTypeEnum CourseType { get; set; }
        /// <summary>
        /// Foreign key to the Specialization's study plan.
        /// </summary>
        public Guid SpecializationId { get; set; }
        /// <summary>
        /// Navigation property to the Specialization.
        /// </summary>
        public virtual Specialization Specialization { get; set; }
        /// <summary>
        /// Foreign key to the Course in the study plan.
        /// </summary>
        public Guid CourseId { get; set; }
        /// <summary>
        /// Navigation property to the Course.
        /// </summary>
        public virtual Course Course { get; set; }
    }
}

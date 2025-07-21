using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Represents an individual academic subject or course in the curriculum.
    /// </summary>
    public class Course : BaseEntity<Guid>
    {
        /// <summary>
        /// The official code of the course (e.g., "MTH101").
        /// </summary>
        public string CourseCode { get; set; }
        /// <summary>
        /// The number of learning units or credits for the course.
        /// </summary>
        public decimal Credits { get; set; }
        /// <summary>
        /// The number of theoretical (lecture) hours.
        /// </summary>
        public int TheoreticalHours { get; set; }
        /// <summary>
        /// The number of practical (lab) hours.
        /// </summary>
        public int PracticalHours { get; set; }
        /// <summary>
        /// Foreign key to the CourseGroup this course belongs to.
        /// </summary>
        public Guid CourseGroupId { get; set; }
        /// <summary>
        /// Navigation property to the CourseGroup.
        /// </summary>
        public virtual CourseGroup CourseGroup { get; set; }
        /// <summary>
        /// The translated names and descriptions for this course.
        /// </summary>
        public virtual ICollection<CourseTranslation> Translations { get; set; } = new List<CourseTranslation>();
        /// <summary>
        /// Collection of curriculum entries this course is a part of.
        /// </summary>
        public virtual ICollection<Curriculum> Curriculum { get; set; } = new List<Curriculum>();
    }
}

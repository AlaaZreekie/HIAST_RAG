using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Defines a subject area for grouping academic courses (e.g., "Mathematics").
    /// </summary>
    public class CourseGroup : BaseEntity<Guid>
    {
        /// <summary>
        /// The translated names for this course group.
        /// </summary>
        public virtual ICollection<CourseGroupTranslation> Translations { get; set; } = new List<CourseGroupTranslation>();
        /// <summary>
        /// Collection of courses belonging to this subject group.
        /// </summary>
        public virtual ICollection<Course> Courses { get; set; } = new List<Course>();
    }
}

using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Stores the language-specific name for a CourseGroup.
    /// </summary>
    public class CourseGroupTranslation : BaseTranslationEntity
    {
        /// <summary>
        /// The name of the course subject area (e.g., "Mathematics").
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Foreign key to the CourseGroup table.
        /// </summary>
        public Guid CourseGroupId { get; set; }
        /// <summary>
        /// Navigation property to the parent CourseGroup.
        /// </summary>
        public virtual CourseGroup CourseGroup { get; set; }
    }
}

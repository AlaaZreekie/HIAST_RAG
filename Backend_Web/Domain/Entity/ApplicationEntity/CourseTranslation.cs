using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Stores the language-specific name and description for a Course.
    /// </summary>
    public class CourseTranslation : BaseTranslationEntity
    {
        /// <summary>
        /// The full name of the course.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// A detailed description or syllabus for the course.
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Foreign key to the Course table.
        /// </summary>
        public Guid CourseId { get; set; }
        /// <summary>
        /// Navigation property to the parent Course.
        /// </summary>
        public virtual Course Course { get; set; }
    }
}

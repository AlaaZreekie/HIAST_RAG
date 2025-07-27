using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Stores the language-specific title and content for a TrainingCourse.
    /// </summary>
    public class TrainingCourseTranslation : BaseTranslationEntity
    {
        /// <summary>
        /// The title of the training course.
        /// </summary>
        public string Title { get; set; }
        /// <summary>
        /// The detailed content or syllabus of the course.
        /// </summary>
        public string Content { get; set; }
        /// <summary>
        /// Foreign key to the TrainingCourse table.
        /// </summary>
        public Guid TrainingCourseId { get; set; }
        /// <summary>
        /// Navigation property to the parent TrainingCourse.
        /// </summary>
        public virtual TrainingCourse TrainingCourse { get; set; }
    }
}

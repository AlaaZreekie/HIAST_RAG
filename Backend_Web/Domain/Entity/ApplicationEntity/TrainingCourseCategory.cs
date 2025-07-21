using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Represents a category for grouping professional, non-academic training courses.
    /// </summary>
    public class TrainingCourseCategory : BaseEntity<Guid>
    {
        /// <summary>
        /// The translated names for this training course category.
        /// </summary>
        public virtual ICollection<TrainingCourseCategoryTranslation> Translations { get; set; } = new List<TrainingCourseCategoryTranslation>();
        /// <summary>
        /// Collection of training courses in this category.
        /// </summary>
        public virtual ICollection<TrainingCourse> TrainingCourses { get; set; } = new List<TrainingCourse>();
    }
}

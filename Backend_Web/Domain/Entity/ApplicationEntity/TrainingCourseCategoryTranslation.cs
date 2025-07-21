using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Stores the language-specific name for a TrainingCourseCategory.
    /// </summary>
    public class TrainingCourseCategoryTranslation : BaseTranslationEntity
    {
        /// <summary>
        /// The name of the training course category.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Foreign key to the TrainingCourseCategory table.
        /// </summary>
        public Guid TrainingCourseCategoryId { get; set; }
        /// <summary>
        /// Navigation property to the parent TrainingCourseCategory.
        /// </summary>
        public virtual TrainingCourseCategory TrainingCourseCategory { get; set; }
    }
}

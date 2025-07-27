using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Represents a single professional development or non-academic training course.
    /// </summary>
    public class TrainingCourse : BaseEntity<Guid>
    {
        /// <summary>
        /// The code for the training course.
        /// </summary>
        public string CourseCode { get; set; }
        /// <summary>
        /// The total duration of the course in hours.
        /// </summary>
        public int DurationHours { get; set; }
        /// <summary>
        /// The number of sessions the course is broken into.
        /// </summary>
        public int NumberOfSessions { get; set; }
        /// <summary>
        /// A description of the intended audience for the course.
        /// </summary>
        public string TargetAudience { get; set; }
        /// <summary>
        /// The year the training course is offered.
        /// </summary>
        public int Year { get; set; }
        /// <summary>
        /// Foreign key to the TrainingCourseCategory.
        /// </summary>
        public Guid TrainingCourseCategoryId { get; set; }
        /// <summary>
        /// Navigation property to the TrainingCourseCategory.
        /// </summary>
        public virtual TrainingCourseCategory TrainingCourseCategory { get; set; }
        /// <summary>
        /// The translated titles and content for this course.
        /// </summary>
        public virtual ICollection<TrainingCourseTranslation> Translations { get; set; } = new List<TrainingCourseTranslation>();
    }
}

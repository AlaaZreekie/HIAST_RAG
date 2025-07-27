using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Represents a category for grouping media files (e.g., "Admission Forms", "Logos").
    /// </summary>
    public class MediaCategory : BaseEntity<Guid>
    {
        /// <summary>
        /// The translated names for this category.
        /// </summary>
        public virtual ICollection<MediaCategoryTranslation> Translations { get; set; } = new List<MediaCategoryTranslation>();
        /// <summary>
        /// Collection of media files belonging to this category.
        /// </summary>
        public virtual ICollection<Media> Media { get; set; } = new HashSet<Media>();
    }
}

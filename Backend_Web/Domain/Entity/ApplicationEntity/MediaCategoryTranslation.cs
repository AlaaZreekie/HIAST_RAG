using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Stores the language-specific name for a MediaCategory.
    /// </summary>
    public class MediaCategoryTranslation : BaseTranslationEntity
    {
        /// <summary>
        /// The name of the media category in a specific language.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// Foreign key to the MediaCategory table.
        /// </summary>
        public Guid MediaCategoryId { get; set; }
        /// <summary>
        /// Navigation property to the parent MediaCategory.
        /// </summary>
        public virtual MediaCategory MediaCategory { get; set; }
    }
}

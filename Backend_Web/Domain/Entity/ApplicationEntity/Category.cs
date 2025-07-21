using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Represents a category for grouping blog posts (e.g., "Institute News", "Events").
    /// </summary>
    public class Category : BaseEntity<Guid>
    {
        /// <summary>
        /// A URL-friendly identifier for the category.
        /// </summary>
        public string Slug { get; set; }
        /// <summary>
        /// The translated names for this category.
        /// </summary>
        public virtual ICollection<CategoryTranslation> Translations { get; set; } = new List<CategoryTranslation>();
        /// <summary>
        /// Collection of posts that belong to this category.
        /// </summary>
        public virtual ICollection<Post> Posts { get; set; } = new List<Post>();
    }
}

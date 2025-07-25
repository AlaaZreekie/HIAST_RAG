using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Stores the language-specific name for a Category.
    /// </summary>
    public class CategoryTranslation : BaseTranslationEntity
    {
        /// <summary>
        /// The name of the category in a specific language.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// A URL-friendly identifier for the category.
        /// </summary>
        public string Slug { get; set; }
        /// <summary>
        /// Foreign key to the Category table.
        /// </summary>
        public Guid CategoryId { get; set; }
        /// <summary>
        /// Navigation property to the parent Category.
        /// </summary>
        public virtual Category Category { get; set; }
    }
}

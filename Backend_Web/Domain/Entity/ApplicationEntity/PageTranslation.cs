using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Stores the language-specific title and content for a Page.
    /// </summary>
    public class PageTranslation : BaseTranslationEntity
    {
        /// <summary>
        /// The title of the static page.
        /// </summary>
        public string Title { get; set; }
        /// <summary>
        /// The main HTML content of the static page.
        /// </summary>
        public string Content { get; set; }
        /// <summary>
        /// Foreign key to the Page table.
        /// </summary>
        public Guid PageId { get; set; }
        /// <summary>
        /// Navigation property to the parent Page.
        /// </summary>
        public virtual Page Page { get; set; }
    }
}

using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Represents a static, informational page (e.g., "About Us", "Contact Us", or a Department page).
    /// </summary>
    public class Page : BaseEntity<Guid>
    {
        /// <summary>
        /// The translated titles and content for this page.
        /// </summary>
        public virtual ICollection<PageTranslation> Translations { get; set; } = new List<PageTranslation>();
    }
}

using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Stores the language-specific text for a MenuItem.
    /// </summary>
    public class MenuItemTranslation : BaseTranslationEntity
    {
        /// <summary>
        /// The visible text of the menu link (e.g., "Home").
        /// </summary>
        public string Title { get; set; }
        /// <summary>
        /// Foreign key to the MenuItem table.
        /// </summary>
        public Guid MenuItemId { get; set; }
        /// <summary>
        /// Navigation property to the parent MenuItem.
        /// </summary>
        public virtual MenuItem MenuItem { get; set; }
    }
}

using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Represents a single link within a Menu.
    /// </summary>
    public class MenuItem : BaseEntity<Guid>
    {
        /// <summary>
        /// The URL this menu item links to.
        /// </summary>
        public string LinkURL { get; set; }
        /// <summary>
        /// Foreign key to the Menu this item belongs to.
        /// </summary>
        public Guid MenuId { get; set; }
        /// <summary>
        /// Navigation property to the parent Menu.
        /// </summary>
        public virtual Menu Menu { get; set; }
        /// <summary>
        /// The translated titles for this menu item.
        /// </summary>
        public virtual ICollection<MenuItemTranslation> Translations { get; set; } = new List<MenuItemTranslation>();
    }
}

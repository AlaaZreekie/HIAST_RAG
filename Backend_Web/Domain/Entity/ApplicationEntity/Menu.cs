using Domain.Ennum;
using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Defines a navigation area on the website (e.g., "Main Menu", "Footer Menu").
    /// </summary>
    public class Menu : BaseEntity<Guid>
    {
        /// <summary>
        /// A code representing the menu's location in the theme (e.g., "MainMenu", "FooterMenu").
        /// </summary>
        public MenuLocationEnum Location { get; set; }
        /// <summary>
        /// Collection of links within this menu.
        /// </summary>
        public virtual ICollection<MenuItem> MenuItems { get; set; } = new List<MenuItem>();
    }
}

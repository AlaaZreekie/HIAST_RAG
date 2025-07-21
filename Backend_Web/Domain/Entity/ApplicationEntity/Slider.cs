using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Represents a single banner image in a homepage slider.
    /// </summary>
    public class Slider : BaseEntity<Guid>
    {
        /// <summary>
        /// The URL the slider banner links to when clicked.
        /// </summary>
        public string LinkURL { get; set; }
        /// <summary>
        /// Foreign key to the Media table for the banner image.
        /// </summary>
        public Guid MediaId { get; set; }
        /// <summary>
        /// Navigation property to the banner image.
        /// </summary>
        public virtual Media Media { get; set; }
        /// <summary>
        /// The translated titles for this slider.
        /// </summary>
        public virtual ICollection<SliderTranslation> Translations { get; set; } = new List<SliderTranslation>();
    }
}

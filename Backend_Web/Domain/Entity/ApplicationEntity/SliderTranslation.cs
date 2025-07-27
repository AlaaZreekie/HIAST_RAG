using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Stores the language-specific title for a Slider.
    /// </summary>
    public class SliderTranslation : BaseTranslationEntity
    {
        /// <summary>
        /// The title or caption displayed on the slider.
        /// </summary>
        public string Title { get; set; }
        /// <summary>
        /// Foreign key to the Slider table.
        /// </summary>
        public Guid SliderId { get; set; }
        /// <summary>
        /// Navigation property to the parent Slider.
        /// </summary>
        public virtual Slider Slider { get; set; }
    }
}

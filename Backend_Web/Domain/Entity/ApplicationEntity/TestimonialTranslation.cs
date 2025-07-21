using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Stores the language-specific quote for a Testimonial.
    /// </summary>
    public class TestimonialTranslation : BaseTranslationEntity
    {
        /// <summary>
        /// The testimonial quote from the graduate.
        /// </summary>
        public string Quote { get; set; }
        /// <summary>
        /// Foreign key to the Testimonial table.
        /// </summary>
        public Guid TestimonialId { get; set; }
        /// <summary>
        /// Navigation property to the parent Testimonial.
        /// </summary>
        public virtual Testimonial Testimonial { get; set; }
    }
}

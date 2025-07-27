using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Represents a graduate's profile or success story.
    /// </summary>
    public class Testimonial : BaseEntity<Guid>
    {
        /// <summary>
        /// The name of the graduate.
        /// </summary>
        public string GraduateName { get; set; }
        /// <summary>
        /// The year the student graduated.
        /// </summary>
        public int GraduateYear { get; set; }
        ///// <summary>
        ///// Foreign key to the Specialization the student graduated from.
        ///// </summary>
        //public Guid SpecializationId { get; set; }
        ///// <summary>
        ///// Navigation property to the Specialization.
        ///// </summary>
        //public virtual Specialization Specialization { get; set; }
        /// <summary>
        /// Foreign key to the Media table for the graduate's photo.
        /// </summary>
        public Guid MediaId { get; set; }
        /// <summary>
        /// Navigation property to the Media photo.
        /// </summary>
        public virtual Media Media { get; set; }
        /// <summary>
        /// The translated quotes for this testimonial.
        /// </summary>
        public virtual ICollection<TestimonialTranslation> Translations { get; set; } = new List<TestimonialTranslation>();
    }
}

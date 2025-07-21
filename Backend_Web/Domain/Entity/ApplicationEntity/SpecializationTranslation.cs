using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Stores the language-specific name and description for a Specialization.
    /// </summary>
    public class SpecializationTranslation : BaseTranslationEntity
    {
        /// <summary>
        /// The name of the specialization.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// A detailed description of the specialization.
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Foreign key to the Specialization table.
        /// </summary>
        public Guid SpecializationId { get; set; }
        /// <summary>
        /// Navigation property to the parent Specialization.
        /// </summary>
        public virtual Specialization Specialization { get; set; }
    }
}

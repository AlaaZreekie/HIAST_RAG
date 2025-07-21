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
    /// Represents a specific degree offered within a Program, like "Software Engineering."
    /// </summary>
    public class Specialization : BaseEntity<Guid>
    {
        /// <summary>
        /// The type of degree awarded (e.g., "Bachelor", "Master", "PhD").
        /// </summary>
        public DegreeTypeEnum DegreeType { get; set; }
        /// <summary>
        /// Foreign key to the Program this specialization belongs to.
        /// </summary>
        public Guid ProgramId { get; set; }
        /// <summary>
        /// Navigation property to the parent Program.
        /// </summary>
        public virtual Program Program { get; set; }
        /// <summary>
        /// Foreign key to the Location where this specialization is offered.
        /// </summary>
        public Guid LocationId { get; set; }
        /// <summary>
        /// Navigation property to the Location.
        /// </summary>
        public virtual Location Location { get; set; }
        /// <summary>
        /// The translated names and descriptions for this specialization.
        /// </summary>
        public virtual ICollection<SpecializationTranslation> Translations { get; set; } = new List<SpecializationTranslation>();
        /// <summary>
        /// The collection of curriculum entries that define the study plan.
        /// </summary>
        public virtual ICollection<Curriculum> Curriculum { get; set; } = new List<Curriculum>();
    }
}

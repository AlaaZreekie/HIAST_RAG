using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Defines a high-level academic program, like "Engineering Qualification" or "Postgraduate Studies."
    /// </summary>
    public class Program : BaseEntity<Guid>
    {
        /// <summary>
        /// The typical duration of the program (e.g., "5 years").
        /// </summary>
        public string Duration { get; set; }
        /// <summary>
        /// The translated names and descriptions for this program.
        /// </summary>
        public virtual ICollection<ProgramTranslation> Translations { get; set; } = new List<ProgramTranslation>();
        /// <summary>
        /// Collection of specializations offered under this program.
        /// </summary>
        public virtual ICollection<Specialization> Specializations { get; set; } = new List<Specialization>();
    }
}

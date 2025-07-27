using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Stores the language-specific name and description for a Program.
    /// </summary>
    public class ProgramTranslation : BaseTranslationEntity
    {
        /// <summary>
        /// The name of the academic program.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// A detailed description of the program.
        /// </summary>
        public string Description { get; set; }
        /// <summary>
        /// Foreign key to the Program table.
        /// </summary>
        public Guid ProgramId { get; set; }
        /// <summary>
        /// Navigation property to the parent Program.
        /// </summary>
        public virtual Program Program { get; set; }
    }
}

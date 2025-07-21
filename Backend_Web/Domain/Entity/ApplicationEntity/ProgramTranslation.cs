using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    public class ProgramTranslation : BaseTranslationEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public Guid ProgramId { get; set; }
        public virtual Program Program { get; set; }
    }
}

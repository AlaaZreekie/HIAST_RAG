using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    public class Language : BaseEntity<Guid>
    {
        public required string Code { get; set; } // e.g., "en", "ar"
        public required string Name { get; set; }
    }
}

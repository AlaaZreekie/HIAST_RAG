using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    public class LocationTranslation : BaseTranslationEntity
    {
        public required string Name { get; set; }
        public string? Address { get; set; }
        public Guid LocationId { get; set; }
        public virtual Location? Location { get; set; }
    }
}

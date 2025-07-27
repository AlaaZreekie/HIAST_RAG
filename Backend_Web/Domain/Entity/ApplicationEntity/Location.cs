using Domain.Entity.Common;
using Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    public class Location : BaseEntity<Guid>
    {
        public required LocationCodeEnum LocationCode { get; set; }
        /// <summary>
        /// Collection of specializations offered at this location.
        /// </summary>
        public virtual ICollection<Specialization> Specializations { get; set; } = [];
        /// <summary>
        /// Collection of location translation.
        /// </summary>
        public virtual ICollection<LocationTranslation> Translations { get; set; } = [];
    }
}

using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    public class Location : BaseEntity<Guid>
    {
        /// <summary>
        /// Represents a physical campus or location of the institute.
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// The physical address of the location.
        /// </summary>
        public string Address { get; set; }
        /// <summary>
        /// Collection of specializations offered at this location.
        /// </summary>
        public virtual ICollection<Specialization> Specializations { get; set; } = new List<Specialization>();
    }
}

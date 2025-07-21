using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.Common
{
    public abstract class BaseEntity<T>
    {
        /// <summary>
        /// The unique identifier for the entity.
        /// </summary>
        public required T Id { get; set; }
    }
}

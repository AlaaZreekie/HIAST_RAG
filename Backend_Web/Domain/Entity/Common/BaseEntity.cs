using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.Common
{
    /// <summary>
    /// A generic base class for all main entities, providing a Guid Id.
    /// </summary>
    public abstract class BaseEntity<T>
    {
        /// <summary>
        /// The unique identifier for the entity.
        /// </summary>
        public T Id { get; set; }
    }
}

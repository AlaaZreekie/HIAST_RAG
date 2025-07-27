using Domain.Entity.ApplicationEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.Common
{
    /// <summary>
    /// A base class for all translation tables.
    /// </summary>
    public abstract class BaseTranslationEntity : BaseEntity<Guid>
    {
        /// <summary>
        /// Foreign key to the Language table.
        /// </summary>
        public Guid LanguageId { get; set; }
        /// <summary>
        /// Navigation property to the related Language.
        /// </summary>
        public virtual Language? Language { get; set; }
    }
}

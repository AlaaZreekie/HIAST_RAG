using Domain.Entity.ApplicationEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.Common
{
    // --- Base for Translation Tables ---
    public abstract class BaseTranslationEntity
    {
        /// <summary>
        /// Foreign key to the Language table.
        /// </summary>
        public Guid LanguageId { get; set; }
        /// <summary>
        /// Navigation property to the related Language.
        /// </summary>
        public virtual Language Language { get; set; }
    }
}

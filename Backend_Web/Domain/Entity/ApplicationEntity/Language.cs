using Domain.Ennum;
using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Represents a supported language for multilingual content.
    /// </summary>
    public class Language : BaseEntity<Guid>
    {
        /// <summary>
        /// The standard language code (e.g., "en", "ar").
        /// </summary>
        public LanguageCodeEnum Code { get; set; }
        /// <summary>
        /// The full name of the language (e.g., "English", "Arabic").
        /// </summary>
        public required string Name { get; set; }
    }
}

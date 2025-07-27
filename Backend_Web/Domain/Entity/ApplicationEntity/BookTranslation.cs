using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Stores the language-specific title and description for a Book.
    /// </summary>
    public class BookTranslation : BaseTranslationEntity
    {
        /// <summary>
        /// The title of the book in a specific language.
        /// </summary>
        public string Title { get; set; }

        /// <summary>
        /// A short description or abstract of the book.
        /// </summary>
        public string Description { get; set; }

        /// <summary>
        /// Foreign key to the Book table.
        /// </summary>
        public Guid BookId { get; set; }

        /// <summary>
        /// Navigation property to the parent Book.
        /// </summary>
        public virtual Book Book { get; set; }
    }
}

using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Represents a single published book in the digital library.
    /// </summary>
    public class Book : BaseEntity<Guid>
    {
        /// <summary>
        /// The name of the book's author(s).
        /// </summary>
        public string Author { get; set; }

        /// <summary>
        /// The year the book was published.
        /// </summary>
        public int PublicationYear { get; set; }

        /// <summary>
        /// The International Standard Book Number.
        /// </summary>
        public string ISBN { get; set; }

        /// <summary>
        /// Foreign key to the Media table for the book's cover image.
        /// </summary>
        public Guid CoverImageMediaId { get; set; }

        /// <summary>
        /// Navigation property to the cover image media file.
        /// </summary>
        public virtual Media CoverImage { get; set; }

        /// <summary>
        /// Foreign key to the Media table for the book's digital file (e.g., PDF).
        /// </summary>
        public Guid FileMediaId { get; set; }

        /// <summary>
        /// Navigation property to the book's digital file.
        /// </summary>
        public virtual Media BookFile { get; set; }

        /// <summary>
        /// The translated titles and descriptions for this book.
        /// </summary>
        public virtual ICollection<BookTranslation> Translations { get; set; } = new List<BookTranslation>();
    }
}

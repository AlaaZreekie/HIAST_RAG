using Domain.Entity.Common;
using Domain.Entity.IdentityEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Represents a single time-based article, such as a news post or announcement.
    /// </summary>
    public class Post : BaseEntity<Guid>
    {
        /// <summary>
        /// The date and time the post was published.
        /// </summary>
        public DateTime PublicationDate { get; set; }
        /// <summary>
        /// Foreign key to the User who wrote the post.
        /// </summary>
        public Guid AuthorId { get; set; }
        /// <summary>
        /// Navigation property to the author (User).
        /// </summary>
        public virtual ApplicationUser Author { get; set; }
        /// <summary>
        /// Foreign key to the Category this post belongs to.
        /// </summary>
        public Guid CategoryId { get; set; }
        /// <summary>
        /// Navigation property to the Category.
        /// </summary>
        public virtual Category Category { get; set; }
        /// <summary>
        /// The translated titles and content for this post.
        /// </summary>
        public virtual ICollection<PostTranslation> Translations { get; set; } = new List<PostTranslation>();
    }
}

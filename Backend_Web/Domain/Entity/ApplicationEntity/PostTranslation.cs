using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Stores the language-specific title and content for a Post.
    /// </summary>
    public class PostTranslation : BaseTranslationEntity
    {
        /// <summary>
        /// The title of the post.
        /// </summary>
        public string Title { get; set; }
        /// <summary>
        /// The main HTML content of the post.
        /// </summary>
        public string Content { get; set; }
        /// <summary>
        /// Foreign key to the Post table.
        /// </summary>
        public Guid PostId { get; set; }
        /// <summary>
        /// Navigation property to the parent Post.
        /// </summary>
        public virtual Post? Post { get; set; }
    }
}

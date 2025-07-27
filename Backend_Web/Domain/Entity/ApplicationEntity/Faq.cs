using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Represents a single question-and-answer pair.
    /// </summary>
    public class Faq : BaseEntity<Guid>
    {
        /// <summary>
        /// A number to control the display order of questions.
        /// </summary>
        public int DisplayOrder { get; set; }
        /// <summary>
        /// Foreign key to the FaqCategory this question belongs to.
        /// </summary>
        public Guid FaqCategoryId { get; set; }
        /// <summary>
        /// Navigation property to the FaqCategory.
        /// </summary>
        public virtual FaqCategory FaqCategory { get; set; }
        /// <summary>
        /// The translated question and answer text.
        /// </summary>
        public virtual ICollection<FaqTranslation> Translations { get; set; } = new List<FaqTranslation>();
    }
}

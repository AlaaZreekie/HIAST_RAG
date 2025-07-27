using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Represents a category for grouping Frequently Asked Questions.
    /// </summary>
    public class FaqCategory : BaseEntity<Guid>
    {
        /// <summary>
        /// The translated names for this FAQ category.
        /// </summary>
        public virtual ICollection<FaqCategoryTranslation> Translations { get; set; } = new List<FaqCategoryTranslation>();
        /// <summary>
        /// Collection of FAQs belonging to this category.
        /// </summary>
        public virtual ICollection<Faq> Faqs { get; set; } = new List<Faq>();
    }
}

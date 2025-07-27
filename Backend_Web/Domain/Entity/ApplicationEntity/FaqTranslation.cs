using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Stores the language-specific text for a Faq's question and answer.
    /// </summary>
    public class FaqTranslation : BaseTranslationEntity
    {
        /// <summary>
        /// The text of the frequently asked question.
        /// </summary>
        public string Question { get; set; }
        /// <summary>
        /// The text of the answer.
        /// </summary>
        public string Answer { get; set; }
        /// <summary>
        /// Foreign key to the Faq table.
        /// </summary>
        public Guid FaqId { get; set; }
        /// <summary>
        /// Navigation property to the parent Faq.
        /// </summary>
        public virtual Faq Faq { get; set; }
    }
}

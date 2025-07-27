
using Domain.Entity.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entity.ApplicationEntity
{
    /// <summary>
    /// Represents a single uploaded file in the media library (e.g., an image or PDF).
    /// </summary>
    public class Media : BaseEntity<Guid>
    {
        /// <summary>
        /// The original name of the uploaded file.
        /// </summary>
        public string FileName { get; set; }
        /// <summary>
        /// The path where the file is stored on the server.
        /// </summary>
        public string FilePath { get; set; }
        /// <summary>
        /// The MIME type of the file (e.g., "application/pdf").
        /// </summary>
        public string FileType { get; set; }
        /// <summary>
        /// Foreign key to group this file into a category.
        /// </summary>
        public Guid MediaCategoryId { get; set; }
        /// <summary>
        /// Navigation property to the MediaCategory.
        /// </summary>
        public virtual MediaCategory MediaCategory { get; set; }
    }
}

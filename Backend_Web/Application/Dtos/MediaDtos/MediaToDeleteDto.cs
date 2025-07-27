using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.MediaDtos
{
    /// <summary>
    /// Contains information required by a controller to safely delete a media record and its associated physical file.
    /// </summary>
    public class MediaToDeleteDto
    {
        /// <summary>
        /// The ID of the media record to be deleted from the database.
        /// Can be null if the parent entity was not found.
        /// </summary>
        public Guid? MediaId { get; set; }

        /// <summary>
        /// The physical path of the file on the storage system.
        /// </summary>
        public string? FilePath { get; set; }

        /// <summary>
        /// Indicates if the media record and its physical file are safe to delete
        /// (i.e., not referenced by any other entities).
        /// </summary>
        public bool IsSafeToDelete { get; set; }
    }
}

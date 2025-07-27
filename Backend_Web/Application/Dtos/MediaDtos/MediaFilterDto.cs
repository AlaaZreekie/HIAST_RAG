using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.MediaDtos
{
    public class MediaFilterDto
    {
        public Guid? Id { get; set; }
        public string? FileName { get; set; }
        public Guid? MediaCategoryId { get; set; }
        public string? FileType { get; set; }
    }
}

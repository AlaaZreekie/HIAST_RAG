using Application.DTO.CommonDTO;
using Application.Dtos.MediaCategoryDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.MediaDtos
{
    public class MediaDto : BaseDto<Guid>
    {
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public string FileType { get; set; }
        public MediaCategoryDto MediaCategory { get; set; }
    }
}

using Application.DTO.CommonDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.MediaCategoryDtos
{
    public class MediaCategoryDto : BaseDto<Guid>
    {
        public IList<MediaCategoryTranslationDto>? Translations { get; set; }
    }
}

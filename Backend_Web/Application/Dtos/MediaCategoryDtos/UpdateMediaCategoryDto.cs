using Application.DTO.CommonDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.MediaCategoryDtos
{
    public class UpdateMediaCategoryDto : BaseDto<Guid>
    {
        public IList<UpdateMediaCategoryTranslationDto>? Translations { get; set; }
    }
}

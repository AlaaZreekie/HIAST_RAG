using Application.DTO.CommonDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.FaqCategoryDtos
{
    public class UpdateFaqCategoryDto : BaseDto<Guid>
    {
        public IList<UpdateFaqCategoryTranslationDto>? Translations { get; set; }
    }
}

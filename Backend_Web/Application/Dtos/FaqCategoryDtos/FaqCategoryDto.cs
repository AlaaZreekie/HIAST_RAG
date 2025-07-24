using Application.DTO.CommonDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.FaqCategoryDtos
{
    public class FaqCategoryDto : BaseDto<Guid>
    {
        public IList<FaqCategoryTranslationDto> Translations { get; set; } = [];
    }
}

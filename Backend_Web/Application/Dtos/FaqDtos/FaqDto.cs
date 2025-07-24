using Application.DTO.CommonDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.FaqDtos
{
    public class FaqDto : BaseDto<Guid>
    {
        public int DisplayOrder { get; set; }
        public Guid FaqCategoryId { get; set; }
        public string FaqCategoryName { get; set; }
        public IList<FaqTranslationDto>? Translations { get; set; }
    }
}

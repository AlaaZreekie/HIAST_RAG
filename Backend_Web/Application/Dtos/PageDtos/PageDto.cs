using Application.DTO.CommonDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.PageDtos
{
    public class PageDto : BaseDto<Guid>
    {
        public IList<PageTranslationDto>? Translations { get; set; }
    }
}

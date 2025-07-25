using Application.DTO.CommonDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.PageDtos
{
    public class UpdatePageDto : BaseDto<Guid>
    {
        public IList<UpdatePageTranslationDto>? Translations { get; set; }
    }
    public class UpdatePageTranslationDto : BaseDto<Guid>
    {
        public string? Title { get; set; }
        public string? Content { get; set; }
    }
}

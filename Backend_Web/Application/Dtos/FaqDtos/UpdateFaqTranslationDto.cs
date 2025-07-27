using Application.DTO.CommonDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.FaqDtos
{
    public class UpdateFaqTranslationDto : BaseDto<Guid>
    {
        public string? Question { get; set; }
        public string? Answer { get; set; }
    }
}

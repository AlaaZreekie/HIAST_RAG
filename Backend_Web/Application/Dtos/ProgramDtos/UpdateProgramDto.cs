using Application.DTO.CommonDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.ProgramDtos
{
    public class UpdateProgramDto : BaseDto<Guid>
    {
        public string? Duration { get; set; }
        public IList<UpdateProgramTranslationDto>? Translations { get; set; }
    }
}

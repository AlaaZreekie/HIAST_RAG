using Application.DTO.CommonDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.ProgramDtos
{
    public class UpdateProgramTranslationDto : BaseDto<Guid>
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
    }
}

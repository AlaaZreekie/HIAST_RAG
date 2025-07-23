using Application.DTO.CommonDTO;
using Application.Dtos.SpecializationDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.ProgramDtos
{
    public class ProgramDto : BaseDto<Guid>
    {
        public string Duration { get; set; }
        public List<ProgramTranslationDto>? Translations { get; set; }
        public List<SpecializationDto>? Specializations { get; set; }
    }
}

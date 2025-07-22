using Application.Dtos.SpecializationDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.ProgramDtos
{
    public class CreateProgramDto
    {
        public required string Duration { get; set; }
        public IList<CreateProgramTranslationDto>? Translations { get; set; }
        public IList<CreateSpecializationDto>? Specializations { get; set; }
    }
}

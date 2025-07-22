using Domain.Ennum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.ProgramDtos
{
    public class CreateProgramTranslationDto
    {
        public required LanguageCodeEnum LanguageCode { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}

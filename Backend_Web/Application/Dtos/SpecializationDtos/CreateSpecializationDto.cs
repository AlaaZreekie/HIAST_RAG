using Domain.Ennum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.SpecializationDtos
{
    public class CreateSpecializationDto
    {
        public required DegreeTypeEnum DegreeType { get; set; }
        public required Guid ProgramId { get; set; }

        public required Guid LocationId { get; set; }
        public IList<CreateSpecializationTranslationDto>? Translations { get; set; }
    }
}

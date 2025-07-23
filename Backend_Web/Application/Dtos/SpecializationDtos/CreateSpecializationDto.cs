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
        public DegreeTypeEnum DegreeType { get; set; }
        //public Guid LocationId { get; set; }
        public IList<CreateSpecializationTranslationDto>? Translations { get; set; }

        //TODO: Add the Location to this
    }
}

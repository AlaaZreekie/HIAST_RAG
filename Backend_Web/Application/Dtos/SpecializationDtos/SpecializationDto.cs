using Application.DTO.CommonDTO;
using Domain.Ennum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.SpecializationDtos
{
    public class SpecializationDto : BaseDto<Guid>
    {
        public DegreeTypeEnum DegreeType { get; set; }
        public IList<SpecializationTranslationDto> Translations { get; set; }

        //TODO: Add the location for this specialization
    }
}

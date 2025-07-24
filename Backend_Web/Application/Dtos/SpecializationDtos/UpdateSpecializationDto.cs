using Application.DTO.CommonDTO;
using Domain.Ennum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.SpecializationDtos
{
    public class UpdateSpecializationDto : BaseDto<Guid>
    {
        public DegreeTypeEnum? DegreeType { get; set; }
        public Guid? ProgramId { get; set; }
        public Guid? LocationId { get; set; }
        public IList<UpdateSpecializationTranslationDto>? Translations { get; set; }
    }
}

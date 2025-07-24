using Application.DTO.CommonDTO;
using Application.Dtos.ProgramDtos;
using Domain.Ennum;
using Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.SpecializationDtos
{
    public class SpecializationDto : BaseDto<Guid>
    { 
        public string DegreeType { get; set; }
        public Guid LocationId { get; set; }
        public LocationCodeEnum LocationCode { get; set; }
        public ProgramDto? Program { get; set; }
        public IList<SpecializationTranslationDto>? Translations { get; set; }        
    }
}

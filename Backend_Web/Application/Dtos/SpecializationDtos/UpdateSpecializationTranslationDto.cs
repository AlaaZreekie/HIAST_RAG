using Application.DTO.CommonDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.SpecializationDtos
{
    public class UpdateSpecializationTranslationDto : BaseDto<Guid>
    {
        public string? Name { get; set; }
        public string? Description { get; set; }
    }
}

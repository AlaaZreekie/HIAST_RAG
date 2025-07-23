using Application.DTO.CommonDTO;
using Domain.Ennum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.SpecializationDtos
{
    public class SpecializationTranslationDto : BaseDto<Guid>
    {
        public LanguageCodeEnum LanguageCode { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
    }
}

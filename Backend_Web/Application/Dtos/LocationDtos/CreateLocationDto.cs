using Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.LocationDtos
{
    public class CreateLocationDto
    {
        public required LocationCodeEnum LocationCode { get; set; }
        public IList<CreateLocationTranslationDto> Translations { get; set; }
    }
}

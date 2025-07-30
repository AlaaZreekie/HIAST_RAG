using Application.DTO.CommonDTO;
using Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.LocationDtos
{
    public class UpdateLocationDto : BaseDto<Guid>
    {
        public LocationCodeEnum? LocationCode { get; set; }
        public IList<UpdateLocationTranslationDto>? Translations { get; set; } = [];
    }
}

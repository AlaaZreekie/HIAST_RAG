using Application.DTO.CommonDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.LocationDtos
{
    public class LocationDto : BaseDto<Guid>
    {
        public string LocationCode { get; set; }
        public IList<LocationTranslationDto>? Translations { get; set; }
    }
}

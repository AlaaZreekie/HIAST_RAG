using Application.DTO.CommonDTO;
using Domain.Ennum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.LocationDtos
{
    public class UpdateLocationTranslationDto :BaseDto<Guid>
    {
        public string? Name { get; set; }
        public string? Address { get; set; }
    }
}

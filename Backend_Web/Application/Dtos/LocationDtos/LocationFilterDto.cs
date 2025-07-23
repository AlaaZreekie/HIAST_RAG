using Application.DTO.CommonDTO;
using Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.LocationDtos
{
    public class LocationFilterDto 
    {
        public Guid? Id { get; set; }
        public LocationCodeEnum? LocationCode { get; set; }
        public string? Name { get; set; }
        public string? Address { get; set; }
    }
}

using Application.DTO.CommonDTO;
using Domain.Ennum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.LocationDtos
{
    public class CreateLocationTranslationDto
    {
        public required LanguageCodeEnum LanguageCode { get; set; }
        public required string Name { get; set; }
        public string? Address { get; set; }
    }

    public class AddLocationTranslationDto : BaseDto<Guid>
    {
        public required LanguageCodeEnum LanguageCode { get; set; }
        public required string Name { get; set; }
        public string? Address { get; set; }
    }
}

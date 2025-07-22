using Application.DTO.CommonDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.LanguageDtos
{
    public class LanguageDto : BaseDto<Guid>
    {
        public string Code { get; set; }
        public string Name { get; set; }
    }
}

using Application.DTO.CommonDTO;
using Domain.Ennum;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.LanguageDtos
{
    public class UpdateLanguageDto : BaseDto<Guid>
    {
        public LanguageCodeEnum? Code { get; set; }
        public string? Name { get; set; }
    }
}

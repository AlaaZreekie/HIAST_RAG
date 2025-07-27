using Domain.Ennum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.FaqDtos
{
    public class CreateFaqTranslationDto
    {
        public required LanguageCodeEnum LanguageCode { get; set; }
        public required string Question { get; set; }
        public required string Answer { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.FaqDtos
{
    public class CreateFaqDto
    {
        public int DisplayOrder { get; set; }
        public required Guid FaqCategoryId { get; set; }
        public IList<CreateFaqTranslationDto> Translations { get; set; }
    }
}

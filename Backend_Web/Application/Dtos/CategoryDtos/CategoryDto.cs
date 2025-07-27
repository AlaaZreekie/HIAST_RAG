using Application.DTO.CommonDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.CategoryDtos
{
    public class CategoryDto : BaseDto<Guid>
    {
        public IList<CategoryTranslationDto>? Translations { get; set; }
    }
}

using Application.DTO.CommonDTO;
using Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.CourseGroupDtos
{
    public class CourseGroupDto : BaseDto<Guid>
    {
        public CourseGroupCodeEnum CourseGroupCode { get; set; }
        public IList<CourseGroupTranslationDto>? Translations { get; set; }
    }
}

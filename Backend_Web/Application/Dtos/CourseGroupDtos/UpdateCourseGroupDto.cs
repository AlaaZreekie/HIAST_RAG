using Application.DTO.CommonDTO;
using Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.CourseGroupDtos
{
    public class UpdateCourseGroupDto : BaseDto<Guid>
    {
        public CourseGroupCodeEnum? CourseGroupCode { get; set; }
        public IList<UpdateCourseGroupTranslationDto>? Translations { get; set; }
    }
}

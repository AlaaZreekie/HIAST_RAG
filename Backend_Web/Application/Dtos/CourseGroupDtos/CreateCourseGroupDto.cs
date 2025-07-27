using Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.CourseGroupDtos
{
    public class CreateCourseGroupDto
    {
        public required CourseGroupCodeEnum CourseGroupCode { get; set; }
        public IList<CreateCourseGroupTranslationDto>? Translations { get; set; }
    }
}

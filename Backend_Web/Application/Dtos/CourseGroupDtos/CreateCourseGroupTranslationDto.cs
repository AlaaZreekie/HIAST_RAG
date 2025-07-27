using Application.DTO.CommonDTO;
using Domain.Ennum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.CourseGroupDtos
{
    public class AddCourseGroupTranslationDto : BaseDto<Guid>
    {
        public required LanguageCodeEnum LanguageCode { get; set; }
        public required string Name { get; set; }
    }

    public class CreateCourseGroupTranslationDto
    {
        public required LanguageCodeEnum LanguageCode { get; set; }
        public required string Name { get; set; }
    }
}

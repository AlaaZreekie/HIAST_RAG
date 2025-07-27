using Domain.Ennum;
using Domain.Enum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.CourseGroupDtos
{
    public class CourseGroupFilterDto
    {
        public Guid? Id { set; get; }
        public CourseGroupCodeEnum? CourseGroupCode { get; set; }
        public string? Name { get; set; }
        public LanguageCodeEnum? LanguageCode { get; set; }
    }
}

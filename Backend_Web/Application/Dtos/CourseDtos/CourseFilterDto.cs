using Domain.Ennum;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Dtos.CourseDtos
{
    public class CourseFilterDto
    {
        public Guid? Id { set; get; }
        public string? CourseCode { get; set; }
        public Guid? CourseGroupId { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public LanguageCodeEnum? LanguageCode { get; set; }
    }
}

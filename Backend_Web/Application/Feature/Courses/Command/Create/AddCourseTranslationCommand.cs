using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Courses.Command.Update
{
    public class AddCourseTranslationCommand : IRequest
    {
        public Guid CourseId { get; set; }
        public Guid LanguageId { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
    }
}

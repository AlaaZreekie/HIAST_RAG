using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.CourseGroups.Command.Create
{
    public class AddCourseGroupTranslationCommand : IRequest
    {
        public Guid CourseGroupId { get; set; }
        public Guid LanguageId { get; set; }
        public required string Name { get; set; }
    }
}

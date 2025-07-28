using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Courses.Command.Delete
{
    public class DeleteCourseCommand : IRequest
    {
        public Guid Id { get; set; }
        public bool save { get; set; } = true;
    }
}

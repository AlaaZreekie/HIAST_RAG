using MediatR;
using System;

namespace Application.Feature.CourseGroups.Command.Delete
{
    public class DeleteCourseGroupCommand : IRequest
    {
        public Guid Id { get; set; }
        public bool Save { get; set; } = true;
    }
}
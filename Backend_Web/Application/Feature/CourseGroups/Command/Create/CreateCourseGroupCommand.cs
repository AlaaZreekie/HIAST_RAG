using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.CourseGroups.Command.Create
{
    public record CreateCourseGroupCommand(CourseGroup CourseGroup) : IRequest<Guid>;
}

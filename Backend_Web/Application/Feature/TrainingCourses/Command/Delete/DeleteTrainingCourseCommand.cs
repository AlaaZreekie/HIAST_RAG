using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.TrainingCourses.Command.Delete
{
    public record DeleteTrainingCourseCommand(Guid Id, bool save = true) : IRequest;
}

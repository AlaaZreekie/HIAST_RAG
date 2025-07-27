using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.TrainingCourses.Command.Create
{
    public record CreateTrainingCourseCommand(TrainingCourse Course) : IRequest<Guid>;

}

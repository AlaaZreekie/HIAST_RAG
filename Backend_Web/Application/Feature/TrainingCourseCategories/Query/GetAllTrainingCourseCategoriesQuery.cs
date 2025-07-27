using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.TrainingCourseCategories.Query
{
    public record GetAllTrainingCourseCategoriesQuery : IRequest<IEnumerable<TrainingCourseCategory>>;
}

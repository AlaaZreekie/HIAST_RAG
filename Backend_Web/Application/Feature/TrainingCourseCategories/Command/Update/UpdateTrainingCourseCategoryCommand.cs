using Application.Dtos.TrainingCourseCategoryDtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.TrainingCourseCategories.Command.Update
{
    public class UpdateTrainingCourseCategoryCommand : IRequest
    {
        public Guid Id { get; set; }
        public IList<UpdateTrainingCourseCategoryTranslationDto>? Translations { get; set; }
    }
}

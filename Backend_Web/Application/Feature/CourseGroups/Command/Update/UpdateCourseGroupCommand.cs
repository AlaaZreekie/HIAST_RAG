using Application.Dtos.CourseGroupDtos;
using Domain.Entity.ApplicationEntity;
using Domain.Enum;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.CourseGroups.Command.Update
{
    public class UpdateCourseGroupCommand : IRequest
    {
        public Guid Id { get; set; }
        public CourseGroupCodeEnum? CourseGroupCode { get; set; }
        public IList<UpdateCourseGroupTranslationDto>? Translations { get; set; }
    }
}

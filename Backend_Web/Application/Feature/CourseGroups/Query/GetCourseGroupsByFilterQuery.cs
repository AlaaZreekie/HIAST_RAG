using Application.Dtos.CourseGroupDtos;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.CourseGroups.Query
{
    public record GetCourseGroupsByFilterQuery(CourseGroupFilterDto Filter) : IRequest<IEnumerable<CourseGroup>>;
}

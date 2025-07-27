using Application.Dtos.MediaCategoryDtos;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.MediaCategories.Query
{
    public record GetMediaCategoriesByFilterQuery(MediaCategoryFilterDto Filter) : IRequest<IEnumerable<MediaCategory>>;
}

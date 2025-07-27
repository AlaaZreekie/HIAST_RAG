using Application.Dtos.CategoryDtos;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature._1.Query
{
    public record GetCategoriesByFilterQuery(CategoryFilterDto Filter) : IRequest<IEnumerable<Category>>;
}

using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.FaqCategories.Query
{
    public record GetAllFaqCategoriesQuery : IRequest<IEnumerable<FaqCategory>>;
}

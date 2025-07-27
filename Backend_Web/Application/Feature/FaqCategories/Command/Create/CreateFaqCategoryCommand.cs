using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.FaqCategories.Command.Create
{
    public record CreateFaqCategoryCommand(FaqCategory FaqCategory) : IRequest<Guid>;
}

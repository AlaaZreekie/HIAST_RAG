using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.FaqCategories.Command.Delete
{
    public record DeleteFaqCategoryCommand(Guid Id, bool save = true) : IRequest;
}

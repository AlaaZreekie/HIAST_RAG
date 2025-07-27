using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.MediaCategories.Command.Delete
{
    public record DeleteMediaCategoryCommand(Guid Id) : IRequest;
}

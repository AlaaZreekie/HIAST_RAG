using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature._1.Command.Create
{
    public record CreateCategoryCommand(Category Category, bool Save = true) : IRequest<Guid>;
}

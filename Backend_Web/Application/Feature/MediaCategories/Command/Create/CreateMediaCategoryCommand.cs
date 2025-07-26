using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.MediaCategories.Command.Create
{
    public record CreateMediaCategoryCommand(MediaCategory Category) : IRequest<Guid>;

}

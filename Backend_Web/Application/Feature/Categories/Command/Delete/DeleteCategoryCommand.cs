using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature._1.Command.Update
{
    public record DeleteCategoryCommand(Guid Id, bool save = true) : IRequest;
}

using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Locations.Command.Create
{
    public record CreateLocationCommand(Location Location, bool Save = true) : IRequest<Guid>;
}

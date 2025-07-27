using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Locations.Command.Delete
{
    public record  DeleteLocationCommand(Guid Id) : IRequest;
}

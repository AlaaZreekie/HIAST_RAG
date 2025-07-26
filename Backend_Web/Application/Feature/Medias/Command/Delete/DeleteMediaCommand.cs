using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Medias.Command.Delete
{
    public record DeleteMediaCommand(Guid Id) : IRequest<string?>;

}

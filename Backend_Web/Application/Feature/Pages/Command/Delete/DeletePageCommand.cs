using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Pages.Command.Delete
{
    public record DeletePageCommand(Guid Id) : IRequest;
}

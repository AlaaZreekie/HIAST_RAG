using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Pages.Command.Create
{
    public record CreatePageCommand(Page Page) : IRequest<Guid>;
}

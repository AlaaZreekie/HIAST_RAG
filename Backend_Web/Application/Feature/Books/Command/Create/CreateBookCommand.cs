using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Books.Command.Create
{
    public record CreateBookCommand(Book Book) : IRequest<Guid>;
}

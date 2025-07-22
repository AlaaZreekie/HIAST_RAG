using Domain.Ennum;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Prges.Command.Create
{
    public record CreateLanguageCommand(LanguageCodeEnum Code, string Name) : IRequest<Guid>;
}

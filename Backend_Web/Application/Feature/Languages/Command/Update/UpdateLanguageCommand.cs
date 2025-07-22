using Domain.Ennum;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Prges.Command.Update
{
    public record UpdateLanguageCommand(Guid Id, LanguageCodeEnum? Code, string? Name) : IRequest;
}

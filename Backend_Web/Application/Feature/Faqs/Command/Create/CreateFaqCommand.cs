using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Faqs.Command.Create
{
    public record CreateFaqCommand(Faq Faq) : IRequest<Guid>;
}

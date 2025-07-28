using MediatR;

namespace Application.Feature.Faqs.Command.Delete
{
    public record DeleteFaqCommand(Guid Id, bool save = true) : IRequest;
}
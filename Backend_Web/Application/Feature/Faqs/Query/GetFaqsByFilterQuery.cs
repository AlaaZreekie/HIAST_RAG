using Application.Dtos.FaqDtos;
using Domain.Entity.ApplicationEntity;
using MediatR;

namespace Application.Feature.Faqs.Query
{
    public record GetFaqsByFilterQuery(FaqFilterDto Filter) : IRequest<IEnumerable<Faq>>;
}
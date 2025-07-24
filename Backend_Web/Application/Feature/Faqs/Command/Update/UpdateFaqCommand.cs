using Application.Dtos.FaqDtos;
using MediatR;

namespace Application.Feature.Faqs.Command.Update
{
    public class UpdateFaqCommand : IRequest
    {
        public Guid Id { get; set; }
        public int? DisplayOrder { get; set; }
        public Guid? FaqCategoryId { get; set; }
        public IList<UpdateFaqTranslationDto>? Translations { get; set; }
    }
}
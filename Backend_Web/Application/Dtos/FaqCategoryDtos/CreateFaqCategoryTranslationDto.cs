using Domain.Ennum;

namespace Application.Dtos.FaqCategoryDtos
{
    public class CreateFaqCategoryTranslationDto
    {
        public required LanguageCodeEnum LanguageCode { get; set; }
        public required string Name { get; set; }
    }
}
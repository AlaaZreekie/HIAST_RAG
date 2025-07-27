using Application.DTO.CommonDTO;
using Domain.Ennum;

namespace Application.Dtos.CategoryDtos
{
    public class AddCategoryTranslationDto : BaseDto<Guid>
    {
        public required LanguageCodeEnum LanguageCode { get; set; }
        public required string Name { get; set; }
    }

    public class CreateCategoryTranslationDto
    {
        public required LanguageCodeEnum LanguageCode { get; set; }
        public required string Name { get; set; }
    }
}
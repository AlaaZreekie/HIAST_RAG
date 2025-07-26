using Application.DTO.CommonDTO;
using Domain.Ennum;

namespace Application.Dtos.CategoryDtos
{
    public class CategoryTranslationDto : BaseDto<Guid>
    {
        public string LanguageName { get; set; }
        public LanguageCodeEnum LanguageCode { get; set; }
        public string Slug { get; set; }
        public string Name { get; set; }
    }
}
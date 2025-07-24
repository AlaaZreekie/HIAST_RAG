using Application.DTO.CommonDTO;
using Domain.Ennum;

namespace Application.Dtos.FaqCategoryDtos
{
    public class FaqCategoryTranslationDto : BaseDto<Guid>
    {
        public string LanguageName { get; set; }
        public LanguageCodeEnum LanguageCode { get; set; }
        public string Name { get; set; }
    }
}
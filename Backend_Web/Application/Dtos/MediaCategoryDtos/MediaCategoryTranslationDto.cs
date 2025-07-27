using Application.DTO.CommonDTO;
using Domain.Ennum;

namespace Application.Dtos.MediaCategoryDtos
{
    public class MediaCategoryTranslationDto : BaseDto<Guid>
    {
        public string LanguageName { get; set; }
        public LanguageCodeEnum LanguageCode { get; set; }
        public string Name { get; set; }
    }
}
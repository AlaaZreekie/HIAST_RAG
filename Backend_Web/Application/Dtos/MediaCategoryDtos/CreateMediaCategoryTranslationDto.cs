using Application.DTO.CommonDTO;
using Domain.Ennum;

namespace Application.Dtos.MediaCategoryDtos
{
    public class AddMediaCategoryTranslationDto : BaseDto<Guid>
    {
        public required LanguageCodeEnum LanguageCode { get; set; }
        public required string Name { get; set; }
    }

    public class CreateMediaCategoryTranslationDto
    {
        public required LanguageCodeEnum LanguageCode { get; set; }
        public required string Name { get; set; }
    }
}
using Application.DTO.CommonDTO;
using Domain.Ennum;

namespace Application.Dtos.PageDtos
{
    public class AddPageTranslationDto : BaseDto<Guid>
    {
        public required LanguageCodeEnum LanguageCode { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
    }

    // For providing a translation when creating a new Page
    public class CreatePageTranslationDto
    {
        public required LanguageCodeEnum LanguageCode { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
    }
}
using Application.DTO.CommonDTO;
using Domain.Ennum;

namespace Application.Dtos.PostDtos
{
    public class AddPostTranslationDto : BaseDto<Guid>
    {
        public required LanguageCodeEnum LanguageCode { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
    }

    public class CreatePostTranslationDto
    {
        public required LanguageCodeEnum LanguageCode { get; set; }
        public required string Title { get; set; }
        public required string Content { get; set; }
    }
}
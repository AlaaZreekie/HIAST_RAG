using Application.DTO.CommonDTO;
using Domain.Ennum;

namespace Application.Dtos.BookDtos
{
    public class AddBookTranslationDto : BaseDto<Guid>
    {
        public required LanguageCodeEnum LanguageCode { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
    }

    public class CreateBookTranslationDto
    {
        public required LanguageCodeEnum LanguageCode { get; set; }
        public required string Title { get; set; }
        public string? Description { get; set; }
    }
}
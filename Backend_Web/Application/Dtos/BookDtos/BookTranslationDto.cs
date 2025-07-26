using Application.DTO.CommonDTO;
using Domain.Ennum;

namespace Application.Dtos.BookDtos
{
    public class BookTranslationDto : BaseDto<Guid>
    {
        public string LanguageName { get; set; }
        public LanguageCodeEnum LanguageCode { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
    }
}
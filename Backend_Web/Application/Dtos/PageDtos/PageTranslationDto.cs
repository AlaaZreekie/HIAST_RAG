using Application.DTO.CommonDTO;
using Domain.Ennum;

namespace Application.Dtos.PageDtos
{
    public class PageTranslationDto : BaseDto<Guid>
    {
        public string LanguageName { get; set; }
        public LanguageCodeEnum LanguageCode { get; set; }
        public string Slug { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}
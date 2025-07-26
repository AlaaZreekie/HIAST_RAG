using Application.DTO.CommonDTO;

namespace Application.Dtos.PostDtos
{
    public class UpdatePostTranslationDto : BaseDto<Guid>
    {
        public string? Title { get; set; }
        public string? Content { get; set; }
    }
}
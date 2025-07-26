using Application.DTO.CommonDTO;

namespace Application.Dtos.BookDtos
{
    public class UpdateBookTranslationDto : BaseDto<Guid>
    {
        public string? Title { get; set; }
        public string? Description { get; set; }
    }
}
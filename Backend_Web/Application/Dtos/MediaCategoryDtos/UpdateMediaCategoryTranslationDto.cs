using Application.DTO.CommonDTO;

namespace Application.Dtos.MediaCategoryDtos
{
    public class UpdateMediaCategoryTranslationDto : BaseDto<Guid>
    {
        public string? Name { get; set; }
    }
}
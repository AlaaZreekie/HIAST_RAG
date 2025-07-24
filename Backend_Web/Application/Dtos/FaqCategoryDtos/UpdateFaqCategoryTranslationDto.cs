using Application.DTO.CommonDTO;

namespace Application.Dtos.FaqCategoryDtos
{
    public class UpdateFaqCategoryTranslationDto : BaseDto<Guid>
    {
        public string? Name { get; set; }
    }
}
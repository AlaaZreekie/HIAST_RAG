using Application.DTO.CommonDTO;

namespace Application.Dtos.CategoryDtos
{
    public class UpdateCategoryTranslationDto : BaseDto<Guid>
    {
        public string? Name { get; set; }
    }
}
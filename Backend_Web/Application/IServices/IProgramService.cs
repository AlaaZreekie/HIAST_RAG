using Application.DTO.CommonDTO;
using Application.Dtos.ProgramDtos;

namespace Application.IServices
{
    public interface IProgramService
    {
        Task<Guid> CreateAsync(CreateProgramDto dto, CancellationToken cancellationToken = default);
        Task<IEnumerable<ProgramDto>> GetAllAsync(CancellationToken cancellationToken = default);
        Task AddTranslationAsync(AddProgramTranslationDto dto, CancellationToken cancellationToken = default);
        Task UpdateAsync(UpdateProgramDto dto, CancellationToken cancellationToken = default);
        Task DeleteAsync(BaseDto<Guid> dto, CancellationToken cancellationToken = default);
        Task<IEnumerable<ProgramDto>> GetByFilterAsync(ProgramFilterDto filter, CancellationToken cancellationToken = default);
    }
}

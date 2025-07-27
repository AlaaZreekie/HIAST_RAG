using Application.DTO.CommonDTO;
using Application.Dtos.SlideDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.IServices
{
    public interface ISliderService
    {
        Task<Guid> CreateAsync(CreateSliderWithFileDto dto, Guid mediaId, CancellationToken cancellationToken = default);
        Task UpdateAsync(UpdateSliderDto dto, CancellationToken cancellationToken = default);
        Task<string?> DeleteAsync(BaseDto<Guid> dto, CancellationToken cancellationToken = default);
        Task<IEnumerable<SliderDto>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<IEnumerable<SliderDto>> GetByFilterAsync(SliderFilterDto filter, CancellationToken cancellationToken = default);
    }
}

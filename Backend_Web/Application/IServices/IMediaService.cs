using Application.DTO.CommonDTO;
using Application.Dtos.MediaDtos;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.IServices
{
    public interface IMediaService
    {
        Task<MediaDto> CreateAsync(CreateMediaDto dto, CancellationToken cancellationToken = default);
        Task UpdateAsync(UpdateMediaDto dto, CancellationToken cancellationToken = default);
        Task<string?> DeleteAsync(BaseDto<Guid> dto, CancellationToken cancellationToken = default);
        Task<IEnumerable<MediaDto>> GetByFilterAsync(MediaFilterDto filter, CancellationToken cancellationToken = default);
        Task<IEnumerable<MediaDto>> GetAllAsync(CancellationToken cancellationToken = default);
    }
}
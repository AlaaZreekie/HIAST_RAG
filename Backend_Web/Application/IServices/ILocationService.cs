using Application.Dtos.LocationDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.IServices
{
    public interface ILocationService
    {
        Task<IEnumerable<LocationDto>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<Guid> CreateAsync(CreateLocationDto dto, CancellationToken cancellationToken = default);
        Task UpdateAsync(UpdateLocationDto dto, CancellationToken cancellationToken = default);
        Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
        Task<IEnumerable<LocationDto>> GetByFilterAsync(LocationFilterDto filter, CancellationToken cancellationToken = default);
    }
}

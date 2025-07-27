using Application.Dtos.SpecializationDtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.IServices
{
    public interface ISpecializationService
    {
        Task<IEnumerable<SpecializationDto>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<IEnumerable<SpecializationDto>> GetByFilterAsync(SpecializationFilterDto filter, CancellationToken cancellationToken = default);
        Task<Guid> CreateAsync(CreateSpecializationDto dto, CancellationToken cancellationToken = default);
        Task UpdateAsync(UpdateSpecializationDto dto, CancellationToken cancellationToken = default);
        Task DeleteAsync(Guid id, CancellationToken cancellationToken = default);
    }
}

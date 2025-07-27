using Application.DTO.CommonDTO;
using Application.Dtos.BookDtos;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.IServices
{
    public interface IBookService
    {
        Task<IEnumerable<BookDto>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<Guid> CreateAsync(CreateBookWithFilesDto dto, Guid coverMediaId, Guid fileMediaId, CancellationToken cancellationToken = default);
        Task UpdateAsync(UpdateBookDto dto, CancellationToken cancellationToken = default);
        Task<(string? coverPath, bool isCoverSafeToDelete, string? filePath, bool isFileSafeToDelete)> DeleteAsync(BaseDto<Guid> dto, CancellationToken cancellationToken = default);        Task AddTranslationAsync(AddBookTranslationDto dto, CancellationToken cancellationToken = default);
        Task<IEnumerable<BookDto>> GetByFilterAsync(BookFilterDto filter, CancellationToken cancellationToken = default);
    }
}
using Application.DTO.CommonDTO;
using Application.Dtos.PostDtos;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.IServices
{
    public interface IPostService
    {
        Task<IEnumerable<PostDto>> GetAllAsync(CancellationToken cancellationToken = default);
        Task<Guid> CreateAsync(CreatePostDto dto, Guid authorId, CancellationToken cancellationToken = default);
        Task UpdateAsync(UpdatePostDto dto, CancellationToken cancellationToken = default);
        Task DeleteAsync(BaseDto<Guid> dto, CancellationToken cancellationToken = default);
        Task AddTranslationAsync(AddPostTranslationDto dto, CancellationToken cancellationToken = default);
        Task<IEnumerable<PostDto>> GetByFilterAsync(PostFilterDto filter, CancellationToken cancellationToken = default);
    }
}
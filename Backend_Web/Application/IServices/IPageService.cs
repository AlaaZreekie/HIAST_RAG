using Application.DTO.CommonDTO;
using Application.Dtos.PageDtos;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.IServices
{
    /// <summary>
    /// Defines the contract for the service that manages static page operations.
    /// </summary>
    public interface IPageService
    {
        /// <summary>
        /// Retrieves all pages along with their translations.
        /// </summary>
        /// <param name="cancellationToken">A token to cancel the operation.</param>
        /// <returns>A collection of PageDto objects.</returns>
        Task<IEnumerable<PageDto>> GetAllAsync(CancellationToken cancellationToken = default);

        /// <summary>
        /// Creates a new page and its initial translations. Slugs are generated automatically.
        /// </summary>
        /// <param name="dto">The data for the new page.</param>
        /// <param name="cancellationToken">A token to cancel the operation.</param>
        /// <returns>The ID of the newly created page.</returns>
        Task<Guid> CreateAsync(CreatePageDto dto, CancellationToken cancellationToken = default);

        /// <summary>
        /// Updates an existing page's translations.
        /// </summary>
        /// <param name="dto">The data containing the updates.</param>
        /// <param name="cancellationToken">A token to cancel the operation.</param>
        Task UpdateAsync(UpdatePageDto dto, CancellationToken cancellationToken = default);

        /// <summary>
        /// Deletes a page and all of its associated translations.
        /// </summary>
        /// <param name="dto">The data containing the ID of the page to delete.</param>
        /// <param name="cancellationToken">A token to cancel the operation.</param>
        Task DeleteAsync(BaseDto<Guid> dto, CancellationToken cancellationToken = default);

        /// <summary>
        /// Adds a new translation to an existing page.
        /// </summary>
        /// <param name="dto">The data for the new translation.</param>
        /// <param name="cancellationToken">A token to cancel the operation.</param>
        Task AddTranslationAsync(AddPageTranslationDto dto, CancellationToken cancellationToken = default);

        /// <summary>
        /// Retrieves pages that match a specific set of filter criteria.
        /// </summary>
        /// <param name="filter">The filter criteria to apply.</param>
        /// <param name="cancellationToken">A token to cancel the operation.</param>
        /// <returns>A collection of matching PageDto objects.</returns>
        Task<IEnumerable<PageDto>> GetByFilterAsync(PageFilterDto filter, CancellationToken cancellationToken = default);
    }
}
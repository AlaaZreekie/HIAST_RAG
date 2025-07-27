using Application.DTO.CommonDTO;
using Application.Dtos.MediaCategoryDtos;
using Application.Dtos.MediaDtos;
using Application.Feature.MediaCategories.Query;
using Application.Feature.Medias.Command.Create;
using Application.Feature.Medias.Command.Delete;
using Application.Feature.Medias.Command.Update;
using Application.Feature.Medias.Query;
using Application.IServices;
using AutoMapper;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class MediaService(ISender mediator, IMapper mapper) : IMediaService
    {
        private readonly ISender _mediator = mediator;
        private readonly IMapper _mapper = mapper;

        public async Task<MediaDto> CreateAsync(CreateMediaDto dto, CancellationToken cancellationToken = default)
        {
            if (dto.SavedFileDetails == null)
                throw new InvalidOperationException("File details were not provided. The controller must save the file first.");

            var categoryFilter = new MediaCategoryFilterDto { Id = dto.MediaCategoryId };
            var categoryQuery = new GetMediaCategoriesByFilterQuery(categoryFilter);
            var categoryResult = (await _mediator.Send(categoryQuery, cancellationToken)).FirstOrDefault();
            if (categoryResult is null)
                throw new Exception($"Media Category with ID '{dto.MediaCategoryId}' not found.");

            var mediaEntity = new Media
            {
                FileName = dto.SavedFileDetails.FileName,
                FilePath = dto.SavedFileDetails.FilePath,
                FileType = dto.SavedFileDetails.FileType,
                MediaCategoryId = dto.MediaCategoryId
            };

            var command = new CreateMediaCommand(mediaEntity);
            var newMediaId = await _mediator.Send(command, cancellationToken);

            mediaEntity.Id = newMediaId;
            var mediaDto = _mapper.Map<MediaDto>(mediaEntity);
            mediaDto.MediaCategory = _mapper.Map<MediaCategoryDto>(categoryResult);

            return mediaDto;
        }

        public async Task UpdateAsync(UpdateMediaDto dto, CancellationToken cancellationToken = default)
        {
            var categoryFilter = new MediaCategoryFilterDto { Id = dto.MediaCategoryId };
            var categoryQuery = new GetMediaCategoriesByFilterQuery(categoryFilter);
            if (!(await _mediator.Send(categoryQuery, cancellationToken)).Any())
                throw new Exception($"Media Category with ID '{dto.MediaCategoryId}' not found.");

            var command = _mapper.Map<UpdateMediaCommand>(dto);
            await _mediator.Send(command, cancellationToken);
        }

        public async Task<string?> DeleteAsync(BaseDto<Guid> dto, CancellationToken cancellationToken = default)
        {
            var command = new DeleteMediaCommand (dto.Id);
            var filePath = await _mediator.Send(command, cancellationToken);
            return filePath;
        }

        public async Task<IEnumerable<MediaDto>> GetByFilterAsync(MediaFilterDto filter, CancellationToken cancellationToken = default)
        {
            var query = _mapper.Map<GetMediaByFilterQuery>(filter);
            var result = await _mediator.Send(query, cancellationToken);
            return _mapper.Map<IEnumerable<MediaDto>>(result);
        }

        public async Task<IEnumerable<MediaDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var query = new GetAllMediaQuery();
            var result = await _mediator.Send(query, cancellationToken);
            return _mapper.Map<IEnumerable<MediaDto>>(result);
        }
    }
}
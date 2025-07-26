using Application.DTO.CommonDTO;
using Application.Dtos.LanguageDtos;
using Application.Dtos.MediaCategoryDtos;
using Application.Feature.Languages.Query;
using Application.Feature.MediaCategories.Command.Create;
using Application.Feature.MediaCategories.Command.Delete;
using Application.Feature.MediaCategories.Command.Update;
using Application.Feature.MediaCategories.Query;
using Application.Feature.Prges.Query;
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
    public class MediaCategoryService(ISender mediator, IMapper mapper) : IMediaCategoryService
    {
        private readonly ISender _mediator = mediator;
        private readonly IMapper _mapper = mapper;

        public async Task<Guid> CreateAsync(CreateMediaCategoryDto dto, CancellationToken cancellationToken = default)
        {
            if (dto.Translations == null || !dto.Translations.Any())
                throw new Exception("At least one translation is required to create a media category.");

            var categoryEntity = new MediaCategory();
            var allLanguages = await _mediator.Send(new GetAllLanguagesQuery(), cancellationToken);
            var languageMap = allLanguages.ToDictionary(l => l.Code, l => l.Id);

            foreach (var transDto in dto.Translations)
            {
                if (!languageMap.TryGetValue(transDto.LanguageCode, out var languageId))
                    throw new Exception($"Language code '{transDto.LanguageCode}' not found.");

                var translationEntity = _mapper.Map<MediaCategoryTranslation>(transDto);
                translationEntity.LanguageId = languageId;

                categoryEntity.Translations.Add(translationEntity);
            }

            var command = new CreateMediaCategoryCommand(categoryEntity);
            return await _mediator.Send(command, cancellationToken);
        }

        public async Task UpdateAsync(UpdateMediaCategoryDto dto, CancellationToken cancellationToken = default)
        {
            var command = _mapper.Map<UpdateMediaCategoryCommand>(dto);
            await _mediator.Send(command, cancellationToken);
        }

        public async Task AddTranslationAsync(AddMediaCategoryTranslationDto dto, CancellationToken cancellationToken = default)
        {
            var langFilter = new LanguageFilterDto() { Code = dto.LanguageCode };
            var query = new GetLanguageByFilterQuery(langFilter);
            var language = (await _mediator.Send(query, cancellationToken)).FirstOrDefault();

            if (language is null)
                throw new Exception($"Language with code '{dto.LanguageCode}' not found.");

            var command = _mapper.Map<AddMediaCategoryTranslationCommand>(dto);
            command.LanguageId = language.Id;
            await _mediator.Send(command, cancellationToken);
        }

        public async Task<IEnumerable<MediaCategoryDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var categories = await _mediator.Send(new GetAllMediaCategoriesQuery(), cancellationToken);
            return _mapper.Map<IEnumerable<MediaCategoryDto>>(categories);
        }

        public async Task DeleteAsync(BaseDto<Guid> dto, CancellationToken cancellationToken = default)
        {
            var command = new DeleteMediaCategoryCommand( dto.Id) ;
            await _mediator.Send(command, cancellationToken);
        }

        public async Task<IEnumerable<MediaCategoryDto>> GetByFilterAsync(MediaCategoryFilterDto filter, CancellationToken cancellationToken = default)
        {
            var query = _mapper.Map<GetMediaCategoriesByFilterQuery>(filter);
            var categories = await _mediator.Send(query, cancellationToken);
            return _mapper.Map<IEnumerable<MediaCategoryDto>>(categories);
        }
    }
}
using Application.Common.Utilities;
using Application.DTO.CommonDTO;
using Application.Dtos.CategoryDtos;
using Application.Dtos.LanguageDtos;
using Application.Feature._1.Command.Create;
using Application.Feature._1.Command.Delete;
using Application.Feature._1.Command.Update;
using Application.Feature._1.Query;
using Application.Feature.Categories.Command.Create;
using Application.Feature.Categories.Command.Delete;
using Application.Feature.Categories.Command.Update;
using Application.Feature.Categories.Query;
using Application.Feature.Languages.Query;
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
    public class CategoryService(ISender mediator, IMapper mapper) : ICategoryService
    {
        private readonly ISender _mediator = mediator;
        private readonly IMapper _mapper = mapper;

        public async Task<Guid> CreateAsync(CreateCategoryDto dto, CancellationToken cancellationToken = default)
        {
            if (dto.Translations == null || !dto.Translations.Any())
                throw new Exception("At least one translation is required to create a category.");

            var categoryEntity = new Category();
            var allLanguages = await _mediator.Send(new GetAllLanguagesQuery(), cancellationToken);
            var languageMap = allLanguages.ToDictionary(l => l.Code, l => l.Id);

            foreach (var transDto in dto.Translations)
            {
                if (!languageMap.TryGetValue(transDto.LanguageCode, out var languageId))
                    throw new Exception($"Language code '{transDto.LanguageCode}' not found.");

                var translationEntity = _mapper.Map<CategoryTranslation>(transDto);
                translationEntity.LanguageId = languageId;
                translationEntity.Slug = SlugGenerator.Slugify(transDto.Name);

                categoryEntity.Translations.Add(translationEntity);
            }

            var command = new CreateCategoryCommand(categoryEntity);
            return await _mediator.Send(command, cancellationToken);
        }

        public async Task UpdateAsync(UpdateCategoryDto dto, CancellationToken cancellationToken = default)
        {
            var command = _mapper.Map<UpdateCategoryCommand>(dto);
            await _mediator.Send(command, cancellationToken);
        }

        public async Task AddTranslationAsync(AddCategoryTranslationDto dto, CancellationToken cancellationToken = default)
        {
            var langFilter = new LanguageFilterDto() { Code = dto.LanguageCode };
            var query = new GetLanguageByFilterQuery(langFilter);
            var language = (await _mediator.Send(query, cancellationToken)).FirstOrDefault();

            if (language is null)
                throw new Exception($"Language with code '{dto.LanguageCode}' not found.");

            var command = _mapper.Map<AddCategoryTranslationCommand>(dto);
            command.LanguageId = language.Id;
            command.LanguageCode = dto.LanguageCode;

            await _mediator.Send(command, cancellationToken);
        }

        public async Task<IEnumerable<CategoryDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var categories = await _mediator.Send(new GetAllCategoriesQuery(), cancellationToken);
            return _mapper.Map<IEnumerable<CategoryDto>>(categories);
        }

        public async Task DeleteAsync(BaseDto<Guid> dto, CancellationToken cancellationToken = default)
        {
            var command = new DeleteCategoryCommand(dto.Id);
            await _mediator.Send(command, cancellationToken);
        }

        public async Task<IEnumerable<CategoryDto>> GetByFilterAsync(CategoryFilterDto filter, CancellationToken cancellationToken = default)
        {
            var query = _mapper.Map<GetCategoriesByFilterQuery>(filter);
            var categories = await _mediator.Send(query, cancellationToken);
            return _mapper.Map<IEnumerable<CategoryDto>>(categories);
        }
    }
}
using Application.Common.Utilities;
using Application.DTO.CommonDTO;
using Application.Dtos.LanguageDtos;
using Application.Dtos.PageDtos;
using Application.Feature.Languages.Query;
using Application.Feature.Pages.Command.Create;
using Application.Feature.Pages.Command.Delete;
using Application.Feature.Pages.Command.Update;
using Application.Feature.Pages.Query;
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
    public class PageService(ISender mediator, IMapper mapper) : IPageService
    {
        private readonly ISender _mediator = mediator;
        private readonly IMapper _mapper = mapper;

        public async Task<Guid> CreateAsync(CreatePageDto dto, CancellationToken cancellationToken = default)
        {
            if (dto.Translations == null || !dto.Translations.Any())
            {
                throw new Exception("At least one translation is required to create a page.");
            }

            var pageEntity = new Page();

            // Fetch all languages once for efficiency
            var allLanguages = await _mediator.Send(new GetAllLanguagesQuery(), cancellationToken);
            var languageMap = allLanguages.ToDictionary(l => l.Code, l => l.Id);

            foreach (var transDto in dto.Translations)
            {
                if (!languageMap.TryGetValue(transDto.LanguageCode, out var languageId))
                    throw new Exception($"Language code '{transDto.LanguageCode}' not found.");

                var translationEntity = _mapper.Map<PageTranslation>(transDto);
                translationEntity.LanguageId = languageId;

                // Use the static generator to create the composite slug
                translationEntity.Slug = SlugGenerator.Generate(transDto.Title, transDto.LanguageCode);

                pageEntity.Translations.Add(translationEntity);
            }

            var command = new CreatePageCommand(pageEntity);
            return await _mediator.Send(command, cancellationToken);
        }

        public async Task UpdateAsync(UpdatePageDto dto, CancellationToken cancellationToken = default)
        {
            var command = _mapper.Map<UpdatePageCommand>(dto);
            await _mediator.Send(command, cancellationToken);
        }

        public async Task AddTranslationAsync(AddPageTranslationDto dto, CancellationToken cancellationToken = default)
        {
            var langFilter = new LanguageFilterDto() { Code = dto.LanguageCode };
            var query = new GetLanguageByFilterQuery(langFilter);
            var language = (await _mediator.Send(query, cancellationToken)).FirstOrDefault();

            if (language is null)
                throw new Exception($"Language with code '{dto.LanguageCode}' not found.");

            var command = _mapper.Map<AddPageTranslationCommand>(dto);
            // Populate the command with everything the handler needs
            command.LanguageId = language.Id;
            command.LanguageCode = dto.LanguageCode;

            await _mediator.Send(command, cancellationToken);
        }

        public async Task<IEnumerable<PageDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var pages = await _mediator.Send(new GetAllPagesQuery(), cancellationToken);
            return _mapper.Map<IEnumerable<PageDto>>(pages);
        }

        public async Task DeleteAsync(BaseDto<Guid> dto, CancellationToken cancellationToken = default)
        {
            var command = new DeletePageCommand ( dto.Id );
            await _mediator.Send(command, cancellationToken);
        }

        public async Task<IEnumerable<PageDto>> GetByFilterAsync(PageFilterDto filter, CancellationToken cancellationToken = default)
        {
            var query = _mapper.Map<GetPagesByFilterQuery>(filter);
            var pages = await _mediator.Send(query, cancellationToken);
            return _mapper.Map<IEnumerable<PageDto>>(pages);
        }
    }
}
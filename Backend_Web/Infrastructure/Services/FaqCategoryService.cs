using Application.Dtos.FaqCategoryDtos;
using Application.Feature.FaqCategories.Command.Create;
using Application.Feature.FaqCategories.Command.Delete;
using Application.Feature.FaqCategories.Query;
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
    public class FaqCategoryService(ISender mediator, IMapper mapper) : IFaqCategoryService
    {
        private readonly ISender _mediator = mediator;
        private readonly IMapper _mapper = mapper;

        public async Task<IEnumerable<FaqCategoryDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var faqCategories = await _mediator.Send(new GetAllFaqCategoriesQuery(), cancellationToken);
            return _mapper.Map<IEnumerable<FaqCategoryDto>>(faqCategories);
        }

        public async Task<IEnumerable<FaqCategoryDto>> GetByFilterAsync(FaqCategoryFilterDto filter, CancellationToken cancellationToken = default)
        {
            var query = _mapper.Map<GetFaqCategoriesByFilterQuery>(filter);
            var faqCategories = await _mediator.Send(query, cancellationToken);
            return _mapper.Map<IEnumerable<FaqCategoryDto>>(faqCategories);
        }

        public async Task<Guid> CreateAsync(CreateFaqCategoryDto dto, CancellationToken cancellationToken = default)
        {
            var faqCategoryEntity = _mapper.Map<FaqCategory>(dto);
            faqCategoryEntity.Translations = [];
            if (dto.Translations != null && dto.Translations.Any())
            {
                var allLanguages = await _mediator.Send(new GetAllLanguagesQuery(), cancellationToken);
                foreach (var transDto in dto.Translations)
                {
                    var language = allLanguages.FirstOrDefault(l => l.Code == transDto.LanguageCode);
                    if (language == null)
                        throw new KeyNotFoundException($"Language with code '{transDto.LanguageCode}' not found.");

                    var translationEntity = _mapper.Map<FaqCategoryTranslation>(transDto);
                    translationEntity.LanguageId = language.Id;
                    faqCategoryEntity.Translations.Add(translationEntity);
                }
            }

            var command = new CreateFaqCategoryCommand(faqCategoryEntity);
            return await _mediator.Send(command, cancellationToken);
        }

        public async Task UpdateAsync(UpdateFaqCategoryDto dto, CancellationToken cancellationToken = default)
        {
            var command = _mapper.Map<UpdateFaqCategoryCommand>(dto);
            await _mediator.Send(command, cancellationToken);
        }

        public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var command = new DeleteFaqCategoryCommand(id);
            await _mediator.Send(command, cancellationToken);
        }
    }
}
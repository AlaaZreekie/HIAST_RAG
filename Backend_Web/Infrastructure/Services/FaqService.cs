using Application.Dtos.FaqCategoryDtos;
using Application.Dtos.FaqDtos;
using Application.Feature.FaqCategories.Query;
using Application.Feature.Faqs.Command.Create;
using Application.Feature.Faqs.Command.Delete;
using Application.Feature.Faqs.Command.Update;
using Application.Feature.Faqs.Query;
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
    public class FaqService(ISender mediator, IMapper mapper) : IFaqService
    {
        private readonly ISender _mediator = mediator;
        private readonly IMapper _mapper = mapper;

        public async Task<Guid> CreateAsync(CreateFaqDto dto, CancellationToken cancellationToken = default)
        {
            var categoryFilter = new FaqCategoryFilterDto { Id = dto.FaqCategoryId };
            var categoryExists = (await _mediator.Send(new GetFaqCategoriesByFilterQuery(categoryFilter), cancellationToken)).Any();
            if (!categoryExists)            
                throw new Exception($"FAQ Category with ID '{dto.FaqCategoryId}' not found.");
            

            var faqEntity = _mapper.Map<Faq>(dto);

            if (dto.Translations != null && dto.Translations.Any())
            {
                var allLanguages = await _mediator.Send(new GetAllLanguagesQuery(), cancellationToken);
                foreach (var transDto in dto.Translations)
                {
                    var language = allLanguages.FirstOrDefault(l => l.Code == transDto.LanguageCode);
                    if (language == null)
                        throw new Exception($"Language with code '{transDto.LanguageCode}' not found.");

                    var translationEntity = _mapper.Map<FaqTranslation>(transDto);
                    translationEntity.LanguageId = language.Id;
                    faqEntity.Translations.Add(translationEntity);
                }
            }

            var command = new CreateFaqCommand(faqEntity);
            return await _mediator.Send(command, cancellationToken);
        }

        public async Task<IEnumerable<FaqDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var faqs = await _mediator.Send(new GetAllFaqsQuery(), cancellationToken);
            return _mapper.Map<IEnumerable<FaqDto>>(faqs);
        }
        public async Task<IEnumerable<FaqDto>> GetByFilterAsync(FaqFilterDto filter, CancellationToken cancellationToken = default)
        {
            var query = _mapper.Map<GetFaqsByFilterQuery>(filter);
            var faqs = await _mediator.Send(query, cancellationToken);
            return _mapper.Map<IEnumerable<FaqDto>>(faqs);
        }
        public async Task UpdateAsync(UpdateFaqDto dto, CancellationToken cancellationToken = default)
        {
            if (dto.FaqCategoryId.HasValue)
            {
                var categoryFilter = new FaqCategoryFilterDto { Id = dto.FaqCategoryId.Value };
                var categoryExists = (await _mediator.Send(new GetFaqCategoriesByFilterQuery(categoryFilter), cancellationToken)).Any();
                if (!categoryExists)                
                    throw new Exception($"FAQ Category with ID '{dto.FaqCategoryId.Value}' not found.");
            }

            var command = _mapper.Map<UpdateFaqCommand>(dto);
            await _mediator.Send(command, cancellationToken);
        }

        public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var command = new DeleteFaqCommand(id);
            await _mediator.Send(command, cancellationToken);
        }
    }
}
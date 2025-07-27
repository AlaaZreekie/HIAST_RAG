using Application.DTO.CommonDTO;
using Application.Dtos.SlideDtos;
using Application.Feature.Medias.Command.Delete;
using Application.Feature.Prges.Query;
using Application.Feature.Slides.Command.Create;
using Application.Feature.Slides.Command.Delete;
using Application.Feature.Slides.Command.Update;
using Application.Feature.Slides.Query;
using Application.IServices;
using AutoMapper;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class SliderService(ISender mediator, IMapper mapper) : ISliderService
    {
        private readonly ISender _mediator = mediator;
        private readonly IMapper _mapper = mapper;

        public async Task<Guid> CreateAsync(CreateSliderWithFileDto dto, Guid mediaId, CancellationToken cancellationToken = default)
        {
            var sliderEntity = new Slider
            {
                LinkURL = dto.LinkURL,
                MediaId = mediaId
            };

            var allLanguages = await _mediator.Send(new GetAllLanguagesQuery(), cancellationToken);
            var languageMap = allLanguages.ToDictionary(l => l.Code, l => l.Id);

            foreach (var transDto in dto.Translations)
            {
                if (!languageMap.TryGetValue(transDto.LanguageCode, out var languageId))
                    throw new Exception($"Language code '{transDto.LanguageCode}' not found.");

                var translationEntity = _mapper.Map<SliderTranslation>(transDto);
                translationEntity.LanguageId = languageId;
                sliderEntity.Translations.Add(translationEntity);
            }

            var command = new CreateSliderCommand(sliderEntity);
            return await _mediator.Send(command, cancellationToken);
        }

        public async Task UpdateAsync(UpdateSliderDto dto, CancellationToken cancellationToken = default)
        {
            var command = _mapper.Map<UpdateSliderCommand>(dto);
            await _mediator.Send(command, cancellationToken);
        }

        public async Task<string?> DeleteAsync(BaseDto<Guid> dto, CancellationToken cancellationToken = default)
        {
            var command = new DeleteSliderCommand(dto.Id);
            var mediaToDeleteId =  await _mediator.Send(command, cancellationToken);
            var mediaDeleteCommand = new DeleteMediaCommand(mediaToDeleteId.Value);
            var mediaToDeletePath = await _mediator.Send(mediaDeleteCommand, cancellationToken);
            return mediaToDeletePath;
        }

        public async Task<IEnumerable<SliderDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var sliders = await _mediator.Send(new GetAllSlidersQuery(), cancellationToken);
            return _mapper.Map<IEnumerable<SliderDto>>(sliders);
        }

        public async Task<IEnumerable<SliderDto>> GetByFilterAsync(SliderFilterDto filter, CancellationToken cancellationToken = default)
        {
            var query = _mapper.Map<GetSlidersByFilterQuery>(filter);
            var sliders = await _mediator.Send(query, cancellationToken);
            return _mapper.Map<IEnumerable<SliderDto>>(sliders);
        }
    }
}

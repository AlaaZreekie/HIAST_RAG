using Application.DTO.CommonDTO;
using Application.Dtos.MediaDtos;
using Application.Dtos.TestimonialDtos;
using Application.Feature.Languages.Query;
using Application.Feature.Medias.Command.Delete;
using Application.Feature.Medias.Query;
using Application.Feature.Prges.Query;
using Application.Feature.Testimonials.Command.Create;
using Application.Feature.Testimonials.Command.Delete;
using Application.Feature.Testimonials.Command.Update;
using Application.Feature.Testimonials.Query;
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
    public class TestimonialService(ISender mediator, IMapper mapper) : ITestimonialService
    {
        private readonly ISender _mediator = mediator;
        private readonly IMapper _mapper = mapper;

        public async Task<TestimonialDto> CreateAsync(CreateTestimonialWithFileDto dto, Guid mediaId, CancellationToken cancellationToken = default)
        {
            var testimonialEntity = new Testimonial
            {
                GraduateName = dto.GraduateName,
                GraduateYear = dto.GraduateYear,
                MediaId = mediaId
            };

            if (dto.Translations != null && dto.Translations.Any())
            {
                var allLanguages = await _mediator.Send(new GetAllLanguagesQuery(), cancellationToken);
                var languageMap = allLanguages.ToDictionary(l => l.Code, l => l.Id);

                foreach (var transDto in dto.Translations)
                {
                    if (!languageMap.TryGetValue(transDto.LanguageCode, out var languageId))
                        throw new KeyNotFoundException($"Language code '{transDto.LanguageCode}' not found.");

                    var translationEntity = _mapper.Map<TestimonialTranslation>(transDto);
                    translationEntity.LanguageId = languageId;
                    testimonialEntity.Translations.Add(translationEntity);
                }
            }

            var command = new CreateTestimonialCommand(testimonialEntity);
            var newTestimonialId = await _mediator.Send(command, cancellationToken);

            var filter = new TestimonialFilterDto { Id = newTestimonialId };
            var result = await GetByFilterAsync(filter, cancellationToken);
            return result.First();
        }

        public async Task UpdateAsync(UpdateTestimonialDto dto, CancellationToken cancellationToken = default)
        {
            await ValidateMediaFile(dto.MediaId, cancellationToken);

            var command = _mapper.Map<UpdateTestimonialCommand>(dto);
            await _mediator.Send(command, cancellationToken);
        }

        public async Task<string?> DeleteAsync(BaseDto<Guid> dto, CancellationToken cancellationToken = default)
        {
            var command = new DeleteTestimonialCommand(dto.Id);
            var mediaToDelete =  await _mediator.Send(command, cancellationToken);
            if (mediaToDelete is null)
                return null;

            if (!mediaToDelete.IsSafeToDelete)
                return null;
            if(mediaToDelete.IsSafeToDelete&& mediaToDelete.MediaId is not null && mediaToDelete.MediaId.HasValue)
            {
                var deleteMediaCommand = new DeleteMediaCommand((Guid)mediaToDelete.MediaId!);
                var mediaToDeletePath = await _mediator.Send(deleteMediaCommand, cancellationToken);
                return mediaToDeletePath;
            }
            return "";
        }

        public async Task<IEnumerable<TestimonialDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var testimonials = await _mediator.Send(new GetAllTestimonialsQuery(), cancellationToken);
            return _mapper.Map<IEnumerable<TestimonialDto>>(testimonials);
        }

        public async Task<IEnumerable<TestimonialDto>> GetByFilterAsync(TestimonialFilterDto filter, CancellationToken cancellationToken = default)
        {
            var query = _mapper.Map<GetTestimonialsByFilterQuery>(filter);
            var testimonials = await _mediator.Send(query, cancellationToken);
            return _mapper.Map<IEnumerable<TestimonialDto>>(testimonials);
        }

        private async Task ValidateMediaFile(Guid? mediaId, CancellationToken cancellationToken)
        {
            if (mediaId.HasValue)
            {
                var mediaFilter = new MediaFilterDto { Id = mediaId.Value };
                var query = new GetMediaByFilterQuery(mediaFilter);
                var result = await _mediator.Send(query, cancellationToken);

                if (!result.Any())
                    throw new KeyNotFoundException($"The specified Media with ID '{mediaId.Value}' was not found.");
            }
        }
    }
}
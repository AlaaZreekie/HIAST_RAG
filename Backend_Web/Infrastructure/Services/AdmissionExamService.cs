using Application.Dtos.AdmissionDtos;
using Application.Dtos.AdmissionExamDtos;
using Application.Feature.AdmissionExams.Command.Create;
using Application.Feature.AdmissionExams.Command.Delete;
using Application.Feature.AdmissionExams.Command.Update;
using Application.Feature.AdmissionExams.Query;
using Application.Feature.Admissions.Query;
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
    public class AdmissionExamService(ISender mediator, IMapper mapper) : IAdmissionExamService
    {
        private readonly ISender _mediator = mediator;
        private readonly IMapper _mapper = mapper;

        public async Task<Guid> CreateAsync(CreateAdmissionExamDto dto, CancellationToken cancellationToken = default)
        {
            var admissionFilter = new AdmissionFilterDto { Id = dto.AdmissionId };
            var admissionQuery = new GetAdmissionsByFilterQuery(admissionFilter);
            var admission = (await _mediator.Send(admissionQuery, cancellationToken)).FirstOrDefault();

            if (admission is null)            
                throw new KeyNotFoundException($"The specified Admission with ID '{dto.AdmissionId}' was not found.");
            
            var examEntity = new AdmissionExam
            {
                AdmissionId = dto.AdmissionId,
                ExamDateTime = dto.ExamDateTime
            };

            if (dto.Translations != null && dto.Translations.Any())
            {
                var allLanguages = await _mediator.Send(new GetAllLanguagesQuery(), cancellationToken);
                var languageMap = allLanguages.ToDictionary(l => l.Code, l => l.Id);

                foreach (var transDto in dto.Translations)
                {
                    if (!languageMap.TryGetValue(transDto.LanguageCode, out var languageId))
                        throw new KeyNotFoundException($"Language code '{transDto.LanguageCode}' not found.");

                    var translationEntity = _mapper.Map<AdmissionExamTranslation>(transDto);
                    translationEntity.LanguageId = languageId;
                    examEntity.Translations.Add(translationEntity);
                }
            }

            var command = new CreateAdmissionExamCommand(examEntity);
            return await _mediator.Send(command, cancellationToken);
        }

        public async Task UpdateAsync(UpdateAdmissionExamDto dto, CancellationToken cancellationToken = default)
        {
            var command = _mapper.Map<UpdateAdmissionExamCommand>(dto);
            await _mediator.Send(command, cancellationToken);
        }

        public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            var command = new DeleteAdmissionExamCommand(id);
            await _mediator.Send(command, cancellationToken);
        }

        public async Task<IEnumerable<AdmissionExamDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var exams = await _mediator.Send(new GetAllAdmissionExamsQuery(), cancellationToken);
            return _mapper.Map<IEnumerable<AdmissionExamDto>>(exams);
        }

        public async Task<IEnumerable<AdmissionExamDto>> GetByFilterAsync(AdmissionExamFilterDto filter, CancellationToken cancellationToken = default)
        {
            var query = _mapper.Map<GetAdmissionExamsByFilterQuery>(filter);
            var exams = await _mediator.Send(query, cancellationToken);
            return _mapper.Map<IEnumerable<AdmissionExamDto>>(exams);
        }
    }
}
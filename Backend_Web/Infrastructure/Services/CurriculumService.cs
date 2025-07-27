using Application.DTO.CommonDTO;
using Application.Dtos.CurriculumDtos;
using Application.Dtos.CourseDtos; // For validation
using Application.Dtos.SpecializationDtos; // For validation
using Application.Feature.Courses.Query; // For validation
using Application.Feature.Curriculums.Command.Create;
using Application.Feature.Curriculums.Command.Delete;
using Application.Feature.Curriculums.Command.Update;
using Application.Feature.Curriculums.Query;
using Application.Feature.Specializations.Query; // For validation
using Application.IServices;
using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class CurriculumService(ISender mediator, IMapper mapper) : ICurriculumService
    {
        private readonly ISender _mediator = mediator;
        private readonly IMapper _mapper = mapper;

        public async Task<Guid> CreateAsync(CreateCurriculumDto dto, CancellationToken cancellationToken = default)
        {
            await ValidateCourseAndSpecialization(dto.CourseId, dto.SpecializationId, cancellationToken);

            var curriculumEntity = _mapper.Map<Domain.Entity.ApplicationEntity.Curriculum>(dto);
            var command = new CreateCurriculumCommand(curriculumEntity);
            return await _mediator.Send(command, cancellationToken);
        }

        public async Task UpdateAsync(UpdateCurriculumDto dto, CancellationToken cancellationToken = default)
        {
            await ValidateCourseAndSpecialization(dto.CourseId, dto.SpecializationId, cancellationToken);

            var command = _mapper.Map<UpdateCurriculumCommand>(dto);
            await _mediator.Send(command, cancellationToken);
        }

        public async Task<IEnumerable<CurriculumDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var curriculums = await _mediator.Send(new GetAllCurriculumsQuery(), cancellationToken);
            return _mapper.Map<IEnumerable<CurriculumDto>>(curriculums);
        }

        public async Task DeleteAsync(BaseDto<Guid> dto, CancellationToken cancellationToken = default)
        {
            var command = new DeleteCurriculumCommand { Id = dto.Id };
            await _mediator.Send(command, cancellationToken);
        }

        public async Task<IEnumerable<CurriculumDto>> GetByFilterAsync(CurriculumFilterDto filter, CancellationToken cancellationToken = default)
        {
            var query = _mapper.Map<GetCurriculumsByFilterQuery>(filter);
            var result = await _mediator.Send(query, cancellationToken);
            return _mapper.Map<IEnumerable<CurriculumDto>>(result);
        }

        private async Task ValidateCourseAndSpecialization(Guid? courseId, Guid? specializationId, CancellationToken cancellationToken)
        {
            if (courseId.HasValue)
            {
                var courseFilter = new CourseFilterDto { Id = courseId.Value };
                var courseQuery = new GetCoursesByFilterQuery(courseFilter);
                var courseResult = await _mediator.Send(courseQuery, cancellationToken);
                if (!courseResult.Any())
                    throw new Exception($"The specified Course with ID '{courseId}' does not exist.");
            }

            if (specializationId.HasValue)
            {
                var specFilter = new SpecializationFilterDto { Id = specializationId.Value };
                var specQuery = new GetSpecializationsByFilterQuery(specFilter);
                var specResult = await _mediator.Send(specQuery, cancellationToken);
                if (!specResult.Any())
                    throw new Exception($"The specified Specialization with ID '{specializationId}' does not exist.");
            }
        }
    }
}
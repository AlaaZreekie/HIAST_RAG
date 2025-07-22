using Application.Dtos.LanguageDtos;
using Application.Feature.Prges.Command.Create;
using Application.Feature.Prges.Command.Delete;
using Application.Feature.Prges.Command.Update;
using Application.Feature.Prges.Query;
using Application.IServices;
using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class LanguageService : ILanguageService
    {
        private readonly ISender _mediator;
        private readonly IMapper _mapper;

        public LanguageService(ISender mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        public async Task<IEnumerable<LanguageDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var languages = await _mediator.Send(new GetAllLanguagesQuery(), cancellationToken);
            return _mapper.Map<IEnumerable<LanguageDto>>(languages);
        }

        public async Task<Guid> CreateAsync(CreateLanguageDto dto, CancellationToken cancellationToken = default)
        {
            var command = _mapper.Map<CreateLanguageCommand>(dto);
            return await _mediator.Send(command, cancellationToken);
        }
        public async Task UpdateAsync(UpdateLanguageDto dto, CancellationToken cancellationToken = default)
        {
            var command = _mapper.Map<UpdateLanguageCommand>(dto);
            await _mediator.Send(command, cancellationToken);
        }

        public async Task DeleteAsync(Guid id, CancellationToken cancellationToken = default)
        {
            await _mediator.Send(new DeleteLanguageCommand(id), cancellationToken);
        }
    }
}

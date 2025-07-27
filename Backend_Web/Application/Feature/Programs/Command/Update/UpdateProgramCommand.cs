using Application.Dtos.ProgramDtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Programs.Command.Update
{
    public class UpdateProgramCommand : IRequest
    {
        public Guid Id { get; set; }
        public string? Duration { get; set; }
        public IList<UpdateProgramTranslationDto>? Translations { get; set; }
    }
}

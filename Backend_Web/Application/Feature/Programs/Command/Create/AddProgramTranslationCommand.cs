using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Programs.Command.Create
{
    public class AddProgramTranslationCommand : IRequest
    {
        public Guid ProgramId { get; set; }
        public Guid LanguageId { get; set; }
        public required string Name { get; set; }
        public string? Description { get; set; }
    }
}

using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Programs.Command.Update
{
    public class UpdateProgramTranslationCommand : IRequest
    {
        public Guid Id { get; set; } // This is the ID of the ProgramTranslation
        public string? Name { get; set; }
        public string? Description { get; set; }
    }
}

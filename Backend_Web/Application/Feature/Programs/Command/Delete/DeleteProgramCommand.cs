using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Programs.Command.Delete
{
    public class DeleteProgramCommand : IRequest
    {
        public Guid Id { get; set; }
    }
}

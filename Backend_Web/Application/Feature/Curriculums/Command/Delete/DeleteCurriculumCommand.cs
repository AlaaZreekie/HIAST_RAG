using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Curriculums.Command.Delete
{
    public class DeleteCurriculumCommand : IRequest
    {
        public Guid Id { get; set; }
    }
}

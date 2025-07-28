using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Medias.Command.Update
{
    public class UpdateMediaCommand : IRequest
    {
        public Guid Id { get; set; }
        public Guid MediaCategoryId { get; set; }
        public bool Save { get; set; } = true;
    }
}

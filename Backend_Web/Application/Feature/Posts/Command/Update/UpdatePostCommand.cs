using Application.Dtos.PostDtos;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Posts.Command.Update
{
    public class UpdatePostCommand : IRequest
    {
        public Guid Id { get; set; }
        public DateTime? PublicationDate { get; set; }
        public Guid? CategoryId { get; set; }
        public IList<UpdatePostTranslationDto>? Translations { get; set; }
    }
    
}

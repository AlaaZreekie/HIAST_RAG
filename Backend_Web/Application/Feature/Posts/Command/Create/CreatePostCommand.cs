using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Posts.Command.Create
{
    public record CreatePostCommand(Post Post) : IRequest<Guid>;
}

using Application.Dtos.PostDtos;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Posts.Query
{
    public record GetPostsByFilterQuery(PostFilterDto Filter) : IRequest<IEnumerable<Post>>;
}

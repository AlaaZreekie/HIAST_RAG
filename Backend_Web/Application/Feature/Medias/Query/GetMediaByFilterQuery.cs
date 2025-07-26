using Application.Dtos.MediaDtos;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Feature.Medias.Query
{
    public record GetMediaByFilterQuery(MediaFilterDto Filter) : IRequest<IEnumerable<Media>>;
}

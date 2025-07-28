using Application.Dtos.LocationDtos;
using Domain.Enum;
using MediatR;

namespace Application.Feature.Locations.Command.Update
{
    public class UpdateLocationCommand : IRequest
    {
        public Guid Id { get; set; }
        public LocationCodeEnum? LocationCode { get; set; }
        public IList<UpdateLocationTranslationDto>? Translations { get; set; }
        public bool Save { get; set; } = true;
    }
}
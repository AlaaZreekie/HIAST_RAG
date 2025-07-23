using Application.Dtos.LocationDtos;
using Application.Feature.Locations.Command.Update;
using Application.Feature.Locations.Query;
using AutoMapper;
using Domain.Entity.ApplicationEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Mapper
{
    public class LocationProfile : Profile
    {
        public LocationProfile()
        {
            AllowNullDestinationValues = true;

            CreateMap<Location, LocationDto>()
                .ForMember(dest => dest.LocationCode, opt => opt.MapFrom(src => src.LocationCode.ToString()));

            CreateMap<LocationTranslation, LocationTranslationDto>()
                .ForMember(dest => dest.LanguageName, opt => opt.MapFrom(src => src.Language!.Name))
                .ForMember(dest => dest.LanguageCode, opt => opt.MapFrom(src => src.Language!.Code));

            CreateMap<CreateLocationDto, Location>();
            CreateMap<CreateLocationTranslationDto, LocationTranslation>();

            CreateMap<LocationFilterDto, GetLocationsByFilterQuery>()
                .ConstructUsing(src => new GetLocationsByFilterQuery(src));

            CreateMap<UpdateLocationDto, UpdateLocationCommand>();
            CreateMap<UpdateLocationTranslationDto, UpdateLocationTranslationDto>();
        }
    }
}

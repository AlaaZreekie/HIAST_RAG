using Application.Dtos.ProgramDtos;
using Application.Dtos.SpecializationDtos;
using Application.Feature.Specializations.Command.Update;
using Application.Feature.Specializations.Query;
using AutoMapper;
using Domain.Entity.ApplicationEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Mapper
{
    public class SpecializationProfile : Profile
    {

        public SpecializationProfile()
        {

            AllowNullDestinationValues = true;

            CreateMap<Specialization, SpecializationDto>()
                .ForMember(dest => dest.DegreeType, opt => opt.MapFrom(src => src.DegreeType.ToString()));
;

            CreateMap<SpecializationTranslation, SpecializationTranslationDto>()
                .ForMember(dest => dest.LanguageName, opt => opt.MapFrom(src => src.Language!.Name))
                .ForMember(dest => dest.LanguageCode, opt => opt.MapFrom(src => src.Language!.Code));

            CreateMap<CreateSpecializationDto, Specialization>();
            CreateMap<CreateSpecializationTranslationDto, SpecializationTranslation>();

            CreateMap<SpecializationFilterDto, GetSpecializationsByFilterQuery>()
                .ConstructUsing(src => new GetSpecializationsByFilterQuery(src));

            CreateMap<UpdateSpecializationDto, UpdateSpecializationCommand>();
        }
    }
}

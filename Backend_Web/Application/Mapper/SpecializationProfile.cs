using Application.Dtos.SpecializationDtos;
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
            // For Reading Data: Entity -> DTO
            CreateMap<Specialization, SpecializationDto>()
                .ForMember(dest => dest.DegreeType,
                           opt => opt.MapFrom(src => src.DegreeType.ToString()));

            CreateMap<SpecializationTranslation, SpecializationTranslationDto>();

            // For Writing Data: DTO -> Command -> Entity
            //CreateMap<CreateSpecializationDto, CreateSpecializationCommand>();
            CreateMap<CreateSpecializationTranslationDto, SpecializationTranslation>();
            //CreateMap<CreateSpecializationCommand, Specialization>();
        }
    }
}

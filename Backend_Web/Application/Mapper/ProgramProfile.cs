using Application.Dtos.ProgramDtos;
using Application.Dtos.SpecializationDtos;
using Application.Feature.Programs.Command.Create;
using Application.Feature.Programs.Command.Update;
using Application.Feature.Programs.Query;
using AutoMapper;
using Domain.Entity.ApplicationEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Mapper
{
    public class ProgramProfile : Profile
    {
        public ProgramProfile()
        {
            AllowNullDestinationValues = true;

            //Entity -> DTO
            CreateMap<Program, ProgramDto>();
                //.ForMember(dest => dest.Specializations, opt => opt.MapFrom(src => src.Specializations.ToString()));


            CreateMap<ProgramTranslation, ProgramTranslationDto>();
 
            //DTO -> Entity
            CreateMap<AddProgramTranslationDto, ProgramTranslation>();
            CreateMap<CreateProgramTranslationDto, ProgramTranslation>();
            CreateMap<UpdateProgramTranslationDto, ProgramTranslation>();


            CreateMap<CreateProgramDto, Program>()
            .ForMember(dest => dest.Translations, opt => opt.Ignore())
            .ForMember(dest => dest.Specializations, opt => opt.Ignore());

            CreateMap<CreateProgramTranslationDto, ProgramTranslation>()
                .ForMember(dest => dest.LanguageId, opt => opt.Ignore());


            CreateMap<AddProgramTranslationDto, AddProgramTranslationCommand>()
            .ForMember(dest => dest.ProgramId,
                       opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.Name,
                          opt => opt.MapFrom(src => src.Name))
            .ForMember(dest => dest.Description,
                          opt => opt.MapFrom(src => src.Description));

            CreateMap<UpdateProgramDto, UpdateProgramCommand>();
            CreateMap<UpdateProgramTranslationDto, UpdateProgramTranslationCommand>();
            CreateMap<UpdateProgramDto, UpdateProgramCommand>();

            CreateMap<ProgramFilterDto, GetProgramsByFilterQuery>()
                .ConstructUsing(src => new GetProgramsByFilterQuery(src));

        }
    }
}

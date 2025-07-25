using Application.Dtos.CurriculumDtos;
using Application.Feature.Curriculums.Command.Create;
using Application.Feature.Curriculums.Command.Update;
using Application.Feature.Curriculums.Query;
using AutoMapper;
using Domain.Entity.ApplicationEntity;
using System.Linq;

namespace Application.Mapper
{
    public class CurriculumProfile : Profile
    {
        public CurriculumProfile()
        {
            AllowNullDestinationValues = true;

            // Entity -> DTO (Updated Mapping)
            // This now maps the entire child entity to its corresponding DTO.
            CreateMap<Curriculum, CurriculumDto>()
                .ForMember(dest => dest.Specialization, opt => opt.MapFrom(src => src.Specialization))
                .ForMember(dest => dest.Course, opt => opt.MapFrom(src => src.Course));

            // DTO -> Entity (Unchanged)
            CreateMap<CreateCurriculumDto, Curriculum>()
                .ForMember(dest => dest.Specialization, opt => opt.Ignore())
                .ForMember(dest => dest.Course, opt => opt.Ignore());

            // DTO -> Command (Unchanged)
            CreateMap<UpdateCurriculumDto, UpdateCurriculumCommand>();

            // Filter DTO -> Query (Unchanged)
            CreateMap<CurriculumFilterDto, GetCurriculumsByFilterQuery>()
                .ConstructUsing(src => new GetCurriculumsByFilterQuery(src));
        }
    }
}
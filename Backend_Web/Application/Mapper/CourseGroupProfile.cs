using Application.Dtos.CourseGroupDtos;
using Application.Feature.CourseGroups.Command.Create;
using Application.Feature.CourseGroups.Command.Update;
using Application.Feature.CourseGroups.Query;
using AutoMapper;
using Domain.Entity.ApplicationEntity;

namespace Application.Mapper
{
    public class CourseGroupProfile : Profile
    {
        public CourseGroupProfile()
        {
            AllowNullDestinationValues = true;

            // Entity -> DTO
            CreateMap<CourseGroup, CourseGroupDto>();
            CreateMap<CourseGroupTranslation, CourseGroupTranslationDto>();

            // DTO -> Entity
            CreateMap<CreateCourseGroupDto, CourseGroup>()
                .ForMember(dest => dest.Translations, opt => opt.Ignore())
                .ForMember(dest => dest.Courses, opt => opt.Ignore());

            CreateMap<CreateCourseGroupTranslationDto, CourseGroupTranslation>()
                .ForMember(dest => dest.LanguageId, opt => opt.Ignore());

            // DTO -> Command
            CreateMap<AddCourseGroupTranslationDto, AddCourseGroupTranslationCommand>()
                .ForMember(dest => dest.CourseGroupId, opt => opt.MapFrom(src => src.Id));

            CreateMap<UpdateCourseGroupDto, UpdateCourseGroupCommand>();

            // Filter DTO -> Query
            CreateMap<CourseGroupFilterDto, GetCourseGroupsByFilterQuery>()
                .ConstructUsing(src => new GetCourseGroupsByFilterQuery(src));
        }
    }
}
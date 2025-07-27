using Application.Dtos.CourseDtos;
using Application.Feature.Courses.Command.Create;
using Application.Feature.Courses.Command.Update;
using Application.Feature.Courses.Query;
using AutoMapper;
using Domain.Entity.ApplicationEntity;

namespace Application.Mapper
{
    public class CourseProfile : Profile
    {
        public CourseProfile()
        {
            AllowNullDestinationValues = true;

            // Entity -> DTO
            CreateMap<Course, CourseDto>();
            CreateMap<CourseTranslation, CourseTranslationDto>();

            // DTO -> Entity
            CreateMap<CreateCourseDto, Course>()
                .ForMember(dest => dest.Translations, opt => opt.Ignore())
                .ForMember(dest => dest.CourseGroup, opt => opt.Ignore())
                .ForMember(dest => dest.Curriculum, opt => opt.Ignore());

            CreateMap<CreateCourseTranslationDto, CourseTranslation>()
                .ForMember(dest => dest.LanguageId, opt => opt.Ignore());

            // DTO -> Command
            CreateMap<UpdateCourseDto, UpdateCourseCommand>();

            CreateMap<AddCourseTranslationDto, AddCourseTranslationCommand>()
                .ForMember(dest => dest.CourseId, opt => opt.MapFrom(src => src.Id));

            // Filter DTO -> Query
            CreateMap<CourseFilterDto, GetCoursesByFilterQuery>()
                .ConstructUsing(src => new GetCoursesByFilterQuery(src));
        }
    }
}
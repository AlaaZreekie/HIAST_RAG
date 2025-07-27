using Application.Dtos.TrainingCourseDtos;
using Application.Feature.TrainingCourses.Command.Update;
using Application.Feature.TrainingCourses.Query;
using AutoMapper;
using Domain.Entity.ApplicationEntity;
using System.Linq;

namespace Application.Mapper
{
    public class TrainingCourseProfile : Profile
    {
        public TrainingCourseProfile()
        {
            AllowNullDestinationValues = true;

            CreateMap<TrainingCourse, TrainingCourseDto>()
               .ForMember(dest => dest.TrainingCourseCategory, opt => opt.MapFrom(src => src.TrainingCourseCategory));

            CreateMap<TrainingCourseTranslation, TrainingCourseTranslationDto>()
                .ForMember(dest => dest.LanguageName, opt => opt.MapFrom(src => src.Language.Name))
                .ForMember(dest => dest.LanguageCode, opt => opt.MapFrom(src => src.Language.Code));

            CreateMap<CreateTrainingCourseDto, TrainingCourse>();
            CreateMap<CreateTrainingCourseTranslationDto, TrainingCourseTranslation>();
            CreateMap<UpdateTrainingCourseDto, UpdateTrainingCourseCommand>();
            CreateMap<TrainingCourseFilterDto, GetTrainingCoursesByFilterQuery>()
                .ConstructUsing(src => new GetTrainingCoursesByFilterQuery(src));
        }
    }
}
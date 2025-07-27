using Application.Dtos.TrainingCourseCategoryDtos;
using Application.Feature.TrainingCourseCategories.Command.Delete;
using Application.Feature.TrainingCourseCategories.Query;
using AutoMapper;
using Domain.Entity.ApplicationEntity;

namespace Application.Mapper
{
    public class TrainingCourseCategoryProfile : Profile
    {
        public TrainingCourseCategoryProfile()
        {
            AllowNullDestinationValues = true;
            CreateMap<TrainingCourseCategory, TrainingCourseCategoryDto>();
            CreateMap<TrainingCourseCategoryTranslation, TrainingCourseCategoryTranslationDto>()
                .ForMember(dest => dest.LanguageName, opt => opt.MapFrom(src => src.Language.Name))
                .ForMember(dest => dest.LanguageCode, opt => opt.MapFrom(src => src.Language.Code));

            CreateMap<CreateTrainingCourseCategoryDto, TrainingCourseCategory>();
            CreateMap<CreateTrainingCourseCategoryTranslationDto, TrainingCourseCategoryTranslation>();
            CreateMap<UpdateTrainingCourseCategoryDto, UpdateTrainingCourseCategoryCommand>();
            CreateMap<TrainingCourseCategoryFilterDto, GetTrainingCourseCategoriesByFilterQuery>()
                .ConstructUsing(src => new GetTrainingCourseCategoriesByFilterQuery(src));
        }
    }
}
using Application.Dtos.MediaCategoryDtos;
using Application.Feature.MediaCategories.Command.Create;
using Application.Feature.MediaCategories.Command.Update;
using Application.Feature.MediaCategories.Query;
using AutoMapper;
using Domain.Entity.ApplicationEntity;

namespace Application.Mapper
{
    public class MediaCategoryProfile : Profile
    {
        public MediaCategoryProfile()
        {
            AllowNullDestinationValues = true;

            // Entity -> DTO
            CreateMap<MediaCategory, MediaCategoryDto>();
            CreateMap<MediaCategoryTranslation, MediaCategoryTranslationDto>();

            // DTO -> Entity
            CreateMap<CreateMediaCategoryDto, MediaCategory>()
                .ForMember(dest => dest.Translations, opt => opt.Ignore())
                .ForMember(dest => dest.Media, opt => opt.Ignore());

            CreateMap<CreateMediaCategoryTranslationDto, MediaCategoryTranslation>()
                .ForMember(dest => dest.LanguageId, opt => opt.Ignore());

            // DTO -> Command
            CreateMap<UpdateMediaCategoryDto, UpdateMediaCategoryCommand>();
 
            CreateMap<AddMediaCategoryTranslationDto, AddMediaCategoryTranslationCommand>()
                .ForMember(dest => dest.MediaCategoryId, opt => opt.MapFrom(src => src.Id));

            // Filter DTO -> Query
            CreateMap<MediaCategoryFilterDto, GetMediaCategoriesByFilterQuery>()
                .ConstructUsing(src => new GetMediaCategoriesByFilterQuery(src));
        }
    }
}
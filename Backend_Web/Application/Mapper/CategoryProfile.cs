using Application.Dtos.CategoryDtos;
using Application.Feature._1.Command.Create;
using Application.Feature._1.Command.Delete;
using Application.Feature._1.Query;
using Application.Feature.Categories.Command.Create;
using Application.Feature.Categories.Command.Update;
using Application.Feature.Categories.Query;
using AutoMapper;
using Domain.Entity.ApplicationEntity;

namespace Application.Mapper
{
    public class CategoryProfile : Profile
    {
        public CategoryProfile()
        {
            AllowNullDestinationValues = true;

            // Entity -> DTO
            CreateMap<Category, CategoryDto>();
            CreateMap<CategoryTranslation, CategoryTranslationDto>();

            // DTO -> Entity
            CreateMap<CreateCategoryDto, Category>()
                .ForMember(dest => dest.Translations, opt => opt.Ignore())
                .ForMember(dest => dest.Posts, opt => opt.Ignore());

            CreateMap<CreateCategoryTranslationDto, CategoryTranslation>()
                .ForMember(dest => dest.LanguageId, opt => opt.Ignore())
                .ForMember(dest => dest.Slug, opt => opt.Ignore()); // Slug is generated in the service

            // DTO -> Command
            CreateMap<UpdateCategoryDto, UpdateCategoryCommand>();

            CreateMap<AddCategoryTranslationDto, AddCategoryTranslationCommand>()
                .ForMember(dest => dest.CategoryId, opt => opt.MapFrom(src => src.Id));

            // Filter DTO -> Query
            CreateMap<CategoryFilterDto, GetCategoriesByFilterQuery>()
                .ConstructUsing(src => new GetCategoriesByFilterQuery(src));
        }
    }
}
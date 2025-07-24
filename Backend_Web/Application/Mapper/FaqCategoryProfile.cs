using Application.Dtos.FaqCategoryDtos;
using Application.Feature.FaqCategories.Command.Delete;
using Application.Feature.FaqCategories.Query;
using AutoMapper;
using Domain.Entity.ApplicationEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Mapper
{
    public class FaqCategoryProfile : Profile
    {
        public FaqCategoryProfile()
        {
            AllowNullDestinationValues = true;

            // For Reading Data: Entity -> DTO
            CreateMap<FaqCategory, FaqCategoryDto>();
            CreateMap<FaqCategoryTranslation, FaqCategoryTranslationDto>()
                .ForMember(dest => dest.LanguageName, opt => opt.MapFrom(src => src.Language.Name))
                .ForMember(dest => dest.LanguageCode, opt => opt.MapFrom(src => src.Language.Code));

            // For Writing Data: DTO -> Entity (Used by Service Layer)
            CreateMap<CreateFaqCategoryDto, FaqCategory>();

            CreateMap<CreateFaqCategoryTranslationDto, FaqCategoryTranslation>();

            // For Filtering
            CreateMap<FaqCategoryFilterDto, GetFaqCategoriesByFilterQuery>()
                .ConstructUsing(src => new GetFaqCategoriesByFilterQuery(src));

            CreateMap<UpdateFaqCategoryDto, UpdateFaqCategoryCommand>();
            CreateMap<UpdateFaqCategoryTranslationDto, UpdateFaqCategoryTranslationDto>();
        }
    } 
}

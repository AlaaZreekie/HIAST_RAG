using Application.Dtos.FaqDtos;
using Application.Feature.Faqs.Command.Update;
using Application.Feature.Faqs.Query;
using AutoMapper;
using Domain.Entity.ApplicationEntity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Mapper
{
    public class FaqProfile : Profile
    {
        public FaqProfile()
        {
            // For Reading Data
            CreateMap<Faq, FaqDto>()
                .ForMember(dest => dest.FaqCategoryName, opt => opt.MapFrom(src => src.FaqCategory.Translations.FirstOrDefault()!.Name));
            CreateMap<FaqTranslation, FaqTranslationDto>()
                .ForMember(dest => dest.LanguageName, opt => opt.MapFrom(src => src.Language!.Name))
                .ForMember(dest => dest.LanguageCode, opt => opt.MapFrom(src => src.Language!.Code));

            // For Writing Data
            CreateMap<CreateFaqDto, Faq>()
                .ForMember(dest => dest.Translations, opt => opt.Ignore());
            CreateMap<CreateFaqTranslationDto, FaqTranslation>()
                .ForMember(dest => dest.LanguageId, opt => opt.Ignore());

            // For Updating
            CreateMap<UpdateFaqDto, UpdateFaqCommand>();
            CreateMap<UpdateFaqTranslationDto, UpdateFaqTranslationDto>();

            // For Filtering
            CreateMap<FaqFilterDto, GetFaqsByFilterQuery>()
                .ConstructUsing(src => new GetFaqsByFilterQuery(src));
        }
    }
}

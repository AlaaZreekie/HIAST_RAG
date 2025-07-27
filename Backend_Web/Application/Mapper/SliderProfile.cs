using Application.Dtos.SlideDtos;
using Application.Feature.Slides.Command.Update;
using Application.Feature.Slides.Query;
using AutoMapper;
using Domain.Entity.ApplicationEntity;

namespace Application.Mapper
{
    public class SliderProfile : Profile
    {
        public SliderProfile()
        {
            AllowNullDestinationValues = true;

            // Entity -> DTO
            CreateMap<Slider, SliderDto>();
            CreateMap<SliderTranslation, SliderTranslationDto>()
                .ForMember(dest => dest.LanguageCode, opt => opt.MapFrom(src => src.Language.Code))
                .ForMember(dest => dest.LanguageName, opt => opt.MapFrom(src => src.Language.Name));

            // DTO -> Entity (for translations in the service)
            CreateMap<CreateSliderTranslationDto, SliderTranslation>()
                .ForMember(dest => dest.LanguageId, opt => opt.Ignore()); // Will be set manually in the service

            // DTO -> Command
            CreateMap<UpdateSliderDto, UpdateSliderCommand>();

            // Filter DTO -> Query
            CreateMap<SliderFilterDto, GetSlidersByFilterQuery>()
                .ConstructUsing(src => new GetSlidersByFilterQuery(src));
        }
    }
}
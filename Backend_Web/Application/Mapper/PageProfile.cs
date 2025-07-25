using Application.Dtos.PageDtos;
using Application.Feature.Pages.Command.Create;
using Application.Feature.Pages.Command.Update;
using Application.Feature.Pages.Query;
using AutoMapper;
using Domain.Entity.ApplicationEntity;

namespace Application.Mapper
{
    public class PageProfile : Profile
    {
        public PageProfile()
        {
            AllowNullDestinationValues = true;

            // Entity -> DTO
            CreateMap<Page, PageDto>();
            CreateMap<PageTranslation, PageTranslationDto>();

            // DTO -> Entity
            CreateMap<CreatePageDto, Page>()
                .ForMember(dest => dest.Translations, opt => opt.Ignore());

            CreateMap<CreatePageTranslationDto, PageTranslation>()
                .ForMember(dest => dest.LanguageId, opt => opt.Ignore())
                .ForMember(dest => dest.Slug, opt => opt.Ignore()); // Slug is generated in the service

            // DTO -> Command
            CreateMap<UpdatePageDto, UpdatePageCommand>();

            CreateMap<AddPageTranslationDto, AddPageTranslationCommand>()
                .ForMember(dest => dest.PageId, opt => opt.MapFrom(src => src.Id));

            // Filter DTO -> Query
            CreateMap<PageFilterDto, GetPagesByFilterQuery>()
                .ConstructUsing(src => new GetPagesByFilterQuery(src));
        }
    }
}
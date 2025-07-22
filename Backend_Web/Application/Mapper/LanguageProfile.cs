using Application.Dtos.LanguageDtos;
using Application.Feature.Languages.Query;
using Application.Feature.Prges.Command.Create;
using Application.Feature.Prges.Command.Update;
using AutoMapper;
using Domain.Entity.ApplicationEntity; // The source Domain Entity

namespace HIAST.Application.Mappings;

/// <summary>
/// Defines the AutoMapper configuration for mapping between Language-related objects.
/// </summary>
public class LanguageProfile : Profile
{
    public LanguageProfile()
    {
        AllowNullDestinationValues = true;

        CreateMap<Language, LanguageDto>()
           .ForMember(dest => dest.Code,
                      opt => opt.MapFrom(src => src.Code.ToString()));

        CreateMap<CreateLanguageDto, CreateLanguageCommand>()
            .ForCtorParam("Code", opt => opt.MapFrom(src => src.Code))
            .ForCtorParam("Name", opt => opt.MapFrom(src => src.Name));



        CreateMap<UpdateLanguageDto, UpdateLanguageCommand>();

            //.ForCtorParam("Id", opt => opt.MapFrom(src => src.Id))
            //.ForMember("Code", opt => opt.Condition(src => src.Code.HasValue))
            //.ForMember("Name", opt => opt.Condition(src => src.Name != null));

        CreateMap<LanguageFilterDto, GetLanguageByFilterQuery>()
            .ConstructUsing(src => new GetLanguageByFilterQuery(src));
    }
}
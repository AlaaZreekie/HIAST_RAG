using Application.Dtos.AdmissionResultDtos;
using Application.Feature.AdmissionResults.Command.Update;
using Application.Feature.AdmissionResults.Query;
using AutoMapper;
using Domain.Entity.ApplicationEntity;

namespace Application.Mapper
{
    public class AdmissionResultProfile : Profile
    {
        public AdmissionResultProfile()
        {
            AllowNullDestinationValues = true;

            // Entity -> DTO
            CreateMap<AdmissionResult, AdmissionResultDto>()
                .ForMember(dest => dest.Media, opt => opt.MapFrom(src => src.Media));

            // DTO -> Command
            CreateMap<UpdateAdmissionResultDto, UpdateAdmissionResultCommand>();

            // Filter DTO -> Query
            CreateMap<AdmissionResultFilterDto, GetAdmissionResultsByFilterQuery>()
                .ConstructUsing(src => new GetAdmissionResultsByFilterQuery(src));
        }
    }
}
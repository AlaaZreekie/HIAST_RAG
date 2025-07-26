using Application.Dtos.AdmissionDtos;
using Application.Dtos.LocationDtos;
using Application.Dtos.ProgramDtos;
using Application.Feature.Admissions.Command.Update;
using Application.Feature.Admissions.Query;
using AutoMapper;
using Domain.Entity.ApplicationEntity;

namespace Application.Mapper
{
    public class AdmissionProfile : Profile
    {
        public AdmissionProfile()
        {
            AllowNullDestinationValues = true;

            // Entity -> DTO
            CreateMap<Admission, AdmissionDto>();

            // DTO -> Entity
            CreateMap<CreateAdmissionDto, Admission>();

            // DTO -> Command
            CreateMap<UpdateAdmissionDto, UpdateAdmissionCommand>();

            // Filter DTO -> Query
            CreateMap<AdmissionFilterDto, GetAdmissionsByFilterQuery>()
                .ConstructUsing(src => new GetAdmissionsByFilterQuery(src));
        }
    }
}
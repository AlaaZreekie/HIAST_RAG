using Application.Dtos.AdmissionExamDtos;
using Application.Feature.AdmissionExams.Command.Update;
using Application.Feature.AdmissionExams.Query;
using AutoMapper;
using Domain.Entity.ApplicationEntity;

namespace Application.Mapper
{
    public class AdmissionExamProfile : Profile
    {
        public AdmissionExamProfile()
        {
            AllowNullDestinationValues = true;

            // Entity -> DTO
            CreateMap<AdmissionExam, AdmissionExamDto>();
            CreateMap<AdmissionExamTranslation, AdmissionExamTranslationDto>();

            // DTO -> Entity
            CreateMap<CreateAdmissionExamDto, AdmissionExam>()
                .ForMember(dest => dest.Translations, opt => opt.Ignore());

            CreateMap<CreateAdmissionExamTranslationDto, AdmissionExamTranslation>()
                .ForMember(dest => dest.LanguageId, opt => opt.Ignore());

            // DTO -> Command
            CreateMap<UpdateAdmissionExamDto, UpdateAdmissionExamCommand>();
            CreateMap<UpdateAdmissionExamTranslationDto, UpdateAdmissionExamTranslationDto>();

            // Filter DTO -> Query
            CreateMap<AdmissionExamFilterDto, GetAdmissionExamsByFilterQuery>()
                .ConstructUsing(src => new GetAdmissionExamsByFilterQuery(src));
        }
    }
}
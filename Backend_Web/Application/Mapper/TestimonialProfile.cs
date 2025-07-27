using Application.Dtos.TestimonialDtos;
using Application.Feature.Testimonials.Command.Update;
using Application.Feature.Testimonials.Query;
using AutoMapper;
using Domain.Entity.ApplicationEntity;

namespace Application.Mapper
{
    public class TestimonialProfile : Profile
    {
        public TestimonialProfile()
        {
            AllowNullDestinationValues = true;

            // Entity -> DTO
            CreateMap<Testimonial, TestimonialDto>()
                .ForMember(dest => dest.Media, opt => opt.MapFrom(src => src.Media));
            CreateMap<TestimonialTranslation, TestimonialTranslationDto>();

            // DTO -> Entity
            CreateMap<CreateTestimonialTranslationDto, TestimonialTranslation>()
                .ForMember(dest => dest.LanguageId, opt => opt.Ignore());

            // DTO -> Command
            CreateMap<UpdateTestimonialDto, UpdateTestimonialCommand>();
            CreateMap<UpdateTestimonialTranslationDto, UpdateTestimonialTranslationDto>();

            // Filter DTO -> Query
            CreateMap<TestimonialFilterDto, GetTestimonialsByFilterQuery>()
                .ConstructUsing(src => new GetTestimonialsByFilterQuery(src));
        }
    }
}
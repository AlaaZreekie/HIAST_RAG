using Application.Dtos.PostDtos;
using Application.Feature.Posts.Command.Create;
using Application.Feature.Posts.Command.Update;
using Application.Feature.Posts.Query;
using AutoMapper;
using Domain.Entity.ApplicationEntity;
using System.Linq;

namespace Application.Mapper
{
    public class PostProfile : Profile
    {
        public PostProfile()
        {
            AllowNullDestinationValues = true;

            // Entity -> DTO
            CreateMap<Post, PostDto>()
                .ForMember(dest => dest.AuthorName, opt => opt.MapFrom(src => src.Author.UserName))
                .ForMember(dest => dest.Category,
                           opt => opt.MapFrom(src => src.Category));

            CreateMap<PostTranslation, PostTranslationDto>();

            // DTO -> Entity
            CreateMap<CreatePostDto, Post>()
                // Server-controlled properties are ignored
                .ForMember(dest => dest.AuthorId, opt => opt.Ignore())
                .ForMember(dest => dest.PublicationDate, opt => opt.Ignore())
                // Navigation properties are ignored
                .ForMember(dest => dest.Author, opt => opt.Ignore())
                .ForMember(dest => dest.Category, opt => opt.Ignore())
                .ForMember(dest => dest.Translations, opt => opt.Ignore());

            CreateMap<CreatePostTranslationDto, PostTranslation>()
                .ForMember(dest => dest.LanguageId, opt => opt.Ignore());

            // DTO -> Command
            CreateMap<UpdatePostDto, UpdatePostCommand>();

            CreateMap<AddPostTranslationDto, AddPostTranslationCommand>()
                .ForMember(dest => dest.PostId, opt => opt.MapFrom(src => src.Id));

            // Filter DTO -> Query
            CreateMap<PostFilterDto, GetPostsByFilterQuery>()
                .ConstructUsing(src => new GetPostsByFilterQuery(src));
        }
    }
}
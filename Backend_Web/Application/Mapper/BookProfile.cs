using Application.Dtos.BookDtos;
using Application.Feature.Books.Command.Create;
using Application.Feature.Books.Command.Update;
using Application.Feature.Books.Query;
using AutoMapper;
using Domain.Entity.ApplicationEntity;

namespace Application.Mapper
{
    public class BookProfile : Profile
    {
        public BookProfile()
        {
            AllowNullDestinationValues = true;

            // Entity -> DTO
            CreateMap<Book, BookDto>()
                .ForMember(dest => dest.CoverImage, opt => opt.MapFrom(src => src.CoverImage))
                .ForMember(dest => dest.BookFile, opt => opt.MapFrom(src => src.BookFile));

            CreateMap<BookTranslation, BookTranslationDto>();

            // DTO -> Entity
            CreateMap<CreateBookDto, Book>()
                .ForMember(dest => dest.Translations, opt => opt.Ignore())
                .ForMember(dest => dest.CoverImage, opt => opt.Ignore())
                .ForMember(dest => dest.BookFile, opt => opt.Ignore());

            CreateMap<CreateBookTranslationDto, BookTranslation>()
                .ForMember(dest => dest.LanguageId, opt => opt.Ignore());

            // DTO -> Command
            CreateMap<UpdateBookDto, UpdateBookCommand>();

            CreateMap<AddBookTranslationDto, AddBookTranslationCommand>()
                .ForMember(dest => dest.BookId, opt => opt.MapFrom(src => src.Id));

            // Filter DTO -> Query
            CreateMap<BookFilterDto, GetBooksByFilterQuery>()
                .ConstructUsing(src => new GetBooksByFilterQuery(src));
        }
    }
}
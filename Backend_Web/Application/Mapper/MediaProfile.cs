using Application.Dtos.MediaDtos;
using Application.Feature.Medias.Command.Create;
using Application.Feature.Medias.Command.Update;
using Application.Feature.Medias.Query;
using AutoMapper;
using Domain.Entity.ApplicationEntity;

namespace Application.Mapper
{
    public class MediaProfile : Profile
    {
        public MediaProfile()
        {
            AllowNullDestinationValues = true;
            CreateMap<Media, MediaDto>()
                .ForMember(dest => dest.MediaCategory, opt => opt.MapFrom(src => src.MediaCategory));
            CreateMap<CreateMediaDto, Media>()
                .ForMember(dest => dest.MediaCategoryId, opt => opt.MapFrom(src => src.MediaCategoryId))
                .ForMember(dest => dest.FilePath, opt => opt.MapFrom(src => src.SavedFileDetails!.FilePath))
                .ForMember(dest => dest.FileType, opt => opt.MapFrom(src => src.SavedFileDetails!.FileType))
                .ForMember(dest => dest.FileName, opt => opt.MapFrom(src => src.SavedFileDetails!.FileName));


            CreateMap<UpdateMediaDto, UpdateMediaCommand>();

            CreateMap<MediaFilterDto, GetMediaByFilterQuery>()
                .ConstructUsing(src => new GetMediaByFilterQuery(src));
        }
    }
}
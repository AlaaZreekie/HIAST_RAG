using Application.DTO.CommonDTO;
using Application.Dtos.CategoryDtos;
using Application.Dtos.LanguageDtos;
using Application.Dtos.PostDtos;
using Application.Feature._1.Query;
using Application.Feature.Categories.Query;
using Application.Feature.Languages.Query;
using Application.Feature.Posts.Command.Create;
using Application.Feature.Posts.Command.Delete;
using Application.Feature.Posts.Command.Update;
using Application.Feature.Posts.Query;
using Application.Feature.Prges.Query;
using Application.IServices;
using AutoMapper;
using Domain.Entity.ApplicationEntity;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Infrastructure.Services
{
    public class PostService(ISender mediator, IMapper mapper) : IPostService
    {
        private readonly ISender _mediator = mediator;
        private readonly IMapper _mapper = mapper;

        public async Task<Guid> CreateAsync(CreatePostDto dto, Guid authorId, CancellationToken cancellationToken = default)
        {
            var categoryFilter = new CategoryFilterDto { Id = dto.CategoryId };
            var categoryQuery = new GetCategoriesByFilterQuery(categoryFilter);
            var categoryResult = await _mediator.Send(categoryQuery, cancellationToken);
            if (!categoryResult.Any())
                throw new Exception($"The specified Category with ID '{dto.CategoryId}' does not exist.");

            var postEntity = _mapper.Map<Post>(dto);

            // Set server-controlled properties
            postEntity.AuthorId = authorId;
            postEntity.PublicationDate = DateTime.UtcNow;

            if (dto.Translations != null && dto.Translations.Any())
            {
                var allLanguages = await _mediator.Send(new GetAllLanguagesQuery(), cancellationToken);
                var languageMap = allLanguages.ToDictionary(l => l.Code, l => l.Id);

                foreach (var transDto in dto.Translations)
                {
                    if (!languageMap.TryGetValue(transDto.LanguageCode, out var languageId))
                        throw new Exception($"Language code '{transDto.LanguageCode}' not found.");

                    var translationEntity = _mapper.Map<PostTranslation>(transDto);
                    translationEntity.LanguageId = languageId;
                    postEntity.Translations.Add(translationEntity);
                }
            }

            var command = new CreatePostCommand(postEntity);
            return await _mediator.Send(command, cancellationToken);
        }

        public async Task UpdateAsync(UpdatePostDto dto, CancellationToken cancellationToken = default)
        {
            if (dto.CategoryId.HasValue)
            {
                var categoryFilter = new CategoryFilterDto { Id = dto.CategoryId.Value };
                var categoryQuery = new GetCategoriesByFilterQuery(categoryFilter);
                var categoryResult = await _mediator.Send(categoryQuery, cancellationToken);
                if (!categoryResult.Any())
                    throw new Exception($"The specified Category with ID '{dto.CategoryId.Value}' does not exist.");
            }

            var command = _mapper.Map<UpdatePostCommand>(dto);
            await _mediator.Send(command, cancellationToken);
        }

        public async Task AddTranslationAsync(AddPostTranslationDto dto, CancellationToken cancellationToken = default)
        {
            var langFilter = new LanguageFilterDto() { Code = dto.LanguageCode };
            var query = new GetLanguageByFilterQuery(langFilter);
            var language = (await _mediator.Send(query, cancellationToken)).FirstOrDefault();

            if (language is null)
                throw new Exception($"Language with code '{dto.LanguageCode}' not found.");

            var command = _mapper.Map<AddPostTranslationCommand>(dto);
            command.LanguageId = language.Id;
            await _mediator.Send(command, cancellationToken);
        }

        public async Task<IEnumerable<PostDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var posts = await _mediator.Send(new GetAllPostsQuery(), cancellationToken);
            return _mapper.Map<IEnumerable<PostDto>>(posts);
        }

        public async Task DeleteAsync(BaseDto<Guid> dto, CancellationToken cancellationToken = default)
        {
            var command = new DeletePostCommand ( dto.Id );
            await _mediator.Send(command, cancellationToken);
        }

        public async Task<IEnumerable<PostDto>> GetByFilterAsync(PostFilterDto filter, CancellationToken cancellationToken = default)
        {
            var query = _mapper.Map<GetPostsByFilterQuery>(filter);
            var posts = await _mediator.Send(query, cancellationToken);
            return _mapper.Map<IEnumerable<PostDto>>(posts);
        }
    }
}
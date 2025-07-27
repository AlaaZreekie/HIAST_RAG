using Application.DTO.CommonDTO;
using Application.Dtos.BookDtos;
using Application.Dtos.LanguageDtos;
using Application.Dtos.MediaDtos;
using Application.Feature.Books.Command.Create;
using Application.Feature.Books.Command.Delete;
using Application.Feature.Books.Command.Update;
using Application.Feature.Books.Query;
using Application.Feature.Languages.Query;
using Application.Feature.Medias.Query;
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
    public class BookService(ISender mediator, IMapper mapper) : IBookService
    {
        private readonly ISender _mediator = mediator;
        private readonly IMapper _mapper = mapper;

        public async Task<Guid> CreateAsync(CreateBookWithFilesDto dto, Guid coverMediaId, Guid fileMediaId, CancellationToken cancellationToken = default)
        {
            var bookEntity = new Book
            {
                Author = dto.Author,
                PublicationYear = dto.PublicationYear,
                ISBN = dto.ISBN,
                CoverImageMediaId = coverMediaId,
                FileMediaId = fileMediaId
            };

            if (dto.Translations != null && dto.Translations.Any())
            {
                var allLanguages = await _mediator.Send(new GetAllLanguagesQuery(), cancellationToken);
                var languageMap = allLanguages.ToDictionary(l => l.Code, l => l.Id);

                foreach (var transDto in dto.Translations)
                {
                    if (!languageMap.TryGetValue(transDto.LanguageCode, out var languageId))
                        throw new Exception($"Language code '{transDto.LanguageCode}' not found.");

                    var translationEntity = _mapper.Map<BookTranslation>(transDto);
                    translationEntity.LanguageId = languageId;
                    bookEntity.Translations.Add(translationEntity);
                }
            }

            var command = new CreateBookCommand(bookEntity);
            return await _mediator.Send(command, cancellationToken);
        }

        public async Task UpdateAsync(UpdateBookDto dto, CancellationToken cancellationToken = default)
        {
            await ValidateMediaFiles(dto.CoverImageMediaId, dto.FileMediaId, cancellationToken);

            var command = _mapper.Map<UpdateBookCommand>(dto);
            await _mediator.Send(command, cancellationToken);
        }

         public async Task<(string? coverPath, bool isCoverSafeToDelete, string? filePath, bool isFileSafeToDelete)> DeleteAsync(BaseDto<Guid> dto, CancellationToken cancellationToken = default)
        {
            var command = new DeleteBookCommand(dto.Id);
            return await _mediator.Send(command, cancellationToken);
        }

        public async Task AddTranslationAsync(AddBookTranslationDto dto, CancellationToken cancellationToken = default)
        {
            var langFilter = new LanguageFilterDto { Code = dto.LanguageCode };
            var query = new GetLanguageByFilterQuery(langFilter);
            var language = (await _mediator.Send(query, cancellationToken)).FirstOrDefault();
            if (language is null)
                throw new Exception($"Language with code '{dto.LanguageCode}' not found.");

            var command = _mapper.Map<AddBookTranslationCommand>(dto);
            command.LanguageId = language.Id;
            await _mediator.Send(command, cancellationToken);
        }

        public async Task<IEnumerable<BookDto>> GetAllAsync(CancellationToken cancellationToken = default)
        {
            var books = await _mediator.Send(new GetAllBooksQuery(), cancellationToken);
            return _mapper.Map<IEnumerable<BookDto>>(books);
        }

        public async Task<IEnumerable<BookDto>> GetByFilterAsync(BookFilterDto filter, CancellationToken cancellationToken = default)
        {
            var query = _mapper.Map<GetBooksByFilterQuery>(filter);
            var books = await _mediator.Send(query, cancellationToken);
            return _mapper.Map<IEnumerable<BookDto>>(books);
        }

        private async Task ValidateMediaFiles(Guid? coverId, Guid? fileId, CancellationToken cancellationToken)
        {
            if (coverId.HasValue)
            {
                var mediaFilter = new MediaFilterDto { Id = coverId.Value };
                var query = new GetMediaByFilterQuery(mediaFilter);
                var result = await _mediator.Send(query, cancellationToken);

                if (!result.Any())
                    throw new KeyNotFoundException($"The specified Cover Image with Media ID '{coverId.Value}' was not found.");
            }

            if (fileId.HasValue)
            {
                if (fileId == coverId) return;

                var mediaFilter = new MediaFilterDto { Id = fileId.Value };
                var query = new GetMediaByFilterQuery(mediaFilter);
                var result = await _mediator.Send(query, cancellationToken);

                if (!result.Any())
                    throw new KeyNotFoundException($"The specified Book File with Media ID '{fileId.Value}' was not found.");
            }
        }
    }
}
using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Books.Command.Update
{
    public class UpdateBookCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<UpdateBookCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(UpdateBookCommand request, CancellationToken cancellationToken)
        {
            var book = await _unitOfWork.Repository<Book>()
                .Find(b => b.Id == request.Id, navigationProperties: b => b.Translations)
                .FirstOrDefaultAsync(cancellationToken);

            if (book is null)
                throw new Exception("Book not found.");

            if (!string.IsNullOrWhiteSpace(request.Author) && book.Author != request.Author)
                book.Author = request.Author;

            if (request.PublicationYear.HasValue && book.PublicationYear != request.PublicationYear.Value)
                book.PublicationYear = request.PublicationYear.Value;

            if (!string.IsNullOrWhiteSpace(request.ISBN) && book.ISBN.Trim().ToLower() != request.ISBN.Trim().ToLower())
                book.ISBN = request.ISBN;

            if (request.CoverImageMediaId.HasValue && book.CoverImageMediaId != request.CoverImageMediaId.Value)
                book.CoverImageMediaId = request.CoverImageMediaId.Value;

            if (request.FileMediaId.HasValue && book.FileMediaId != request.FileMediaId.Value)
                book.FileMediaId = request.FileMediaId.Value;

            if (request.Translations != null)
            {
                foreach (var transUpdate in request.Translations)
                {
                    var existingTranslation = book.Translations.FirstOrDefault(t => t.Id == transUpdate.Id);
                    if (existingTranslation != null)
                    {
                        if (!string.IsNullOrWhiteSpace(transUpdate.Title) && existingTranslation.Title != transUpdate.Title)
                            existingTranslation.Title = transUpdate.Title;
                            
                        if (!string.IsNullOrWhiteSpace(transUpdate.Description) && existingTranslation.Description != transUpdate.Description)
                            existingTranslation.Description = transUpdate.Description;
                    }
                }
            }

            _unitOfWork.Repository<Book>().Update(book);
            if(request.Save)
                await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}
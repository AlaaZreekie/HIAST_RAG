using Application.IUnitOfWork;
using Domain.Entity.ApplicationEntity;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Feature.Books.Command.Create
{
    public class AddBookTranslationCommandHandler(IAppUnitOfWork unitOfWork) : IRequestHandler<AddBookTranslationCommand>
    {
        private readonly IAppUnitOfWork _unitOfWork = unitOfWork;

        public async Task Handle(AddBookTranslationCommand request, CancellationToken cancellationToken)
        {
            var book = await _unitOfWork.Repository<Book>()
                .Find(b => b.Id == request.BookId, navigationProperties: b => b.Translations)
                .FirstOrDefaultAsync(cancellationToken);

            if (book is null)
                throw new KeyNotFoundException("Book not found.");

            var translationExists = book.Translations.Any(t => t.LanguageId == request.LanguageId);
            if (translationExists)
                throw new ArgumentException("A translation for this language already exists for this book.");

            var newTranslation = new BookTranslation
            {
                LanguageId = request.LanguageId,
                Title = request.Title,
                Description = request.Description ?? ""
            };

            book.Translations.Add(newTranslation);
            _unitOfWork.Repository<Book>().Update(book);
            await _unitOfWork.SaveChangesAsync(cancellationToken);
        }
    }
}